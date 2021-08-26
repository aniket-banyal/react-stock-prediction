import { Button, Card, CardActions, CardContent, makeStyles, Typography } from "@material-ui/core"
import { useRouteMatch, Link as RouterLink } from "react-router-dom"


const useStyles = makeStyles({
    root: {
        maxWidth: 345
    },
    title: {
        fontSize: 25,
    },
})


function ModelCard({ model }) {
    console.log('ModelCard render')
    const classes = useStyles()

    const { url } = useRouteMatch()

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="primary" gutterBottom>
                    {model.ticker}
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