import { useMemo } from "react"
import ModelCard from "./modelCard"


function ModelList({ models, searchValue }) {
    console.log('ModelList render')

    const filteredModels = useMemo(() => {
        return searchValue ? models.filter(model => model.ticker.toLowerCase() === searchValue.toLowerCase()) : models
    }, [searchValue, models])

    return (
        <div className='modellist'>
            {filteredModels.length < 1 ? <div>No models found</div>
                :
                filteredModels.map(model => <ModelCard key={model.ticker} model={model} />
                )}
        </div>

    )

}

export default ModelList