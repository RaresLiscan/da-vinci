import React from 'react';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import authProvider from "../authProvider";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <AccountCircleOutlinedIcon style={{fontSize: 35}} />
            <h3 style={{paddingLeft: 2}}>{authProvider.getUser()[0].name}</h3>
            {/*<ArrowDropDownOutlinedIcon style={{fontSize: 30}} />*/}
        </div>
      {/*  <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>*/}
      {/*  Popa Antonia*/}
      {/*</Button>*/}
      {/*<Menu*/}
      {/*  id="simple-menu"*/}
      {/*  anchorEl={anchorEl}*/}
      {/*  keepMounted*/}
      {/*  open={Boolean(anchorEl)}*/}
      {/*  onClose={handleClose}*/}
      {/*>*/}
      {/*  <MenuItem onClick={handleClose}>*/}
      {/*      <div>*/}
      {/*          <h4>Popa Antonia</h4>*/}
      {/*      </div>*/}
      {/*      <div>*/}
      {/*          <p>anto.px@yahoo.com</p>*/}
      {/*      </div>*/}
      {/*  </MenuItem>*/}
      {/*  <MenuItem onClick={handleClose}>Logout</MenuItem>*/}
      {/*</Menu>*/}
    </div>
  );
}


// const useStyles = makeStyles((theme) => ({
//     root: {
//       display: 'flex',
//     },
//     paper: {
//       marginRight: theme.spacing(2),
//     },
//   })); 

// export default function Profile() {

//     return (
//         <div style={{display: 'flex', alignItems: 'center'}}>
//             <AccountCircleOutlinedIcon style={{fontSize: 35}} />
//             <h3 style={{paddingLeft: 2}}>{authProvider.getUser()[0].name}</h3>
//             <ArrowDropDownOutlinedIcon style={{fontSize: 30}} />


//         </div>
//     )

// }

// export default function MenuListComposition() {
//     const classes = useStyles();
//     const [open, setOpen] = React.useState(false);
//     const anchorRef = React.useRef(null);
  
//     const handleToggle = () => {
//       setOpen((prevOpen) => !prevOpen);
//     };
  
//     const handleClose = (event) => {
//       if (anchorRef.current && anchorRef.current.contains(event.target)) {
//         return;
//       }
  
//       setOpen(false);
//     };
  
//     function handleListKeyDown(event) {
//       if (event.key === 'Tab') {
//         event.preventDefault();
//         setOpen(false);
//       }
//     }
  
//     // return focus to the button when we transitioned from !open -> open
//     const prevOpen = React.useRef(open);
//     React.useEffect(() => {
//       if (prevOpen.current === true && open === false) {
//         anchorRef.current.focus();
//       }
  
//       prevOpen.current = open;
//     }, [open]);
  
//     return (
//       <div className={classes.root}>
//         <Paper className={classes.paper}>
//           <MenuList>
//             <MenuItem>Profile</MenuItem>
//             <MenuItem>My account</MenuItem>
//             <MenuItem>Logout</MenuItem>
//           </MenuList>
//         </Paper>
//         <div>
//           <Button
//             ref={anchorRef}
//             aria-controls={open ? 'menu-list-grow' : undefined}
//             aria-haspopup="true"
//             onClick={handleToggle}
//           >
//             Toggle Menu Grow
//           </Button>
//           <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
//             {({ TransitionProps, placement }) => (
//               <Grow
//                 {...TransitionProps}
//                 style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
//               >
//                 <Paper>
//                   <ClickAwayListener onClickAway={handleClose}>
//                     <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
//                       <MenuItem onClick={handleClose}>Profile</MenuItem>
//                       <MenuItem onClick={handleClose}>My account</MenuItem>
//                       <MenuItem onClick={handleClose}>Logout</MenuItem>
//                     </MenuList>
//                   </ClickAwayListener>
//                 </Paper>
//               </Grow>
//             )}
//           </Popper>
//         </div>
//       </div>
//     );
//   }
  