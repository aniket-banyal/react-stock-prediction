import { Typography } from '@material-ui/core'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts'

const monthNumberToLabelMap = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

function formatDate(date) {
    date = date.split('-')
    const month = monthNumberToLabelMap[parseInt(date[1]) - 1]
    const day = parseInt(date[2])
    return `${day} ${month}`
}


function Graph({ predictions }) {
    console.log('Graph render')

    const data = predictions.map(prediction =>
        ({ date: formatDate(prediction.pred_date), prediction: prediction.prediction, actual: prediction.actual }))


    return (
        <div style={{ width: 'fit-content' }}>
            <Typography variant='h5' align='center' > 1 week </Typography>
            {data.length > 0 ?
                <LineChart
                    width={600}
                    height={600}
                    data={data}
                >
                    <XAxis dataKey="date" />
                    <YAxis padding={{ bottom: 30 }}>
                        <Label
                            value='% Change in Closing Price'
                            angle={-90}
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
                        animationDuration={800}
                    />
                    <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#387908"
                        strokeWidth={2}
                        // dot={false}
                        name='Actual'
                        animationDuration={800}
                    />
                </LineChart>
                : <Typography variant='h6'>Loading graph...</Typography>
            }
        </div>
    )
}

export default Graph