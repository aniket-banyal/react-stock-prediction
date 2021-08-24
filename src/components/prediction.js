import { useEffect, useState } from "react"

function getMarketClosed() {
    const today = new Date()
    return today.getHours() > 16 && today.getMinutes() >= 0
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

const fetchPredictions = async (ticker) => {
    console.log('-fetchPredictions called-')
    const res = await fetch(`http://localhost:8000/api/prediction/${ticker}/?` + new URLSearchParams({
        latest: true,
    }))
    let data = await res.json()
    data.marketClosed = getMarketClosed()
    return data
}

const getLatestData = async (ticker) => {
    const savedPrediction = JSON.parse(localStorage.getItem(ticker))
    let latestDataAvailable = true

    if (!savedPrediction)
        latestDataAvailable = false
    else {
        const lastSavedPredDate = new Date(savedPrediction.pred_date)
        const today = new Date()
        // setting time to zero cuz we only want to compare dates not time 
        lastSavedPredDate.setHours(0, 0, 0, 0)
        today.setHours(0, 0, 0, 0)

        if (lastSavedPredDate < today)
            latestDataAvailable = false

        else if (lastSavedPredDate.getTime() === today.getTime() && savedPrediction.marketClosed !== getMarketClosed())
            latestDataAvailable = false
    }

    if (latestDataAvailable)
        return savedPrediction

    const data = await fetchPredictions(ticker)
    return data
}


function Prediction({ model, setPredictionDate }) {
    console.log('Prediction render')
    const [prediction, setPrediction] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchPredictions = async () => {
            console.log('prediction fetchPredictions useEffect')
            setIsLoading(true)

            const data = await getLatestData(model.ticker)
            saveToLocalStorage(model.ticker, data)
            setPrediction(data)
            setIsLoading(false)
            setPredictionDate(data.pred_date)
        }
        fetchPredictions()
    }, [model, setPredictionDate])

    return (
        <div style={{ border: '1px solid black', width: '20rem' }}>
            <p>{model.ticker}</p>
            {isLoading ? <p>Loading...</p>
                :
                <div>
                    <p>Prediction: {prediction?.prediction}</p>
                </div>
            }
        </div>
    )
}

export default Prediction
