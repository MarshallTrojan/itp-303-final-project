import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Header from './components/Header';
import StockMarket from './components/StockMarket'
import Search from './components/Search';
import {Switch, Route} from 'react-router-dom'
import Signin from './components/Signin';
import UserDashboard from './components/UserDashboard';
import HeaderLogIn from './components/HeaderLogIn';

const styles = {
  root: {
    width: "95%",
    marginLeft: 'auto',
    marginRight: 'auto'
  },
}

const App = (props) => {
  const [header, setHeader] = useState(false);
  const classes = props.classes;
  const signInSuccess = (val) => {
    setHeader(val)
  }
  return (
    <div className={classes.root}>
      <header>
        {header === true ? <HeaderLogIn success={signInSuccess} /> : <Header />}
      </header>
      <main>
        <Switch>
          <Route exact path='/' render={props => 
            <div>
              <StockMarket signIn={false} />
              <Search watchList={false} signIn={false}/>
            </div>
          } />
          <Route path='/signin' render={props => 
            <div>
              <Signin success={signInSuccess} />
            </div>
          } />
          <Route path='/signup' component={Signin} />
          <Route path='/dashboard' component={UserDashboard} />
        </Switch>
      </main>
    </div>
  );
}

export default withStyles(styles)(App);
