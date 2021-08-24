import { useParams, useRouteMatch, useHistory } from "react-router-dom"
import ModelDetail from "./modelDetail"
import { Route, Switch } from 'react-router-dom'
import ModelPredict from "./modelPredict"

function Model({ all_models }) {
    console.log('Model render')

    const { symbol } = useParams()

    const { path, url } = useRouteMatch()
    const { push } = useHistory()

    const model = all_models.filter(model => model.ticker.toLowerCase() === symbol.toLowerCase())[0]

    return (
        <>
            {model ?
                <div>
                    < div >
                        <button type="button" onClick={() => push(`${url}`)}>
                            Details
                        </button>

                        <button type="button" onClick={() => push(`${url}/predict`)}>
                            Predict
                        </button>
                    </div >

                    <Switch>
                        <Route exact path={path}>
                            <ModelDetail model={model} />
                        </Route>
                        <Route path={`${path}/predict`}>
                            <ModelPredict model={model} />
                        </Route>
                    </Switch>
                </div >
                : <div>404 Not Found</div>
            }
        </>
    )
}

export default Model