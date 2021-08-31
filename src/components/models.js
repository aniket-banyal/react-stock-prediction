import { useState, useMemo } from 'react'
import Select from 'react-select'
import { Box, Container, Typography } from '@material-ui/core'
import SimpleGrid from './common/simpleGrid'
import ModelCard from './modelCard'


function Models({ models, tickers }) {
    console.log('Models render')

    const [selectedTickers, setSelectedTickers] = useState([])
    const [predictionDate, setPredictionDate] = useState('')
    const options = tickers.map(ticker => ({ value: ticker.symbol, label: ticker.symbol }))

    const handleSelectChange = options => {
        const selected = options.map(option => option.value)
        setSelectedTickers(selected)
    }


    const filteredModels = useMemo(() => {
        return selectedTickers.length > 0 ? models.filter(model => selectedTickers.includes(model.ticker)) : models
    }, [selectedTickers, models])

    // sort models based on the order in which tickes were selected in Select component
    filteredModels.sort((a, b) => selectedTickers.indexOf(a.ticker) - selectedTickers.indexOf(b.ticker))


    return (
        <Container style={{ padding: '40px' }}>
            <Select
                options={options}
                placeholder='Select ticker'
                autoFocus
                isClearable
                isMulti
                onChange={handleSelectChange} />

            {predictionDate &&
                <Typography variant='h4' align='center'>
                    <Box fontWeight="fontWeightLight" my={5}>
                        Predictions for: {predictionDate}
                    </Box>
                </Typography>
            }

            <SimpleGrid>
                {filteredModels.length < 1 ?
                    <div>No models found</div>
                    :
                    filteredModels.map(model =>
                        <ModelCard
                            key={model.ticker}
                            model={model}
                            setPredictionDate={setPredictionDate} />
                    )}
            </SimpleGrid>
        </Container>
    )
}

export default Models