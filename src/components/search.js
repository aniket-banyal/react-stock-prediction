function Search({ options, searchValue, setSearchValue }) {
    console.log('search render')


    return (
        <div className='search'>
            <label> Select ticker:  </label>
            <select value={searchValue} onChange={e => setSearchValue(e.target.value)}>
                <option></option>
                {options.map(option => <option key={option.symbol} value={option.symbol} > {option.symbol} </option>)}
            </select>
            {/* <input type="text" value={value} onChange={e => setSearchValue(e.target.value)} placeholder='Ticker symbol' /> */}
        </div>
    )

}

export default Search