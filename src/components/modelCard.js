import { Button, Card, CardActions, CardContent, makeStyles, Typography } from "@material-ui/core"
import { useRouteMatch, Link as RouterLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { getLatestPrediction, saveToLocalStorage } from '../utils/latestPredictions'


const useStyles = makeStyles({
    root: {
        maxWidth: 345
    },
    title: {
        fontSize: 25,
    },
})


function ModelCard({ model, setPredictionDate }) {
    console.log('ModelCard render')
    const classes = useStyles()

    const { url } = useRouteMatch()

    const [prediction, setPrediction] = useState()
    const [isLoading, setIsLoading] = useState(false)

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
                    color='textSecondary'>
                    Prediction
                </Typography>

                <Typography
                    variant="h5">
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