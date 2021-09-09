import { Tabs, Tab } from "@material-ui/core"
import { Typography } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts'
import { getPreviousPredictions } from '../utils/previousPredictions'
import { amber, lightBlue } from "@material-ui/core/colors"
import { useTheme } from "@material-ui/core/styles"


const monthNumberToLabelMap = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

function formatDate(date) {
    date = date.split('-')
    const month = monthNumberToLabelMap[parseInt(date[1]) - 1]
    const day = parseInt(date[2])
    return `${day} ${month}`
}


const periods = [{ days: 7, label: '1 week' }, { days: 14, label: '2 weeks' }]
const defaultPeriodIdx = 0


function Graph({ ticker }) {
    console.log('Graph render')

    const [predictions, setPredictions] = useState([])
    const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriodIdx)

    const theme = useTheme()


    useEffect(() => {
        console.log('Graph fetchPredictions useEffect')
        // set predictions to [] so that if switching from one period to other, Loading... shows up instead of the old graph
        setPredictions([])

        const fetchPredictions = async () => {
            const days = periods[selectedPeriod].days
            const predictions = await getPreviousPredictions(ticker, days, periods[periods.length - 1].days)
            setPredictions(predictions)
        }

        fetchPredictions()
    }, [ticker, selectedPeriod])


    const data = predictions.map(prediction =>
        ({ date: formatDate(prediction.pred_date), prediction: prediction.prediction, actual: prediction.actual }))

    const handleTabChange = (e, newValue) => { setSelectedPeriod(newValue) }


    return (
        <div style={{ width: '100%', height: '100%' }} >
            <Tabs
                value={selectedPeriod}
                onChange={handleTabChange}
                centered
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider'
                }}
            >
                {periods.map(period => <Tab key={period.days} label={period.label} />)}
            </Tabs>

            {data.length > 0 ?
                <ResponsiveContainer minWidth={100}>
                    <LineChart
                        data={data}
                        margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
                    >
                        <XAxis
                            dataKey="date"
                            tick={{ fill: theme.palette.text.secondary }}
                        />
                        <YAxis
                            padding={{ bottom: 30 }}
                            tick={{ fill: theme.palette.text.secondary }}
                        >
                            <Label
                                value='% Change in Closing Price'
                                angle={-90}
                                position="insideBottomLeft"
                                style={{ fill: theme.palette.text.secondary }}
                            />
                        </YAxis>
                        <CartesianGrid stroke={theme.palette.grey[800]} />
                        <Tooltip contentStyle={{ backgroundColor: theme.palette.grey[900] }} />
                        <Legend wrapperStyle={{ position: 'relative' }} />
                        <Line
                            type="monotone"
                            dataKey="prediction"
                            stroke={lightBlue[200]}
                            strokeWidth={2}
                            // dot={false}
                            name='Prediction'
                            isAnimationActive={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="actual"
                            stroke={amber[300]}
                            strokeWidth={2}
                            // dot={false}
                            name='Actual'
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
                : <Typography variant='h6'>Loading graph...</Typography>
            }
        </div>
    )
}

export default Graph