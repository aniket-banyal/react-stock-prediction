import ModelList from './modelList'
import Search from './search'
import { useState } from 'react'

function Models({ models, tickers }) {
    console.log('models render')
    const [searchValue, setSearchValue] = useState('')

    return (
        <div className='models'>
            <Search options={tickers} value={searchValue} setSearchValue={setSearchValue} />
            <ModelList models={models} searchValue={searchValue} />
        </div>
    )

}

export default Models