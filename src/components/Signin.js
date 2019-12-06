import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper, TextField, Button } from '@material-ui/core';
import history from '../history';
const styles = {
    root: {
        width: '20%',
        marginTop: '30px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 20,
        textAlign: 'center'
    },
    title: {
        marginTop: 0,
    },
    textInput: {
        marginBottom: 20,
    }
};

const SignIn = (props) => {
    const classes = props.classes;
    return (
        <Paper className={classes.root}>
            <h3 className={classes.title}>Welcome to AlphaTrader</h3>
            {
                window.location.pathname === '/signin' ? (
                    <form>
                        <TextField label="Username" color="primary" variant="outlined" fullWidth className={classes.textInput} />
                        <TextField label="Password" color="primary" variant="outlined" fullWidth type="password" className={classes.textInput}/>
                        <Button color="primary" variant="contained" onClick={() => {
                            props.success(true);
                            history.push('/dashboard');
                        }}>
                            Log in
                        </Button>
                    </form>
                ) : (
                    <form>
                        <TextField label="Username" color="primary" variant="outlined" fullWidth className={classes.textInput} />
                        <TextField label="Email" type="email" color="primary" variant="outlined" fullWidth className={classes.textInput} />
                        <TextField label="Password" color="primary" variant="outlined" fullWidth type="password" className={classes.textInput}/>
                        <TextField label="Password" color="primary" variant="outlined" fullWidth type="password" className={classes.textInput}/>
                        <Button color="primary" variant="contained" onClick={() => {
                            history.push('/signin');
                        }}>
                            Register
                        </Button>
                    </form>
                )
            }
        </Paper>
    )
};

export default withStyles(styles)(SignIn);
