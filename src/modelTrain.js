import { useState, React } from 'react'

function ModelTrain({ model }) {
    console.log('ModelTrain render')

    const [epochs, setEpochs] = useState('')
    const [isLoading, setIsLoading] = useState(false)



    const handleEpochsChange = e => {
        const { value } = e.target
        // value = Math.max(Number(min), Math.min(Number(max), Number(value)))
        setEpochs(value)
    }
    const trainModel = async (e) => {
        e.preventDefault()
        // To prevent multiple api requests if disabled removed from submit button using developer tools  
        if (isLoading) return

        setIsLoading(true)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: model.id, epochs })
        }

        const res = await fetch('http://localhost:8000/api/train/', requestOptions)
        const t = await res.json()
        console.log(t)
        setIsLoading(false)
    }

    return (
        <>
            {model ?
                <div>
                    <form onSubmit={trainModel} >
                        <input type="number" value={epochs} onInput={handleEpochsChange} min="1" placeholder="Epochs to train" required />
                        <input type="submit" value={isLoading ? "Training....." : "Train"} disabled={isLoading} />
                    </form>
                </div >
                : <div>Loading....</div>}
        </>
    )
}

export default ModelTrain