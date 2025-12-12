/**
 * Global composable for API communication in Nuxt
 * Uses $fetch and runtime config
 */
export const useApi = () => {
    const config = useRuntimeConfig()
    const apiKey = config.public.rawgApiKey

    const baseURL = 'https://api.rawg.io/api'

    /**
     * Generic GET request
     */
    const get = async (endpoint: string, params = {}) => {
        try {
            const data = await $fetch(`${baseURL}${endpoint}`, {
                params: {
                    key: apiKey,
                    ...params
                }
            })
            return data
        } catch (error) {
            console.error('API Error:', error)
            throw error
        }
    }

    return {
        get
    }
}
