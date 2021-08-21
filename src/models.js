import { useHistory, useRouteMatch } from "react-router-dom"
import ModelList from './modelList'
import Search from './search'
import { useState } from 'react'

function Models({ models, tickers }) {
    console.log('models render')
    const [searchValue, setSearchValue] = useState('')

    const { url } = useRouteMatch()
    const { push } = useHistory()

    return (
        <div className='models'>
            <Search options={tickers} value={searchValue} setSearchValue={setSearchValue} />
            <button type="button" onClick={() => push(`${url}/new`)}>
                Create New Model
            </button>
            <ModelList models={models} searchValue={searchValue} />
        </div>
    )

}

export default Models