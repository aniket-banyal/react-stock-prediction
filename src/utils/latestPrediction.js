function getMarketClosed() {
    const today = new Date()
    return today.getHours() >= 16 && today.getMinutes() >= 0
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

const fetchPrediction = async (ticker) => {
    // console.log('-fetchPrediction called-')
    const res = await fetch(`https://ani-stock-prediction-api.herokuapp.com/api/prediction/${ticker}/?` + new URLSearchParams({
        latest: true,
    }))
    let data = await res.json()
    data.marketClosed = getMarketClosed()
    return data
}

const getLatestPrediction = async (ticker) => {
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

    const data = await fetchPrediction(ticker)
    saveToLocalStorage(ticker, data)
    return data
}

export { getLatestPrediction, saveToLocalStorage, getMarketClosed }