import React, {Component} from 'react';
import Layout from './components/Layout/Layout'
import {Route, Switch} from 'react-router-dom';
import FlightSearch from './containers/FlightSearch/FlightSearch'
import Reservations from './containers/Reservations/Reservations'
import Results from './containers/Results/Results'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Switch>
              <Route path="/reservations" exact component={Reservations} />
              <Route path="/results" exact component={Results} />
              <Route path="/" component={FlightSearch} />
            </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
