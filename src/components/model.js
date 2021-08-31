import { useState } from 'react'
import { useParams } from "react-router-dom"
import { Tabs, Tab, makeStyles } from "@material-ui/core"
import ModelDetail from "./modelDetail"
import ModelPredict from "./modelPredict"


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: '#e0e0e0',
    },
}))


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
                        className={classes.tabs}
                    >
                        <Tab label="Details" />
                        <Tab label="Predict" />
                    </Tabs>
                    <div style={{ display: selectedTab === 0 ? 'block' : 'none', width: '100%', height: '100%' }}>
                        <ModelDetail model={model} />
                    </div>
                    <div style={{ display: selectedTab === 1 ? 'block' : 'none' }}>
                        <ModelPredict model={model} />
                    </div>
                </div >
                : <div>404 Not Found</div>
            }
        </div>
    )
}

export default Model