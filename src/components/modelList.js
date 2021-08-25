import { useMemo } from "react"
import ModelCard from "./modelCard"


function ModelList({ models, selectedTickers }) {
    console.log('ModelList render')

    const filteredModels = useMemo(() => {
        return selectedTickers.length > 0 ? models.filter(model => selectedTickers.includes(model.ticker)) : models
    }, [selectedTickers, models])

    // sort models based on the order in which tickes were selected in Select component
    filteredModels.sort((a, b) => selectedTickers.indexOf(a.ticker) - selectedTickers.indexOf(b.ticker))

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