import { useMemo } from "react"
import Prediction from "./prediction"

function PredictionList({ models, selectedTickers, setPredictionDate }) {
    console.log('PredictionList render')

    const filteredModels = useMemo(() => {
        return selectedTickers.length > 0 ? models.filter(model => selectedTickers.includes(model.ticker)) : models
    }, [selectedTickers, models])

    filteredModels.sort((a, b) => selectedTickers.indexOf(a.ticker) - selectedTickers.indexOf(b.ticker))

    return (
        <div className='predictionList'>
            {filteredModels.length < 1 ? <div>No models found</div>
                :
                filteredModels.map(model => <Prediction key={model.ticker} model={model} setPredictionDate={setPredictionDate} />
                )}
        </div>
    )
}

export default PredictionList