import { useEffect, useState } from 'react'

const API_BASE_URL = 'https://ani-stock-prediction-api.herokuapp.com/api'

// If you directly write queryParams={} in useFetchApi then on every render it will be a different obj and will cause infinite loop 
const default_query_params = {}

const useFetchApi = (endpoint, queryParams = default_query_params, initialData = []) => {
    const [data, setData] = useState(initialData)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        // console.log('useFetchApi useEffect')
        const fetchModels = async () => {
            setIsLoading(true)
            setIsError(false)

            let res
            try {
                res = await fetch(`${API_BASE_URL}/${endpoint}/?` + new URLSearchParams(queryParams))
            }
            catch (e) {
                if (e instanceof (TypeError)) {
                    setIsError(true)
                    setIsLoading(false)
                }
                else
                    console.error(e)
                return
            }

            if (!res.ok) {
                setIsError(true)
                setIsLoading(false)
                return
            }

            const data = await res.json()
            setData(data)
            setIsLoading(false)
        }
        fetchModels()
    }, [endpoint, queryParams])

    return [data, isLoading, isError]
}

export default useFetchApi