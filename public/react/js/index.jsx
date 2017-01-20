import React from 'react'
import { render } from 'react-dom'

import {Main} from "./Home/main.jsx"
import {Home} from "./Home/home.jsx"
import {EvolutionCalculatorHome} from "./EvolutionCalculator/evolutionCalcHome.jsx"
import {IVCalculatorHome} from "./IVCalculator/ivCalcHome.jsx"

import { Router, Route, hashHistory, IndexRoute } from 'react-router'


render((

  <Router history={hashHistory}>
     <Route path="/" component={Main}>
     <IndexRoute component={Home}/>
      {/* add the routes here */}
      <Route path="/iv" component={IVCalculatorHome}/>
      <Route path="/evolution" component={EvolutionCalculatorHome}/>
    </Route>
    
  </Router>

), document.getElementById('root'))
