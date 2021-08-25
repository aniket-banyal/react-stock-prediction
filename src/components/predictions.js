import PredictionList from './predictionList'
import { useState } from 'react'
import Select from 'react-select'


function Predictions({ models, tickers }) {
    console.log('Predictions render')

    const [selectedTickers, setSelectedTickers] = useState([])
    const [predictionDate, setPredictionDate] = useState('')
    const options = tickers.map(ticker => ({ value: ticker.symbol, label: ticker.symbol }))

    const handleSelectChange = options => {
        const selected = options.map(option => option.value)
        setSelectedTickers(selected)
    }

    return (
        <div className='predictions'>
            <Select options={options} placeholder='Select ticker'
                autoFocus isClearable isMulti
                onChange={handleSelectChange} />
            <p> Predictions for: {predictionDate} </p>
            <PredictionList models={models} selectedTickers={selectedTickers} setPredictionDate={setPredictionDate} />
        </div>
    )
}

export default Predictions