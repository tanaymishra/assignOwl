import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

interface UserSignupData {
  email: string
  name?: string
  phone_number?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: UserSignupData = await request.json()
    const { email, name, phone_number } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Get client IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const ip_address = forwarded 
      ? forwarded.split(',')[0] 
      : request.headers.get('x-real-ip') || 'unknown'

    // Insert user into database
    const query = `
      INSERT INTO assignowl_users (email, name, phone_number, ip_address)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, name, phone_number, created_at
    `
    
    const values = [email, name || null, phone_number || null, ip_address]
    const result = await pool.query(query, values)
    
    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!',
      user: result.rows[0]
    }, { status: 201 })

  } catch (error: any) {
    console.error('Database error:', error)
    
    // Handle duplicate email error
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'Email already exists in our waitlist' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const query = `
      SELECT COUNT(*) as total_users, 
             COUNT(CASE WHEN created_at >= NOW() - INTERVAL '24 hours' THEN 1 END) as today_signups
      FROM assignowl_users
    `
    
    const result = await pool.query(query)
    
    return NextResponse.json({
      success: true,
      stats: result.rows[0]
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
