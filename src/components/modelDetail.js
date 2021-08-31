import { Box, Container, Typography } from '@material-ui/core'
import Graph from './graph'


function ModelDetail({ model }) {
    console.log('ModelDetail render')

    return (
        <Container style={{ width: '80%', height: '80%' }}>
            {model ?
                <div>
                    <Typography variant='h3' align='center'>
                        <Box fontWeight="fontWeightLight" my={2}>
                            {model.ticker}
                        </Box>
                    </Typography>
                </div>
                : <div>Loading....</div>}

            <Graph ticker={model.ticker} />
        </Container>
    )
}

export default ModelDetail