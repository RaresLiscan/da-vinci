import React, {useState, useEffect} from 'react';
import './App.css';
import Login from './login';
import Register from './register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {useHistory} from 'react-router-dom';
import Home from './home';
import Menu from "./menu";
import Grid from "@material-ui/core/Grid";
import Header from "./header";
import Video from "./video";
import "../node_modules/video-react/dist/video-react.css";
import ProtectedRoute from './ProtectedRoute';
import authProvider from "./authProvider";
import {colors} from "./colors";
import {Hidden} from "@material-ui/core";
import QuizList from "./QuizList";
import Quiz from "./quiz";

function App() {

  const [init, setInit] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [menuHeight, setMenuHeight] = useState(window.innerHeight+15);
  const history = useHistory();

  const login = () => {
      setAuthenticated(true);
  }

  useEffect(() => {
      const timer = setTimeout(() => {
          if (init === false) {
              // initFirebase();
              if (authProvider.isAuthenticated()) {
                  // setAuthenticated(true);
                  // history.push('/');
              }
              setInit(true);
          }
      }, 1000);
      return () => clearTimeout(timer);
  }, []);

    const LoginComponent = () => {
      return <Login login={() => login()} />
    }

    const RegisterComponent = () => {
        return <Register login={() => login()} />
    }

    const updateMenuHeight = (newHeight) => {
        console.log(newHeight);
        setMenuHeight(newHeight);
    }

  return (
      <div>
        {init===true ? (
            <Router>
                {authenticated ? (
                    <div style={{borderStyle: 'solid', borderColor: 'black', borderWidth: 0, borderBottomWidth: 1}}>
                        <Header/>
                    </div>
                ) : (<div></div>)}
                <Grid container spacing={0} onClick={() => updateMenuHeight(document.getElementById("content").scrollHeight)}>

                    {authenticated===true ? (
                        <Hidden mdDown>
                            <Grid item xs={2} lg={2} style={{ height: menuHeight, paddingLeft: 0, paddingRight: 0, borderStyle: 'solid', borderRightWidth: 1,
                                                            borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0}}>
                                <Menu accordionOpen={true}/>
                            </Grid>
                        </Hidden>
                    ) : (
                        <div></div>
                    )}
                    <Grid id={"content"} item xs={12} lg={authenticated === true ? 10 : 12}
                          style={{paddingLeft: 0}}>
                        <Switch>
                            <Route path="/login" component={LoginComponent} />
                            <Route path="/register" component={RegisterComponent} />
                            <ProtectedRoute path="/radical/quiz/:id" component={Quiz} exact />
                            <ProtectedRoute path="/radical/quiz" component={QuizList} exact />
                            <ProtectedRoute path="/radical/:id" component={Video} exact />
                            <ProtectedRoute path="/" component={Home} />
                        </Switch>
                    </Grid>
                </Grid>
            </Router>
        ) : (<div></div>)}
      </div>

  );
}

export default App;
