function ModelDetail({ model }) {
    console.log('ModelDetail render')

    return (
        <>
            {model ?
                <div>
                    <p>Ticker: {model.ticker}</p>
                </div>
                : <div>Loading....</div>}
        </>
    )
}

export default ModelDetail