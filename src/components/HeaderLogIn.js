import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Button } from '@material-ui/core';
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

const HeaderLogIn = (props) => {
    const classes = props.classes;
    return (
        <Grid container spacing={3}>
            <Grid item xs={10}>
                <h1 className={classes.title}>ALPHATRADER</h1>
            </Grid>
            <Grid item xs={2}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={8}>
                        <Button fullWidth color="primary" variant="contained" className={classes.button} onClick={() => {
                            props.success(false);
                            history.push('/')
                        }}>
                            Sign Out
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default withStyles(styles)(HeaderLogIn);