import { useState } from 'react'
import Search from './search'

function CreateModel({ tickers, setNewModelCreated }) {
    console.log('CreateModel render')

    const [modelName, setModelName] = useState('')
    const [seqLen, setSeqLen] = useState('')
    const [epochs, setEpochs] = useState('')
    const [ticker, setTicker] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleModelChange = e => {
        const { value } = e.target
        setModelName(value)
    }


    const handleSeqLenChange = e => {
        const { value } = e.target
        // value = Math.max(Number(min), Math.min(Number(max), Number(value)))
        setSeqLen(value)
    }

    const handleEpochsChange = e => {
        const { value } = e.target
        // value = Math.max(Number(min), Math.min(Number(max), Number(value)))
        setEpochs(value)
    }

    const trainModel = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: modelName, ticker: ticker, seq_len: seqLen, epochs: epochs })
        }

        const res = await fetch('http://localhost:8000/api/train/new/', requestOptions)
        const t = await res.json()
        console.log(t)
        setIsLoading(false)
        setNewModelCreated(true)
    }


    return (
        <div>
            <form onSubmit={trainModel} >
                <input type="text" value={modelName} onInput={handleModelChange} placeholder="Model Name" required />
                <Search options={tickers} value={ticker} setSearchValue={setTicker} />
                <input type="number" value={seqLen} onInput={handleSeqLenChange} min="1" placeholder="Sequence Length" required />
                <input type="number" value={epochs} onInput={handleEpochsChange} min="1" placeholder="Epochs to train" required />
                <input type="submit" value={isLoading ? "Training....." : "Train"} disabled={isLoading} />
            </form>
        </div>
    )

}

export default CreateModel