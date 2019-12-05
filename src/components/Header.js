import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Button } from '@material-ui/core';
import {Link} from 'react-router-dom';
import history from '../history';

const styles = {
    root: {
       width: '100%',
       height: '20%',
       backgroundColor: 'red' 
    },
    title: {
        marginTop: 0,
        marginBottom: 0,
        color: '#004346'
        //marginLeft: 80
    },
    button: {
        //color: '#004346'
        backgroundColor: '#004346'
    }
};

const Header = (props) => {
    const classes = props.classes;
    return (
        <Grid container spacing={3}>
            <Grid item xs={10}>
                <h1 className={classes.title}>ALPHATRADER</h1>
            </Grid>
            <Grid item xs={2}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Button fullWidth color="primary" variant="contained" className={classes.button} onClick={() => history.push('/signin')}>
                            SignIn
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth color="primary" variant="contained" className={classes.button} onClick={() => history.push('/signup')}>
                            SignUp
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default withStyles(styles)(Header);