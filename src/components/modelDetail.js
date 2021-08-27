import { Container } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Graph from './graph'


function ModelDetail({ model }) {
    console.log('ModelDetail render')
    const [predictions, setPredictions] = useState([])

    useEffect(() => {
        const fetchPredictions = async () => {
            console.log('ModelDetail fetchPredictions useEffect')
            const res = await fetch(`http://localhost:8000/api/predictions/${model.ticker}/?` + new URLSearchParams({
                period: 7,
            }))
            const predictions = await res.json()
            setPredictions(predictions)
        }
        fetchPredictions()
    }, [model])

    return (
        <Container>
            {model ?
                <div>
                    <p>Ticker: {model.ticker}</p>
                </div>
                : <div>Loading....</div>}

            <Graph predictions={predictions} />
        </Container>
    )
}

export default ModelDetail