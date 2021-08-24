import { useMemo } from "react"
import Prediction from "./prediction"

function PredictionList({ models, searchValue, setPredictionDate }) {
    console.log('PredictionList render')

    const filteredModels = useMemo(() => {
        return searchValue ? models.filter(model => model.ticker.toLowerCase() === searchValue.toLowerCase()) : models
    }, [searchValue, models])

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