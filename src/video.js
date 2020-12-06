import React, {useEffect, useState} from 'react';
import { Player, BigPlayButton } from 'video-react';
import logo from './img/logo.png';
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {colors} from "./colors";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import authProvider from "./authProvider";
import {useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Divider from "@material-ui/core/Divider";
import amosedLogo from './img/davinciBackground.jpg';

const useStyles = makeStyles({
    button: {
        fontSize: 18,
        backgroundColor: 'white',
        color: colors.blue5,
        padding: '15%',
        textDecoration: 'underline',
        '&:hover': {
            backgroundColor: '#e3e3e3',
            // color: colors.blue5
        }
    }
})

export default function Video(props) {

    const classes = useStyles();
    const [video, setVideo] = useState("Procente");
    const [loaded, setLoaded] = useState(false);
    const [player, setPlayer] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const [videoDone, setVideoDone] = useState(false);
    let videoId = props.computedMatch.params.id;
    const history = useHistory();
    let interval;

    const checkChange = () => {
        if (player !== null ) {
            if (player.getState().player.duration - player.getState().player.currentTime < 10)
                setVideoAsDone();
        }
    }

    useEffect(() => {
        if (player !== null) {
            interval = setInterval(() => {
                checkChange();
            }, 1000);
        }
        if (video === null || loaded === false) {
            getData();
        }

        return function cleanup() {
            clearInterval(interval);
        }
    });

    const getData = () => {
        fetch(`https://api.amosed.ro/edu/radical/videos.php?id=${videoId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(json => {
                setVideo(json[0]);
                setLoaded(true);
            })
            .catch(error => console.error(error));
    }

    const setVideoAsDone = () => {
        if (videoDone === false) {
            setVideoDone(true);
            fetch("https://api.amosed.ro/edu/radical/milestones.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: authProvider.getUser()[0].id,
                    last_episode: video.id,
                }),
            })
                .catch(error => console.log(error));
        }
    }

    const nextEpisode = () => {
        videoId = parseInt(videoId) + 1;
        setLoaded(false);
        setVideo(null);
        getData();

        setVideoAsDone();
        history.push(`/radical/${parseInt(video.id)+1}`);
    }

    const prevEpisode = () => {
        videoId = parseInt(videoId) - 1;
        setLoaded(false);
        setVideo(null);
        getData();

        history.push(`/radical/${parseInt(video.id)-1}`);
    }


    return loaded ? (
        <div>
            <div style={{display: 'flex', justifyContent: 'flex-end', padding: '1%', paddingRight: '2%', borderStyle: 'solid', borderBottomWidth: 1, borderRightWidth: 0, borderTopWidth: 0, borderLeftWidth: 0}}>
                    <Link to={`/radical/${parseInt(video.id)-1}`} onClick={() => prevEpisode()} style={{marginRight: '1%'}}>
                        Inapoi
                    </Link>
                    <div>
                        <Divider orientation="vertical"/>
                    </div>
                    <Link to={`/radical/${parseInt(video.id)+1}`} onClick={() => nextEpisode()} style={{marginLeft: '1%'}}>
                        Inainte
                    </Link>
            </div>
            <center style={{padding: '2%'}}>

                <h1>Episodul {video.id}: {video.name}</h1>


                <div style={{width: '80%', borderStyle: 'solid', borderWidth: 1}}>
                    <Player ref={player => {
                        setPlayer(player);
                    }} playsInLine poster={amosedLogo} src={video.link}>
                        <BigPlayButton position={"center"} />
                    </Player>
                </div>
                <div style={{width: '80%', textAlign: 'left'}}>
                    <h1>Descriere</h1>
                    <p>{video.description}</p>
                </div>
            </center>
        </div>
    ) : (<div></div>)

}