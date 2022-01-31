import { Button, Container, TextField, Typography } from "@material-ui/core"
import { DatePicker, LocalizationProvider } from "@material-ui/lab"
import AdapterDateFns from '@material-ui/lab/AdapterDateFns'
import { format } from "date-fns"
import { useState } from "react"
import { getMarketClosed } from "../utils/latestPrediction"

const dateFormat = 'yyyy-MM-dd'

const addDays = (date, days) => {
    var result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}

const disableCertainDates = date => {
    //disable Sunday and Saturday
    if (date.getDay() === 0 || date.getDay() === 6)
        return true

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    date.setHours(0, 0, 0, 0)

    //Friday
    if (today.getDay() === 5) {
        if (getMarketClosed())
            return date > addDays(today, 3)
        return date > today
    }

    //Saturday
    if (today.getDay() === 6)
        return date > addDays(today, 2)

    if (date > addDays(today, 1))
        return true

    // if date is today + 1, then disable it if market not closed
    if (date.getTime() === addDays(today, 1).getTime()) {
        if (getMarketClosed())
            return false
        return true
    }

    return false
}


function ModelPredict({ model }) {
    // console.log('ModelPredict render')

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

    const handleDatePickerError = (reason, value) => {
        switch (reason) {
            case "invalidDate":
                setDisableSubmitButton(true)
                break;

            case "shouldDisableDate":
                setDisableSubmitButton(true)
                break;

            case null:
                setDisableSubmitButton(false)
                break;

            default:
                break;
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
                                shouldDisableDate={disableCertainDates}
                                onError={handleDatePickerError}
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