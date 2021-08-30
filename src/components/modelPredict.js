import { Container } from "@material-ui/core"
import { useState } from "react"

function ModelPredict({ model }) {
    console.log('ModelPredict render')
    const [predictionDate, setPredictionDate] = useState('')
    const [predictionValue, setPredictionValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const fetchPrediction = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const res = await fetch(`http://localhost:8000/api/prediction/${model.ticker}/?` + new URLSearchParams({
            pred_date: predictionDate,
        }))
        const predictionValue = await res.json()
        console.log(predictionValue)
        setPredictionValue(predictionValue)
        setIsLoading(false)
    }

    return (
        <Container>
            {model ?
                <div>
                    <form onSubmit={fetchPrediction} >
                        <label>Select Prediction date: </label>
                        <input type="date" name="date" value={predictionDate} onInput={e => setPredictionDate(e.target.value)} required />
                        <input type="submit" value="Submit" />
                    </form>
                    {isLoading && <p>Predicting ...</p>}
                    {!isLoading && predictionValue && <p>Prediction: {predictionValue.prediction}</p>}
                </div >
                : <div>Loading....</div>
            }
        </Container>
    )
}

export default ModelPredict