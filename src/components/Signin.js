import React, {useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper, TextField, Button } from '@material-ui/core';
import history from '../history';
import Header from './Header';
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
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name === "" || password === "") {
            alert("please enter username and password");
        } else {
            fetch('http://303.itpwebdev.com/~pbauman/finalproject/api/user/read.php', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    "email": name,
                    "password": password
                })
            })
                .then(results => {
                    return results.json()
                })
                .then(res => {
                    console.log(res[0]);
                    if (res[0].succeed) {
                        sessionStorage.setItem("id", res[0].id);
                        history.push('/dashboard');
                    } else {
                        alert("Wrong username or password, please try again!");
                    }
                })
        }
    }

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        console.log(name);
        console.log(email);
        console.log(password);
        if (name === "" || email === "" || password === "" || passwordAgain === "") {
            alert("Please fill out all the fields");
        } else if (password !== passwordAgain) {
            alert("Passwords not match! Please try again.");
        } else {
            fetch('http://303.itpwebdev.com/~pbauman/finalproject/api/user/register.php', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    "username": name,
                    "email": email,
                    "password": password
                })
            })
                .then(results => {
                    return results.json()
                })
                .then(res => {
                    console.log(res[0]);
                    if (res[0].succeed) {
                        history.push('/signin')
                    } else {
                        alert("There's something wrong, Please check back later!");
                    }
                })
        }
    }

    return (
        <div>
            <Header />
            <Paper className={classes.root}>
                <h3 className={classes.title}>Welcome to AlphaTrader</h3>
                {
                    window.location.pathname === '/signin' ? (
                        <form onSubmit={(event) => handleSubmit(event)}>
                            <TextField label="Username" color="primary" variant="outlined" fullWidth className={classes.textInput} onChange={(e) =>setName(e.target.value)} />
                            <TextField label="Password" color="primary" variant="outlined" fullWidth type="password" className={classes.textInput} onChange={(e) => setPassword(e.target.value)} />
                            <Button color="primary" variant="contained" type="submit">
                                Log in
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={(event) => handleRegisterSubmit(event)}>
                            <TextField label="Username" color="primary" variant="outlined" fullWidth className={classes.textInput} onChange={(e) =>setName(e.target.value)} />
                            <TextField label="Email" type="email" color="primary" variant="outlined" fullWidth className={classes.textInput} onChange={(e) =>setEmail(e.target.value)} />
                            <TextField label="Password" color="primary" variant="outlined" fullWidth type="password" className={classes.textInput} onChange={(e) =>setPassword(e.target.value)}/>
                            <TextField label="Password" color="primary" variant="outlined" fullWidth type="password" className={classes.textInput} onChange={(e) =>setPasswordAgain(e.target.value)}/>
                            <Button color="primary" variant="contained" type="submit">
                                Register
                            </Button>
                        </form>
                    )
                }
            </Paper>
        </div>
    )
};

export default withStyles(styles)(SignIn);
