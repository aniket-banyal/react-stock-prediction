import { getMarketClosed } from '../utils/latestPrediction'


const fetchPredictions = async (ticker, days) => {
    console.log('---fetchPredictions called---')

    const res = await fetch(`http://localhost:8000/api/predictions/${ticker}/?` + new URLSearchParams({
        period: days,
    }))
    const predictions = await res.json()
    return predictions
}

const getPreviousPredictions = async (ticker, days, maxDays) => {
    let latestPredictionsAvailable = true
    let predictionsMetaData = JSON.parse(localStorage.getItem(`${ticker}-predictionsMetaData`))

    if (predictionsMetaData) {
        let { date, marketClosed } = predictionsMetaData

        // date stored in localStorage is of type string so need to parse it to get date object 
        date = new Date(date)

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (date.getTime() !== today.getTime() || marketClosed !== getMarketClosed())
            latestPredictionsAvailable = false
    }
    else
        latestPredictionsAvailable = false

    if (latestPredictionsAvailable) {
        let predictions = JSON.parse(localStorage.getItem(`${ticker}-predictions`))
        if (predictions && predictions.length === maxDays)
            return predictions.slice(maxDays - days, predictions.length)
    }

    let predictions = await fetchPredictions(ticker, days)
    return predictions
}

export { getPreviousPredictions }
