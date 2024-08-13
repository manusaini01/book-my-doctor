import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Pool } from 'pg';
import ApiError from '../../../../lib/utils/ApiError';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

interface DecodedToken extends JwtPayload {
  userId: string;
  role: string;
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get('refreshToken')?.value || req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ location: '/', error: 'No token found' }, { status: 401 });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as DecodedToken;
    const { userId, role } = decodedToken;

    const userCheckQuery = `
      SELECT id 
      FROM users 
      WHERE id = $1 AND role_id = (SELECT id FROM roles WHERE name = $2)
    `;
    const userCheck = await pool.query(userCheckQuery, [userId, role]);

    if (userCheck.rows.length === 0) {
      throw new ApiError('Unauthorized', 401);
    }

    const rolePaths: Record<string, string> = {
      admin: '/admin/dashboard',
      hospital: '/hospital/dashboard',
      doctor: '/doctor/dashboard',
      receptionist: '/receptionist/dashboard',
    };

    return NextResponse.json({ location: rolePaths[role] }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
