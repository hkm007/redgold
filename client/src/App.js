import React, { useEffect, createContext, useReducer, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { reducer, initialState } from './reducers/userReducer';
import './App.css';

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import BloodBank from './components/screens/BloodBank';
import Dashboard from './components/screens/Dashboard';
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import Profile from './components/screens/Profile';

toast.configure();
export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const {dispatch} = useContext(UserContext)

  useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"))
      if(user) {
        dispatch({ type:"USER", payload: user });
      } else {
        history.push("/login");
      }
  }, [dispatch, history])

  return (
    <Switch>  
      <Route path="/bank" component={BloodBank} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={Profile} />
    </Switch>
  )
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{state, dispatch}}>
      <Router>
        <Navbar />
        <Routing />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Footer />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
