import React, {useState} from "react";
import Container from '@material-ui/core/Container';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import logo from './img/logo.png';
import firebase from 'firebase';
import {useHistory} from 'react-router-dom';
import {colors} from "./colors";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {Link} from 'react-router-dom';
import authProvider from "./authProvider";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
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
        padding: '2%',
    }
}));


export default function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const history = useHistory();
    const classes = useStyles();

    const autentificare = () => {
        authProvider.login(email, password)
            .then((response) => {
                console.log(response);
                history.push("/");
                props.login();
            })
            .catch(error => console.error(error));
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <Container maxWidth="md" style={{ backgroundColor: 'white', padding: '1%' }}>
            <center>
                <Paper square className={classes.paper}>
                    <center>
                        <img src={logo} height={75} />
                    </center>


                    <h1 style={{ textAlign: 'center' }}>Autentificare</h1>

                    <FormControl fullWidth variant="filled" style={{ marginBottom: '2%' }}>
                        <InputLabel htmlFor="filled-adornment-amount">Email</InputLabel>
                        <FilledInput
                            id="filled-adornment-amount"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </FormControl>

                    <FormControl fullWidth variant="filled" style={{ marginBottom: '2%' }}>
                        <InputLabel htmlFor="filled-adornment-amount">Parola</InputLabel>
                        <FilledInput
                            id="filled-adornment-amount"
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
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </FormControl>

                    <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '2%' }}>
                        <Button variant="contained" className={classes.button} onClick={() => autentificare()}>Autentificare</Button>
                    </div>
                    <div>
                        <p style={{textAlign: 'center'}}>Nu ai cont? <Link to={"/register"}>Crează-ți unul</Link></p>
                    </div>
                </Paper>
            </center>
        </Container>
    )
}