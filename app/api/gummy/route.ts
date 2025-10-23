import { NextRequest, NextResponse } from 'next/server';

const DASHBOARD_API_URL = process.env.NEXT_PUBLIC_GUMMY_API_URL || 'http://localhost:5007/api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint') || 'status';
  
  try {
    const response = await fetch(`${DASHBOARD_API_URL}/${endpoint}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch status' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint') || 'start-all';
  
  try {
    const response = await fetch(`${DASHBOARD_API_URL}/${endpoint}`, {
      method: 'POST',
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to execute command' }, { status: 500 });
  }
}
