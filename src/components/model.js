import { useState } from 'react'
import { useParams } from "react-router-dom"
import { Tabs, Tab, makeStyles } from "@material-ui/core"
import ModelDetail from "./modelDetail"
import ModelPredict from "./modelPredict"


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        height: '100vh',
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
        <>
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
                    {selectedTab === 0 && <ModelDetail model={model} />}
                    {selectedTab === 1 && <ModelPredict model={model} />}
                </div >
                : <div>404 Not Found</div>
            }
        </>
    )
}

export default Model