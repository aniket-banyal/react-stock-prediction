import ModelList from './modelList'
import { useState } from 'react'
import Select from 'react-select'

function Models({ models, tickers }) {
    console.log('Models render')

    const [searchValue, setSearchValue] = useState('')
    const options = tickers.map(ticker => ({ value: ticker.symbol, label: ticker.symbol }))

    return (
        <div className='models'>
            <Select options={options} placeholder='Select ticker' autoFocus isClearable
                onChange={option => setSearchValue(option?.value)} />
            <ModelList models={models} searchValue={searchValue} />
        </div>
    )
}

export default Models