import { Button, Container, TextField, Typography } from "@material-ui/core"
import { DatePicker, LocalizationProvider } from "@material-ui/lab"
import AdapterDateFns from '@material-ui/lab/AdapterDateFns'
import { format } from "date-fns"
import { useState } from "react"

const dateFormat = 'yyyy-MM-dd'

function ModelPredict({ model }) {
    console.log('ModelPredict render')

    const [predictionDate, setPredictionDate] = useState(null)
    const [predictionValue, setPredictionValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [disableSubmitButton, setDisableSubmitButton] = useState(false)

    const fetchPrediction = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        let predDate
        try {
            predDate = format(predictionDate, dateFormat)
        }
        catch (e) {
            if (e instanceof RangeError)
                setDisableSubmitButton(true)
            else
                console.log(e)

            setIsLoading(false)
            setPredictionValue('')
            return
        }

        const res = await fetch(`http://localhost:8000/api/prediction/${model.ticker}/?` + new URLSearchParams({
            pred_date: predDate,
        }))
        const predictionValue = await res.json()
        setPredictionValue(predictionValue)
        setIsLoading(false)
    }

    const handlePredictionDateChange = date => {
        try {
            format(date, dateFormat)
            setDisableSubmitButton(false)
        }
        catch (e) {
            if (e instanceof RangeError)
                setDisableSubmitButton(true)
            else
                console.log(e)
        }
        finally {
            setPredictionDate(date)
        }
    }


    return (
        <Container
            sx={{
                m: 5,
                width: '80%',
                height: '80%',
            }}
        >
            {model ?
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%',
                        height: '40%',
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
                                inputFormat={dateFormat}
                                mask='____-__-__'
                                renderInput={(params) => <TextField {...params} required />}
                            />
                        </LocalizationProvider>
                        <Button
                            disabled={disableSubmitButton}
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