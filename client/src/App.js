import {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
//import Landing from './components/layouts/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layouts/Alert';
import store from './store';
import {Provider} from 'react-redux';
import './App.css';


const App = () =>(
  <Provider store={store}>
    <Router>
  <Fragment>
    <Navbar/>
    <section className='container'>
      <Alert/>
      <Switch>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
        </Switch>
   </section>
  </Fragment>
  </Router>
  </Provider>
  
)
  


export default App;