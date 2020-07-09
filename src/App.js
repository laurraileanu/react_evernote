import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Home'
import Login from './Login'
import SignUp from './SignUp'
import AuthProvider from './auth'
import PrivateRoute from "./PrivateRoute"

const App = () => {
  return(
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/signup" component={SignUp}></Route>
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App;
