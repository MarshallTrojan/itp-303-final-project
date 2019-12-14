import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Header from './components/Header';
import StockMarket from './components/StockMarket'
import Search from './components/Search';
import {Switch, Route} from 'react-router-dom'
import Signin from './components/Signin';
import UserDashboard from './components/UserDashboard';

const styles = {
  root: {
    width: "95%",
    marginLeft: 'auto',
    marginRight: 'auto'
  },
}

const App = (props) => {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <main>
        <Switch>
          <Route exact path='/' render={props => 
            <div>
              <Header />
              <StockMarket signIn={false} />
              <Search watchList={false} signIn={false}/>
            </div>
          } />
          <Route path='/signin' render={props => 
            <div>
              <Signin />
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
