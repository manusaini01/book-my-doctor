// app/api/auth/register/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '../../../../lib/auth';

export async function POST(request: NextRequest) {
  return registerUser(request);
}
