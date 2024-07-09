import API from '@/api/API'
import type { Character, ApiResponse, ApiError } from '@/types'

export const getCharacters = async (): Promise<ApiResponse<Character[], ApiError>> => {
  try {
    const data = await API.get('character')
    return { data: data.results }
  } catch(e) {
    return { error: Object(e) }
  }
}

export const getRandomNumCharacters = async (num: number[]): Promise<ApiResponse<Character[], ApiError>> => {
  try {
    const data = await API.get(`character/${num}`)
    return { data: data.results }
  } catch(e) {
    return { error: Object(e) }
  }
}

