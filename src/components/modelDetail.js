import { Container } from '@material-ui/core'
import Graph from './graph'


function ModelDetail({ model }) {
    console.log('ModelDetail render')

    return (
        <Container>
            {model ?
                <div>
                    <p>Ticker: {model.ticker}</p>
                </div>
                : <div>Loading....</div>}

            <Graph ticker={model.ticker} />
        </Container>
    )
}

export default ModelDetail