import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'; // Import Node.js built-in crypto module
import ApiError from './utils/ApiError';

// Initialize PostgreSQL client
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_ACCESS_TOKEN_EXPIRATION = process.env.JWT_ACCESS_TOKEN_EXPIRATION || '1h';
const JWT_REFRESH_TOKEN_EXPIRATION = process.env.JWT_REFRESH_TOKEN_EXPIRATION || '7d';

// Function to generate JWT tokens
const generateTokens = (payload: object) => {
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRATION });
  const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_REFRESH_TOKEN_EXPIRATION });
  return { accessToken, refreshToken };
};

export async function registerUser(req: NextRequest) {
  // if (req.method !== 'POST') {
  //   return NextResponse.json(new ApiError('Method not allowed', 405), { status: 405 });
  // }

  const { username, phone, email, password, role } = await req.json();

  if (!username || !phone || !email || !password || !role) {
    return NextResponse.json(new ApiError('Username, phone, email, password, and role are required', 400), { status: 400 });
  }

  try {
    // Validate role
    const validRoles = ['admin', 'hospital', 'doctor', 'receptionist'];
    if (!validRoles.includes(role)) {
      throw new ApiError('Invalid role', 400);
    }

    // Check if the user already exists
    const userCheck = await pool.query('SELECT id FROM users WHERE username = $1 OR phone = $2 OR email = $3', [username, phone, email]);
    if (userCheck.rows.length > 0) {
      throw new ApiError('User with this username, phone, or email already exists', 400);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate UUID using Node.js crypto module
    const userId = crypto.randomUUID();

    // Insert the new user into the database
    await pool.query(
      'INSERT INTO users (id, username, phone, email, password_hash, role_id) VALUES ($1, $2, $3, $4, $5, (SELECT id FROM roles WHERE name = $6))',
      [userId, username, phone, email, hashedPassword, role]
    );

    // Generate JWT tokens
    const tokens = generateTokens({ userId, username, phone, email, role });

    // Delete existing refresh token for the user
    await pool.query(
      'DELETE FROM tokens WHERE user_id = $1 AND refresh_token = $2',
      [userId, tokens.refreshToken]
    );

    // Insert new refresh token into the database
    await pool.query(
      'INSERT INTO tokens (user_id, refresh_token, expires_at) VALUES ($1, $2, $3)',
      [userId, tokens.refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)] // Token expires in 7 days
    );

    // Create response with cookies
    const response = NextResponse.json({ message: 'User registered successfully', accessToken: tokens.accessToken }, { status: 201 });
    response.cookies.set('refreshToken', tokens.refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 }); // 7 days

    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode });
    }
    console.error('Error registering user:', error);
    return NextResponse.json(new ApiError('Internal server error', 500), { status: 500 });
  }
}

export async function loginUser(req: NextRequest) {
  // if (req.method !== 'POST') {
  //   return NextResponse.json(new ApiError('Method not allowed', 405), { status: 405 });
  // }

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(new ApiError('Email and password are required', 400), { status: 400 });
  }

  try {
    // Check if the user exists
    const userCheck = await pool.query('SELECT id, username, phone, email, password_hash, role_id FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length === 0) {
      throw new ApiError('Invalid email or password', 401);
    }

    const user = userCheck.rows[0];

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      throw new ApiError('Invalid email or password', 401);
    }
    const roleCheck = await pool.query('SELECT name FROM roles WHERE id = $1', [user.role_id]);
    const userRole = roleCheck.rows[0].name;

    // Generate JWT tokens
    const tokens = generateTokens({ userId: user.id, username: user.username, phone: user.phone, email: user.email, role: userRole});

    // Delete existing refresh token for the user
    await pool.query('DELETE FROM tokens WHERE user_id = $1', [user.id]);

    // Insert new refresh token into the database
    await pool.query(
      'INSERT INTO tokens (user_id, refresh_token, expires_at) VALUES ($1, $2, $3)',
      [user.id, tokens.refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)] // Token expires in 7 days
    );

    // Create response with cookies
    const response = NextResponse.json({ message: 'Login successful', accessToken: tokens.accessToken , username: user.username, phone: user.phone, email: user.email, role: userRole  }, { status: 200 });
    response.cookies.set('refreshToken', tokens.refreshToken, { httpOnly: false, maxAge: 7 * 24 * 60 * 60 }); // 7 days

    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode });
    }
    console.error('Error logging in user:', error);
    return NextResponse.json(new ApiError('Internal server error', 500), { status: 500 });
  }
}


export async function logoutUser(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json(new ApiError('Method not allowed', 405), { status: 405 });
  }

  try {
    // Extract the refresh token from the request cookies
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json(new ApiError('No refresh token provided', 400), { status: 400 });
    }

    // Delete the refresh token from the database
    await pool.query('DELETE FROM tokens WHERE refresh_token = $1', [refreshToken]);

    // Clear the refresh token cookie
    const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
    response.cookies.delete('refreshToken');

    return response;
  } catch (error) {
    console.error('Error logging out user:', error);
    return NextResponse.json(new ApiError('Internal server error', 500), { status: 500 });
  }
}
