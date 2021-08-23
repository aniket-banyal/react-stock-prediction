import PredictionList from './predictionList'
import Search from './search'
import { useState } from 'react'


function Predictions({ models, tickers }) {
    console.log('Predictions render')
    const [searchValue, setSearchValue] = useState('')
    const [predictionDate, setPredictionDate] = useState('')

    return (
        <div className='predictions'>
            <Search options={tickers} value={searchValue} setSearchValue={setSearchValue} />
            <p> Predictions for: {predictionDate} </p>
            <PredictionList models={models} searchValue={searchValue} setPredictionDate={setPredictionDate} />
        </div>
    )

}

export default Predictions