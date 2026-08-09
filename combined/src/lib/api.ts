import axios from 'axios'

// API client configured for Next.js
// In development and production, uses the same origin API routes
const apiClient = axios.create({
  baseURL: typeof window !== 'undefined' ? window.location.origin : '',
  timeout: 60000, // 60 seconds timeout for API calls
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor — suppress 404 noise only in production
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    if (status !== 404 || process.env.NODE_ENV !== 'production') {
      console.error('API Error:', error.response?.data || error.message)
    }
    return Promise.reject(error)
  }
)

export default apiClient
