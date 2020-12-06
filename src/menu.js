import React from 'react';
import logo from './img/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import {Link, useHistory} from 'react-router-dom';
import {colors} from "./colors";
import play from './img/play.png';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    button: {
        color: colors.blue5,
        backgroundColor: 'white',
        width: '100%',
        boxShadow: 'none',
        fontWeight: 'bold',
        margin: 0,
        textAlign: 'left',
        justifyContent: 'flex-start',
        paddingLeft: '10%',
        fontSize: 22,
        '&:hover': {
            backgroundColor: '#e3e3e3',
            boxShadow: 'none',
            // color: 'white',
        }
    },
    logout: {
        color: 'white',
        backgroundColor: colors.red,
        width: '100%',
        boxShadow: 'none',
        fontWeight: 'bold',
        margin: 0,
        textAlign: 'left',
        justifyContent: 'flex-start',
        paddingLeft: '10%',
        fontSize: 22,
        '&:hover': {
            // backgroundColor: '#84a9ac',
            boxShadow: 'none',
            // color: 'white',
        }
    },
    heading: {
        justifySelf: 'center',
        backgroundColor: '#84a9ac'
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        textAlign: 'center',
        fontWeight: 'bold',
        justifySelf: 'center'
    },
    accordion: {
        backgroundColor: 'white',
        boxShadow: 'none',
        color: 'white',
        borderWidth: 0,
        margin: '0px !important',
        padding: '0px !important',
        // margin: 0,
        // padding: 0,
    },
    accordionDetails: {
        margin: 0,
        padding: 0,
        display: 'block',
        // backgroundColor: '#204051'
    },
    accordionBox: {
      borderWidth: 1,
      borderStyle: 'solid',
    },
    episode: {
        color: colors.blue5,
        textAlign: 'left',
        backgroundColor: 'white',
        width: '100%',
        boxShadow: 'none',
        margin: 0,
        fontSize: 16,
        textTransform: 'none',
        justifyContent: 'left',
        paddingLeft: '15%',
        borderRadius: 0,
        '&:hover': {
            backgroundColor: '#e3e3e3',
            boxShadow: 'none',
        }
    },
}));

export default function Menu(props) {

    const [expanded, setExpanded] = React.useState(props.accordionOpen === true ? true : false);
    const classes = useStyles();
    const history = useHistory();

    const handleChange = () => (event, isExpanded) => {
        setExpanded(!expanded);
    };

    const navToLink = (link) => {
        history.push(link);
    }

    return (
        <section style={{paddingLeft: '2%', padding: 0}}>
            {/*<div style={{paddingTop: '4%', paddingLeft: '11%', paddingBottom: '4%', backgroundColor: 'white'}}>*/}
            {/*    <img src={logo} alt={"Logo Da Vinci"} height={65} />*/}
            {/*</div>*/}
            <div style={{marginTop: '3%'}}>
                <Button variant="contained" className={classes.button} onClick={() => navToLink("/")}>Overview</Button>
                <Accordion expanded={expanded} onChange={handleChange()} className={classes.accordion}>
                    <AccordionSummary
                        id="panel1bh-header"
                        className={classes.accordionDetails}
                    >
                        <Button variant="contained" className={classes.button}>Episoade</Button>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                        <a href={"/radical/1"} style={{textDecoration: 'none'}}>
                            <Button startIcon={<img src={play} height={15} />} variant="text" className={classes.episode}>1. Geometrie</Button>
                        </a>
                        <a href={"/radical/2"} style={{textDecoration: 'none'}}>
                            <Button startIcon={<img src={play} height={15} />} variant="text" className={classes.episode}>2. Procente</Button>
                        </a>
                        <a href={"/radical/3"} style={{textDecoration: 'none'}}>
                            <Button startIcon={<img src={play} height={15} />} variant="text" className={classes.episode}>3. Tendințe centrale și Deviație</Button>
                        </a>
                        <a href={"/radical/4"} style={{textDecoration: 'none'}}>
                            <Button startIcon={<img src={play} height={15} />} variant="text" className={classes.episode}>4. Funcții și dreapta funcției</Button>
                        </a>
                        <a href={"/radical/5"} style={{textDecoration: 'none'}}>
                            <Button startIcon={<img src={play} height={15} />} variant="text" className={classes.episode}>5. Grafice</Button>
                        </a>
                        <a href={"/radical/6"} style={{textDecoration: 'none'}}>
                            <Button startIcon={<img src={play} height={15} />} variant="text" className={classes.episode}>6. Probabilități simple</Button>
                        </a>
                        <a href={"/radical/7"} style={{textDecoration: 'none'}}>
                            <Button startIcon={<img src={play} height={15} />} variant="text" className={classes.episode}>7. Probabilități Bayes</Button>
                        </a>
                    </AccordionDetails>
                </Accordion>
                <Button variant="contained" className={classes.button} onClick={() => navToLink("/radical/quiz")}>Quiz-uri</Button>
                {/*<Button variant="contained" className={classes.logout} onClick={() => navToLink("/radical/quiz")}>Deloghează-te</Button>*/}
                {/*<Button variant="contained" className={classes.button} onClick={() => navToLink("/radical/intrebari")}>Întrebări</Button>*/}
                {/*<Button variant="contained" className={classes.button} onClick={() => navToLink("/radical/resurse")}>Resurse</Button>*/}
            </div>
        </section>
    )

}