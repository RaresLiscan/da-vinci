import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
    root: {
        // padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        // marginLeft: '3%',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
        backgroundColor: "#f5f5f5",
        borderRadius: 0,
        margin: 0,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function Search() {
    const classes = useStyles();

    return (
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Cauta..."
                inputProps={{ 'aria-label': 'search' }}
            />
            <div style={{margin: 0, padding: 0}}>
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </div>
        </Paper>
    );
}