import React from 'react'
import { render } from 'react-dom'

import {Main} from "./Home/main.jsx"
import {Home} from "./Home/home.jsx"
import {EvolutionCalculatorHome} from "./EvolutionCalculator/evolutionCalcHome.jsx"
import {IVCalculatorHome} from "./IVCalculator/ivCalcHome.jsx"

import { Router, Route, hashHistory, IndexRoute } from 'react-router'

class Index extends React.Component{
 
  render(){
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
        <IndexRoute component={Home}/>
          {/* add the routes here */}
          <Route path="/iv" component={IVCalculatorHome}/>
          <Route path="/evolution" component={EvolutionCalculatorHome}/>
        </Route>
        {/* add this */}
        {this.props.children}
      </Router>
      )
    }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
