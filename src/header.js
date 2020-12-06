import React from 'react';
import Search from "./sections/search";
import Profile from "./sections/profile";
import Drawer from '@material-ui/core/Drawer';
import Menu from "./menu";
import {Button} from "@material-ui/core";
import {colors} from "./colors";
import Hidden from "@material-ui/core/Hidden";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Grid from "@material-ui/core/Grid";
import logo from "./img/logo.png";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
    drawer: {
        backgroundColor: colors.blue5,
    },
    menuButton: {
        color: colors.blue5,
    },
    menuButtonSize: {
        width: 50,
        height: 50,
    },
})

export default function Header() {

    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    return (
        <Box border={0}>
            <Grid container>
                <Grid item xs={0} md={2} >
                    <Hidden smDown>
                        <div style={{ display:'flex', justifyContent: 'center', alignItems:'center', backgroundColor: 'white', height: '100%'}}>
                            <img src={logo} alt={"Logo Da Vinci"} height={65} />
                        </div>
                    </Hidden>
                </Grid>
                <Grid item xs={12} md={10} >
                    <div style={{width: '100%', backgroundColor: "white", padding: '1%', display: 'flex'}}>
                        <Hidden lgUp>
                            <div style={{margin: '0% 2%'}}>
                                <IconButton className={classes.menuButton} aria-label="add an alarm" onClick={() => setDrawerOpen(true)}>
                                    <MenuIcon className={classes.menuButtonSize} />
                                </IconButton>
                                <Drawer anchor={"left"} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                                    <div style={{width: 250}} onClick={() => setDrawerOpen(false)} onKeyDown={() => setDrawerOpen(false)}>
                                        <Menu accordionOpen={true} />
                                    </div>
                                </Drawer>
                            </div>
                        </Hidden>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Hidden smDown>
                                <Search/>
                            </Hidden>
                        </div>
                        <div style={{marginLeft: 'auto', marginRight: '3%', display: 'flex', alignItems: 'center', color: colors.blue5}}>
                            <Profile/>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Box>
    )

}