import { Tabs, Tab, makeStyles } from "@material-ui/core"
import { Typography } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts'
import { getPreviousPredictions } from '../utils/previousPredictions'
import { getMarketClosed } from '../utils/latestPrediction'


const monthNumberToLabelMap = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

function formatDate(date) {
    date = date.split('-')
    const month = monthNumberToLabelMap[parseInt(date[1]) - 1]
    const day = parseInt(date[2])
    return `${day} ${month}`
}


const useStyles = makeStyles((theme) => ({
    tabs: {
        borderBottom: `2px solid ${theme.palette.divider}`,
        backgroundColor: '#e0e0e0',
    },
}))

const periods = [{ days: 7, label: '1 week' }, { days: 14, label: '2 weeks' }]
const defaultPeriodIdx = 0
const defaultDays = periods[defaultPeriodIdx].days


function Graph({ ticker }) {
    console.log('Graph render')

    const [days, setDays] = useState(defaultDays)
    const [predictions, setPredictions] = useState([])
    const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriodIdx)

    const classes = useStyles()

    useEffect(() => {
        console.log('Graph fetchPredictions useEffect')
        // set predictions to [] so that if switching from one period to other, Loading... shows up instead of the old graph
        setPredictions([])

        const fetchPredictions = async () => {
            const predictions = await getPreviousPredictions(ticker, days, periods[periods.length - 1].days)
            setPredictions(predictions)
            if (days === periods[periods.length - 1].days) {
                localStorage.setItem(`${ticker}-predictions`, JSON.stringify(predictions))

                const date = new Date()
                date.setHours(0, 0, 0, 0)
                const metaData = { date, marketClosed: getMarketClosed() }
                localStorage.setItem(`${ticker}-predictionsMetaData`, JSON.stringify(metaData))
            }
        }

        fetchPredictions()
    }, [ticker, days])


    const data = predictions.map(prediction =>
        ({ date: formatDate(prediction.pred_date), prediction: prediction.prediction, actual: prediction.actual }))

    const handleTabChange = (e, newValue) => {
        setSelectedPeriod(newValue)
        setDays(periods[newValue].days)
    }

    return (
        <div>
            <Tabs
                value={selectedPeriod}
                onChange={handleTabChange}
                centered
                className={classes.tabs}
            >
                {periods.map(period => <Tab key={period.days} label={period.label} />)}
            </Tabs>

            {data.length > 0 ?
                <LineChart
                    width={600}
                    height={600}
                    data={data}
                    margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
                >
                    <XAxis dataKey="date" />
                    <YAxis padding={{ bottom: 30 }}>
                        <Label
                            value='% Change in Closing Price'
                            angle={-90}
                            position="insideBottomLeft"
                        />
                    </YAxis>
                    <CartesianGrid stroke="#f5f5f5" />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="prediction"
                        stroke="#ff7300"
                        strokeWidth={2}
                        // dot={false}
                        name='Prediction'
                        isAnimationActive={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#387908"
                        strokeWidth={2}
                        // dot={false}
                        name='Actual'
                        isAnimationActive={false}
                    />
                </LineChart>
                : <Typography variant='h6'>Loading graph...</Typography>
            }
        </div>
    )
}

export default Graph