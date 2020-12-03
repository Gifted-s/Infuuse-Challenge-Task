import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './config/firebaseConfig';

import Overview from './screens/Overview/Overview';
import SignIn from './screens/Auth/SignIn';
import AppContext from './context/AppContext/AppContext';
import SignUp from './screens/Auth/SignUp';
import Reports from './screens/Reports/Reports';

const ComponentWrapper = () => {
  return (
    <React.Fragment>
      <AppContext>
        <Route path="/" component={SignIn} exact />
        <Route path="/dashboard" component={Overview} exact />
        <Route path="/auth/signin" component={SignIn} exact />
        <Route path="/auth/signup" component={SignUp} exact />
        <Route path="/dashboard/reports" component={Reports} exact />
      </AppContext>
    </React.Fragment>



  )


}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <ComponentWrapper />
      </Switch>
    </BrowserRouter>
  )
}
export default App;
