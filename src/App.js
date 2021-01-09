import React, {Component} from 'react';
import Layout from './components/Layout/Layout';
import {Route, Switch} from 'react-router-dom';
import FlightSearch from './containers/FlightSearch/FlightSearch';
import Reservations from './containers/Reservations/Reservations';
import Results from './containers/Results/Results';
import Flight from './containers/Flight/Flight';
import SignUp from './containers/SignUp/SignUp';
import ControlPanel from './containers/ControlPanel/ControlPanel';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Switch>
              <Route path="/admin_control" exact component={ControlPanel} />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/reservations" exact component={Reservations} />
              <Route path="/results" exact component={Results} />
              <Route path="/flight" exact component={Flight} />
              <Route path="/" component={FlightSearch} />
            </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
