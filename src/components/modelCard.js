import { Button, Card, CardActions, CardContent, makeStyles, Typography } from "@material-ui/core"
import { useRouteMatch, Link as RouterLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { getLatestPrediction, saveToLocalStorage } from '../utils/latestPredictions'
import { red, green } from "@material-ui/core/colors"

const useStyles = makeStyles({
    root: {
        maxWidth: 345
    },
    title: {
        fontSize: 25,
    },
    predictionClass: prediction => ({ color: prediction > 0 ? green[600] : red[600] })
})


function ModelCard({ model, setPredictionDate }) {
    console.log('ModelCard render')
    const { url } = useRouteMatch()

    const [prediction, setPrediction] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const classes = useStyles(prediction?.prediction)

    useEffect(() => {
        const fetchPrediction = async () => {
            console.log('prediction fetchPrediction useEffect')
            setIsLoading(true)

            const data = await getLatestPrediction(model.ticker)
            saveToLocalStorage(model.ticker, data)
            setPrediction(data)
            setIsLoading(false)
            setPredictionDate(data.pred_date)
        }
        fetchPrediction()
    }, [model, setPredictionDate])


    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="primary" gutterBottom>
                    {model.ticker}
                </Typography>

                <Typography
                    variant="subtitle1"
                    color='textSecondary'
                >
                    Prediction
                </Typography>

                <Typography
                    variant="h5"
                    className={classes.predictionClass}
                >
                    {isLoading && 'Loading...'}
                    {prediction && `${prediction?.prediction.toFixed(2)} %`}
                </Typography>

            </CardContent>

            <CardActions>
                <Button
                    variant="contained"
                    size="small"
                    component={RouterLink}
                    to={`${url}/${model.ticker}`}
                >
                    Details
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    component={RouterLink}
                    to={`${url}/${model.ticker}/predict`}
                >
                    Predict
                </Button>
            </CardActions>
        </Card >
    )
}


export default ModelCard