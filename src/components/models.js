import ModelList from './modelList'
import { useState } from 'react'
import Select from 'react-select'

function Models({ models, tickers }) {
    console.log('Models render')

    const [selectedTickers, setSelectedTickers] = useState([])
    const options = tickers.map(ticker => ({ value: ticker.symbol, label: ticker.symbol }))

    const handleSelectChange = options => {
        const selected = options.map(option => option.value)
        setSelectedTickers(selected)
    }

    return (
        <div className='models'>
            <Select options={options} placeholder='Select ticker'
                autoFocus isClearable isMulti
                onChange={handleSelectChange} />
            <ModelList models={models} selectedTickers={selectedTickers} />
        </div>
    )
}

export default Models