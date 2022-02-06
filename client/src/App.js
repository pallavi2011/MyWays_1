import {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
//import Landing from './components/layouts/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layouts/Alert';
import store from './store';
import {Provider} from 'react-redux';
import './App.css';
import setAuthToken from './utility/setAuthToken';
import {loadUser} from './actions/auth';
import Dashboard  from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Blog from './components/dashboard/Blog'
import EditBlog from './components/dashboard/EditBlog';
import CreateBlog from './components/dashboard/CreateBlog'

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () =>{ 
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return(
  <Provider store={store}>
    <Router>
  <Fragment>
    <Navbar/>
    <section className='container'>
      <Alert/>
      <Switch>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
        <PrivateRoute exact path='/dashboard' component={Dashboard}/>
        <PrivateRoute exact path='/blog/:id' component={Blog}/>
        <PrivateRoute exact path='/blog/edit/:id' component={EditBlog}/>
        <PrivateRoute exact path='/createblog' component={CreateBlog}/>
        </Switch>
   </section>
  </Fragment>
  </Router>
  </Provider>
  
)}
  


export default App;
