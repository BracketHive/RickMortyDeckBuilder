import { toFormData } from '@/utils/api'

export default {
  APIUrl () {
    const config = useRuntimeConfig()
    return config.public.API.baseURL
  },
  execute (endpoint: string, params?: Record<string, any>, method = 'get', responseType?: string) {
    const url = `${this.APIUrl()}/${endpoint}`
    const body = toFormData(params)

    const requestInit = {
      method,
   }

    if (method !== 'get') {
      Object.defineProperty(requestInit, 'body', {
        value: body
      })
    }

    const result = fetch(url, requestInit)
      .then((response) => {
         return response.json().then((data) => {
            if (data.error) {
              throw data
            }
            console.log(`Success ${method} api call to ${endpoint} `)
            if (params) {
              console.log('with body:', params)
            }
            console.log('Response:', response, data)
            return data
          })
      })
      .catch((error) => {
        console.log(`Failure ${method} api call to ${endpoint} `)
        if (params) {
          console.log('with body:', params)
        }
        console.log('Error:', error)
        throw error
        // return { data: { error } }
      })
    return result
  },
  post (endpoint: string, params?: object) {
    return this.execute(endpoint, params, 'post')
  },
  put (endpoint: string, params?: Record<string, any>) {
    return this.execute(endpoint, params, 'put')
  },
  delete (endpoint: string, params?: Record<string, any>) {
    return this.execute(endpoint, params, 'delete')
  },
  get (endpoint: string) {
    return this.execute(endpoint, undefined, 'get')
  },
}
