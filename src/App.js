import './App.css'
import Home from './home'
import Models from './models'
import Model from './model'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CreateModel from './createModel'
import { useEffect, useState } from 'react'


function App() {
  console.log('app render')

  const [models, setModels] = useState([])
  const [newModelCreated, setNewModelCreated] = useState(false)
  const [tickers, setTickers] = useState([])

  useEffect(() => {
    console.log('app fetchModels useEffect')
    const fetchModels = async () => {
      const res = await fetch('http://localhost:8000/api/models/')
      const data = await res.json()
      setModels(data)
    }
    fetchModels()
  }, [newModelCreated])

  useEffect(() => {
    console.log('app fetchTickers useEffect')
    const fetchTickers = async () => {
      const res = await fetch('http://localhost:8000/api/tickers/')
      const data = await res.json()
      setTickers(data)
    }
    fetchTickers()
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' ><Home /> </Route>
          <Route exact path='/models' ><Models models={models} tickers={tickers} /> </Route>
          <Route exact path='/models/new' ><CreateModel tickers={tickers} setNewModelCreated={setNewModelCreated} /> </Route>
          <Route path='/models/:id' ><Model all_models={models} /> </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
