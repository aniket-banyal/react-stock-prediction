import React from "react"
import { useParams, useRouteMatch, useHistory } from "react-router-dom"
import ModelDetail from "./modelDetail"
import { Route, Switch } from 'react-router-dom'
import ModelPredict from "./modelPredict"
import ModelTrain from "./modelTrain"

function Model({ all_models }) {
    console.log('Model render')

    let { id } = useParams()
    id = parseInt(id)

    const { path, url } = useRouteMatch()
    const { push } = useHistory()

    const model = all_models.filter(model => model.id === id)[0]
    return (
        <div>
            <div>
                <button type="button" onClick={() => push(`${url}`)}>
                    Details
                </button>

                <button type="button" onClick={() => push(`${url}/predict`)}>
                    Predict
                </button>

                <button type="button" onClick={() => push(`${url}/train`)}>
                    Train
                </button>
            </div>

            <Switch>
                <Route exact path={path}>
                    <ModelDetail model={model} />
                </Route>
                <Route path={`${path}/predict`}>
                    <ModelPredict model={model} />
                </Route>
                <Route path={`${path}/train`}>
                    <ModelTrain model={model} />
                </Route>
            </Switch>
        </div >
    )
}

export default Model