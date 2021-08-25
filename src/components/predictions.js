import PredictionList from './predictionList'
import { useState } from 'react'
import Select from 'react-select'


function Predictions({ models, tickers }) {
    console.log('Predictions render')

    const [searchValue, setSearchValue] = useState('')
    const [predictionDate, setPredictionDate] = useState('')
    const options = tickers.map(ticker => ({ value: ticker.symbol, label: ticker.symbol }))

    return (
        <div className='predictions'>

            <Select options={options} placeholder='Select ticker' autoFocus isClearable
                onChange={option => setSearchValue(option?.value)} />
            <p> Predictions for: {predictionDate} </p>
            <PredictionList models={models} searchValue={searchValue} setPredictionDate={setPredictionDate} />
        </div>
    )

}

export default Predictions