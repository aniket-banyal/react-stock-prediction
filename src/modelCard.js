import { useRouteMatch, useHistory } from "react-router-dom"


function ModelCard({ model }) {
    console.log('ModelCard render')

    const { url } = useRouteMatch()
    const { push } = useHistory()

    return (
        <div style={{ border: '1px solid black', width: '20rem' }}>
            <p>{model.ticker}</p>
            <div>
                <button type="button" onClick={() => push(`${url}/${model.ticker}`)}>
                    Details
                </button>

                <button type="button" onClick={() => push(`${url}/${model.ticker}/predict`)}>
                    Predict
                </button>
            </div>
        </div>
    )
}


export default ModelCard