import { NextRequest, NextResponse } from 'next/server';
import { logoutUser } from '../../../../lib/auth';

export async function POST(request: NextRequest) {
  return logoutUser(request);
}
