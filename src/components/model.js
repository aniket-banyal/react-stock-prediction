import { useState } from 'react'
import { useParams } from "react-router-dom"
import { Tabs, Tab } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import ModelDetail from "./modelDetail"
import ModelPredict from "./modelPredict"

const useStyles = makeStyles(({
    root: {
        flexGrow: 1,
        display: 'flex',
        width: '100%',
        height: '100%',
    },
}))


const showStyle = {
    visibility: 'visible',
    width: '100%',
    height: '100%',
}

const hideStyle = {
    visibility: 'hidden',
    width: 0,
    height: 0,
}

function Model({ all_models }) {
    console.log('Model render')

    const [selectedTab, setSelectedTab] = useState(0)

    const { symbol } = useParams()
    const classes = useStyles()

    const model = all_models.filter(model => model.ticker.toLowerCase() === symbol.toLowerCase())[0]

    return (
        <div style={{ width: '100%', height: '100%' }}>
            {model ?
                <div className={classes.root}>
                    <Tabs
                        value={selectedTab}
                        onChange={(e, newValue) => { setSelectedTab(newValue) }}
                        orientation="vertical"
                        sx={{
                            borderRight: 1,
                            borderColor: 'divider',
                            bgcolor: 'grey.900',
                            overflow: 'visible',
                        }}
                    >
                        <Tab label="Details" />
                        <Tab label="Predict" />
                    </Tabs>

                    <div style={selectedTab === 0 ? showStyle : hideStyle}>
                        <ModelDetail model={model} />
                    </div>

                    <div style={selectedTab === 1 ? showStyle : hideStyle}>
                        <ModelPredict model={model} />
                    </div>

                </div>
                : <div>404 Not Found</div>
            }
        </div>
    )
}

export default Model