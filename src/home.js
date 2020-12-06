import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {MuiThemeProvider} from "@material-ui/core/styles";
import {colors} from "./colors";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import {Hidden} from "@material-ui/core";
import check from './img/check.png';
import circle from './img/circle.png';
import { useHistory } from 'react-router-dom';
import authProvider from "./authProvider";
import play from './img/play.png';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    button: {
        backgroundColor: colors.blue5,
        marginTop: '2%',
        marginBottom: '2%',
        marginRight: '2%',
        borderRadius: 0,
        fontWeight: 'bold',
        color: 'white',
        '&:hover': {
            backgroundColor: colors.blue3,
            // color: 'white',
        }
    },
    divider: {
        width: '80%'
    },
    episode: {
        backgroundColor: '#f5f5f5',
        borderStyle: 'solid',
        borderWidth: 1,
        color: 'black',
        width: '80%',
        cursor: 'pointer',
        margin: '1%',
        '&:hover': {
            backgroundColor: '#e3e3e3',
            // color: 'white'
        }
    }
}));

const muiTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#16d957",
            contrastText: '#ffffff',
        }
    }
})

function getSteps() {
    return [1, 2, 3, 4, 5, 6, 7];
}

function getStepContent(stepIndex) {
    return <p style={{color: 'black'}}>Episodul {stepIndex}</p>;
}

const episodes = [
    {
        id: 1,
        done: false,
        name: 'Geometrie'
    },
    {
        id: 2,
        done: false,
        name: 'Procente'
    },
    {
        id: 3,
        done: false,
        name: 'Tendințe centrale și Deviație'
    },
    {
        id: 4,
        done: false,
        name: 'Funcții și dreapta funcției'
    },
    {
        id: 5,
        done: false,
        name: 'Grafice'
    },
    {
        id: 6,
        done: false,
        name: 'Probabilități simple'
    },
    {
        id: 7,
        done: false,
        name: 'Probabilități Bayes'
    },
]

export default function Home() {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(-1);
    const [init, setInit] = React.useState(false);
    const steps = getSteps();
    const history = useHistory();

    useEffect(() => {
        if (init === false) {
            getMilestone();
            setInit(true);
        }
    }, []);

    const setActiveEpisodes = (milestone) => {
        for (var i = 0; i < milestone; i ++) {
            episodes[i].done = true;
        }
        setActiveStep(milestone-1);
    }

    const getMilestone = () => {
        fetch(`https://api.amosed.ro/edu/radical/milestones.php?user_id=${authProvider.getUser()[0].id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json.length > 0) {
                    setActiveEpisodes(parseInt(json[0].last_episode));
                }
            })
    }

    const goToEpisode = (episode) => {
        history.push(`/radical/${episode.id}`);
    }

    const EpisodeCard = (episode) => (
        <center>
            <Grid container spacing={1} alignItems={"center"} className={classes.episode} onClick={() => goToEpisode(episode)}>
                <Grid item xs={3} sm={1} >
                    {episode.done ? <img src={check} alt={"check"} height={35} /> : <img src={play} alt={"check"} height={35} />}
                </Grid>
                <Grid item xs={9} sm={11}>
                    <h3 style={{textAlign: 'left'}}>{episode.id}. {episode.name}</h3>
                </Grid>
            </Grid>
        </center>
    )

    const nextEpisode = () => {
        if (activeStep === -1) {
            history.push(`/radical/1`)
        }
        else {
            history.push(`/radical/${activeStep + 2}`);
        }
    }

    return (
        <center>
            <div style={{width: '100%', marginLeft: '0%', marginTop: '1%', }}>
                <p style={{fontSize: 45, fontWeight: 'bold', marginBottom: 0, marginTop: 0}}>Radical</p>
                <MuiThemeProvider theme={muiTheme}>
                    <Hidden smDown>
                        <Stepper activeStep={activeStep} alternativeLabel style={{width: '80%'}}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel iconColor={"secondary"}>{getStepContent(label)}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Hidden>
                </MuiThemeProvider>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '3%'}}>
                <Grid container spacing={3} style={{backgroundColor: 'white', borderStyle: 'solid', borderWidth: 1, width: '80%', marginTop: '1%'}}
                      alignItems={"center"} justify={'center'} direction={"row"}>
                    <Hidden mdDown>
                        <Grid item xs={12} lg={10}>
                            {activeStep !== -1 ? (
                                <div>
                                    <p style={{color: colors.blue5, paddingLeft: '2%', textAlign: 'left', marginBottom: 0}}>Ai ramas la Episodul {activeStep + 2}</p>
                                    <h3 style={{textAlign: 'left', paddingLeft: '2%', paddingTop: 0, marginTop: 0,}}>Functii si ecuatia dreptei</h3>
                                </div>
                            ) : (
                                <h3 style={{color: colors.blue5, paddingLeft: '2%', textAlign: 'left'}}>Începe cursul!</h3>
                            )}
                        </Grid>
                        <Grid item xs={12} lg={2} style={{display: 'flex'}}>
                            <Button style={{marginLeft: 'auto', marginRight: '12%'}} onClick={() => nextEpisode()} className={classes.button}>Continuă aici</Button>
                        </Grid>
                    </Hidden>
                    <Hidden lgUp>
                        <Grid item xs={12} md={10}>
                            {activeStep !== -1 ? (
                                <h3 style={{color: colors.white, textAlign: 'center', paddingLeft: '2%'}}>Ai ramas la episodul {activeStep + 2}</h3>
                            ) : (
                                <h3 style={{color: colors.white, textAlign: 'center', paddingLeft: '2%'}}>Începe cursul!</h3>
                            )}

                        </Grid>
                        <Grid item xs={12} md={2} style={{display: 'flex', justifyContent: 'center'}}>
                            <Button onClick={() => nextEpisode()} className={classes.button}>Continuă aici</Button>
                        </Grid>
                    </Hidden>
                </Grid>
            </div>

            <center style={{marginBottom: '2.5%'}}>
                <Divider className={classes.divider}/>
            </center>

            <div>
                {episodes.map(ep => {
                    return EpisodeCard(ep)
                })}
            </div>

        </center>
    );
}