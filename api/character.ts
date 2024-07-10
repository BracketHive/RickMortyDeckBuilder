import API from '@/api/API'
import type { Character, ApiResponse, ApiError } from '@/types'

export const getCharacters = async (): Promise<ApiResponse<Character[], ApiError>> => {
  try {
    const data = await API.get('character')
    return { data: data.results }
  } catch (e) {
    return { error: Object(e) }
  }
}

export const getRandomNumCharacters = async (nums: number[]): Promise<ApiResponse<Character[], ApiError>> => {
  try {
    const data = await API.get(`character/${nums}`)
    return { data: data }
  } catch (e) {
    return { error: Object(e) }
  }
}

export const filterCharacters = async (param?: string, value?: string): Promise<ApiResponse<Character[], ApiError>> => {
  try {
    const data = await API.get(`character/?${param}=${value}`)
    return { data: data.results }
  } catch (e) {
    return { error: Object(e) }
  }
}

