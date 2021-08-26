import { useState, useMemo } from 'react'
import Select from 'react-select'
import PredictionCard from "./predictionCard"
import SimpleGrid from './common/simpleGrid'
import { Container } from '@material-ui/core'

function Predictions({ models, tickers }) {
    console.log('Predictions render')

    const [selectedTickers, setSelectedTickers] = useState([])
    const [predictionDate, setPredictionDate] = useState('')
    const options = tickers.map(ticker => ({ value: ticker.symbol, label: ticker.symbol }))

    const handleSelectChange = options => {
        const selected = options.map(option => option.value)
        setSelectedTickers(selected)
    }

    const filteredModels = useMemo(() => {
        return selectedTickers.length > 0 ? models.filter(model => selectedTickers.includes(model.ticker)) : models
    }, [selectedTickers, models])

    filteredModels.sort((a, b) => selectedTickers.indexOf(a.ticker) - selectedTickers.indexOf(b.ticker))


    return (
        <Container>
            <Select
                options={options}
                placeholder='Select ticker'
                autoFocus
                isClearable
                isMulti
                onChange={handleSelectChange} />

            {predictionDate && <p> Predictions for: {predictionDate} </p>}

            <SimpleGrid>
                {filteredModels.length < 1 ? <div>No models found</div>
                    :
                    filteredModels.map(model =>
                        <PredictionCard
                            key={model.ticker}
                            model={model}
                            setPredictionDate={setPredictionDate} />
                    )}
            </SimpleGrid>
        </Container>
    )
}

export default Predictions