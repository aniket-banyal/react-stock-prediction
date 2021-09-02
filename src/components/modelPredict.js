import { Button, Container, TextField, Typography } from "@material-ui/core"
import { DatePicker, LocalizationProvider } from "@material-ui/lab"
import AdapterDateFns from '@material-ui/lab/AdapterDateFns'
import { format } from "date-fns"
import { useState } from "react"

function ModelPredict({ model }) {
    console.log('ModelPredict render')

    const [predictionDate, setPredictionDate] = useState(null)
    const [predictionValue, setPredictionValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const fetchPrediction = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const res = await fetch(`http://localhost:8000/api/prediction/${model.ticker}/?` + new URLSearchParams({
            pred_date: predictionDate,
        }))
        const predictionValue = await res.json()
        setPredictionValue(predictionValue)
        setIsLoading(false)
    }

    const handlePredictionDateChange = date => {
        const formattedDate = format(date, 'yyyy-MM-dd')
        setPredictionDate(formattedDate)
    }

    return (
        <Container
            sx={{
                m: 5,
                width: '100%',
                height: '100%'
            }}
        >
            {model ?
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%',
                        height: '30%',
                        justifyContent: 'space-between'
                    }}
                >
                    <form
                        onSubmit={fetchPrediction}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '50%',
                            justifyContent: 'space-between'
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Prediction Date"
                                value={predictionDate}
                                onChange={handlePredictionDateChange}
                                inputFormat='dd-MM-yyyy'
                                mask='__-__-____'
                                renderInput={(params) => <TextField {...params} required />}
                            />
                        </LocalizationProvider>
                        <Button
                            type='submit'
                            variant='contained'
                        >
                            Predict
                        </Button>
                    </form>
                    <Typography variant='h5'>
                        {isLoading && 'Predicting ...'}
                        {!isLoading && predictionValue && `Prediction: ${predictionValue.prediction}`}
                    </Typography>
                </div >
                : <div>Loading....</div>
            }
        </Container>
    )
}

export default ModelPredict