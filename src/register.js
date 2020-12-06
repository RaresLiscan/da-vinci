import React, {useState} from "react";
import Container from '@material-ui/core/Container';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import logo from './img/logo.png';
import {Link, useHistory} from 'react-router-dom';
import {colors} from "./colors";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import authProvider from "./authProvider";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    button: {
        backgroundColor: colors.red,
        color: 'white',
        '&:hover': {
            backgroundColor: colors.blue5
        }
    },
    root: {
        display: 'flex',
        justifyContent: 'center'
    },
    paper: {
        maxWidth: 450,
        backgroundColor: colors.white,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: '5%',
        padding: '3%',
    }
})

export default function Register(props) {

    //init states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const history = useHistory();
    const classes = useStyles();


    const creareCont = () => {
        //verificam daca pass == confirmPass

        if (password.localeCompare(confirmPassword) === 0) {
            authProvider.register(email, password, name)
                .then(res => {
                    history.push("/");
                    props.login();
                })
        }
        else {
            alert("Parolele nu corespund!");
        }
        
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <Container maxWidth={"md"} style={{marginTop: '3%'}}>
            <center>
                <Paper className={classes.paper}  square>

                    <center>
                        <img src={logo} height={75} />
                    </center>

                    <h1 style={{ textAlign: 'center' }}>Inregistrare</h1>

                    <FormControl fullWidth variant="filled" style={{ marginBottom: '2%' }}>
                        <InputLabel htmlFor="filled-adornment-amount">Nume</InputLabel>
                        <FilledInput
                            id="filled-adornment-amount"
                            value={name}
                            onChange={event => setName(event.currentTarget.value)}
                        />
                    </FormControl>

                    <FormControl fullWidth variant="filled" style={{ marginBottom: '2%' }}>
                        <InputLabel htmlFor="filled-adornment-amount">Email</InputLabel>
                        <FilledInput
                            id="filled-adornment-amount"
                            value={email}
                            onChange={event => setEmail(event.currentTarget.value)}
                        />
                    </FormControl>

                    <FormControl fullWidth variant="filled" style={{ marginBottom: '2%' }}>
                        <InputLabel htmlFor="filled-adornment-amount">Parola</InputLabel>
                        <FilledInput
                            id="filled-adornment-amount"
                            value={password}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {!showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            onChange={event=>setPassword(event.currentTarget.value)}
                        />
                    </FormControl>

                    <FormControl fullWidth variant="filled" style={{ marginBottom: '2%' }}>
                        <InputLabel htmlFor="filled-adornment-amount">Confirma parola</InputLabel>
                        <FilledInput
                            id="filled-adornment-amount"
                            value={confirmPassword}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {!showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            onChange={event => setConfirmPassword(event.currentTarget.value)}
                        />
                    </FormControl>

                    <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '2%' }}>
                        <Button onClick={() => creareCont()} variant="contained" className={classes.button}>Inregistreaza-te</Button>
                    </div>
                    <div>
                        <p style={{textAlign: 'center'}}>Ai cont? <Link to={"/login"}>Loghează-te</Link></p>
                    </div>
                </Paper>
            </center>
        </Container>
    )

}