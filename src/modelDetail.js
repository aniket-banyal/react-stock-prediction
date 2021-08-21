function ModelDetail({ model }) {
    console.log('ModelDetail render')

    return (
        <>
            {model ?
                <div>
                    <p>Name: {model.name}</p>
                    <p>Sequence Length: {model.seq_len}</p>
                    <p>Step: {model.step}</p>
                    <p>Ticker: {model.ticker}</p>
                </div>
                : <div>Loading....</div>}
        </>
    )
}

export default ModelDetail