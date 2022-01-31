// import Home from './components/home'
import Models from './components/models'
import Model from './components/model'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CssBaseline, Typography } from '@material-ui/core'
import { ThemeProvider, createTheme } from "@material-ui/core/styles"
import useFetchApi from './hooks/useFetchApi'
import ButtonAppBar from './components/appbar'

const theme = createTheme({
  palette: {
    mode: "dark"
  }
})

function App() {
  // console.log('app render')
  const [models, isLoading, isError] = useFetchApi('models')
  const tickers = models.map(model => model.ticker)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App" style={{ width: '100vw', height: '100vh' }}>
        {isLoading && <Typography variant='h4'>Loading...</Typography>}
        {isError && <Typography variant='h4'>Something went wrong. Please try again</Typography>}

        {!isLoading && !isError &&
          <Router>
            <ButtonAppBar />
            <Switch>
              {/* <Route exact path='/' ><Home /> </Route> */}
              <Route exact path='/' ><Models models={models} tickers={tickers} /> </Route>
              <Route path='/:symbol' ><Model all_models={models} /> </Route>
            </Switch>
          </Router>
        }
      </div>
    </ThemeProvider>
  )
}

export default App
