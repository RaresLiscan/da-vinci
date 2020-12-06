import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import authProvider from "./authProvider";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    cell: {
        '&:hover': {
            backgroundColor: '#ebebeb',
            cursor: 'pointer',
            color: 'black'
        }
    },
    tableHead: {
        backgroundColor: 'black',
        color: 'white !important'
    },
    tableText: {
        fontSize: 18,
    },
    tableTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    }
});

export default function QuizList() {
    const classes = useStyles();

    const [rows, setRows] = useState([]);
    const history = useHistory();

    const average = () => {
        let sum = 0, n = 0;
        rows.map(quiz => {
            sum += parseFloat(quiz.grade);
            n ++;
        });
        return sum / n;
    }

    const getDbData = async () => {
        const id = authProvider.getUser()[0].id;
        await fetch(`https://api.amosed.ro/edu/radical/quiz.php?user_id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(json => {
                setRows(json);
            })
            .catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        if (rows.length === 0) {
            getDbData();
        }
    }, []);

    const goToQuiz = (quiz) => {
        localStorage.setItem("quizName", quiz.name);
        history.push(`/radical/quiz/${quiz.quiz_id}`);
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Quiz-uri Radical</h1>
            <div style={{margin: '2%'}}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow className={classes.tableHead}>
                                <TableCell align="left" className={classes.tableTitle} width={'10%'}>Nr. Crt.</TableCell>
                                <TableCell align="center" className={classes.tableTitle} width={'37%'}>Nume quiz</TableCell>
                                <TableCell align="center" className={classes.tableTitle} width={'36%'}>Număr întrebări</TableCell>
                                <TableCell align="center" className={classes.tableTitle} width={'15%'}>Nota ta</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={row.name} className={classes.cell} onClick={() => goToQuiz(row)}>
                                    <TableCell className={classes.tableText}>{index + 1}</TableCell>
                                    <TableCell className={classes.tableText} component="th" scope="row" align={"center"}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell className={classes.tableText} align="center">{row.questions}</TableCell>
                                    <TableCell align="center" className={classes.tableText}>{row.grade}/10</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <h2 style={{margin: '3% 0.5%'}}>Media: {average()}</h2>
            </div>
        </div>
    );
}