import { Card, CardActionArea, CardContent, Typography } from "@material-ui/core"
import { useRouteMatch, Link as RouterLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { getLatestPrediction } from '../utils/latestPrediction'


function ModelCard({ model, setPredictionDate }) {
    console.log('ModelCard render')
    let { url } = useRouteMatch()
    if (url.endsWith('/'))
        url = url.slice(0, -1)

    const [prediction, setPrediction] = useState()
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const fetchPrediction = async () => {
            console.log('ModelCard fetchPrediction useEffect')
            setIsLoading(true)

            const data = await getLatestPrediction(model.ticker)
            setPrediction(data)
            setIsLoading(false)
            setPredictionDate(data.pred_date)
        }
        fetchPrediction()
    }, [model, setPredictionDate])


    return (
        <Card>
            <CardActionArea component={RouterLink} to={`${url}/${model.ticker}`}>
                <CardContent>
                    <Typography
                        color="textPrimary"
                        variant='h5'
                        gutterBottom
                    >
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
                        sx={{
                            color: prediction?.prediction > 0 ? 'success.main' : 'error.main'
                        }}
                    >
                        {isLoading && 'Loading...'}
                        {prediction && `${prediction?.prediction} %`}
                    </Typography>

                </CardContent>

            </CardActionArea>
        </Card >
    )
}


export default ModelCard