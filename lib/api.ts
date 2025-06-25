interface SignupData {
  email: string
  name?: string
  phone_number?: string
}

interface ApiResponse {
  success: boolean
  message?: string
  error?: string
  user?: any
}

export const signupUser = async (data: SignupData): Promise<ApiResponse> => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.error || 'Something went wrong')
    }

    return result
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Network error occurred'
    }
  }
}

export const getUserStats = async (): Promise<any> => {
  try {
    const response = await fetch('/api/users', {
      method: 'GET',
    })

    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.error || 'Something went wrong')
    }

    return result
  } catch (error: any) {
    console.error('Error fetching stats:', error)
    return null
  }
}
