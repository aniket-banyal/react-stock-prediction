import { useMemo } from "react"
// import { Link } from "react-router-dom"
import { useRouteMatch, useHistory } from "react-router-dom"


function ModelList({ models, searchValue }) {
    console.log('ModelList render')

    const filteredModels = useMemo(() => {
        return searchValue ? models.filter(model => model.ticker.toLowerCase() === searchValue.toLowerCase()) : models
    }, [searchValue, models])


    const { url } = useRouteMatch()
    const { push } = useHistory()

    return (
        <div className='modellist'>
            {filteredModels.length < 1 ? <div>No models found</div> :
                filteredModels.map(model => {
                    return (
                        <div key={model.id} style={{ border: '1px solid black', width: '20rem' }}>
                            {/* <Link to={`/models/${model.id}`}> */}
                            <h1>{model.name}</h1>
                            <p>{model.ticker}</p>
                            {/* </Link> */}
                            <div>
                                <button type="button" onClick={() => push(`${url}/${model.id}`)}>
                                    Details
                                </button>

                                <button type="button" onClick={() => push(`${url}/${model.id}/predict`)}>
                                    Predict
                                </button>

                                <button type="button" onClick={() => push(`${url}/${model.id}/train`)}>
                                    Train
                                </button>
                            </div>
                        </div>
                    )
                })}
        </div>

    )

}

export default ModelList