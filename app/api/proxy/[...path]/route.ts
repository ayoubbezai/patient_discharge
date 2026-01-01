import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:3000';

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const body = await request.json();
    const token = request.headers.get('authorization');

    const headers: any = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = token;
    }

    const response = await axios.post(`${BACKEND_URL}/${path}`, body, { headers });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data || 'Proxy error' },
      { status: error.response?.status || 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const token = request.headers.get('authorization');

    const headers: any = {};

    if (token) {
      headers.Authorization = token;
    }

    const response = await axios.get(`${BACKEND_URL}/${path}`, { headers });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data || 'Proxy error' },
      { status: error.response?.status || 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const body = await request.json();
    const token = request.headers.get('authorization');

    const headers: any = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = token;
    }

    const response = await axios.put(`${BACKEND_URL}/${path}`, body, { headers });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data || 'Proxy error' },
      { status: error.response?.status || 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const token = request.headers.get('authorization');

    const headers: any = {};

    if (token) {
      headers.Authorization = token;
    }

    const response = await axios.delete(`${BACKEND_URL}/${path}`, { headers });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data || 'Proxy error' },
      { status: error.response?.status || 500 }
    );
  }
}
