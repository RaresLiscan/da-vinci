import React from 'react';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {Divider} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {colors} from "./colors";
import authProvider from "./authProvider";

const useStyles = makeStyles({
    button: {
        backgroundColor: colors.blue5,
        color: colors.white,
        margin: '0% 3%',
        fontSize: 20,
        '&:hover': {
            backgroundColor: colors.blue1,
            color: colors.blue5,
        }
    }
})

function SubmitButton({ submit }) {
    const classes = useStyles();
    return (
        <Button className={classes.button} onClick={() => submit()}>Trimite</Button>
    )
}

export default class Quiz extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            checkedAnswers: [],
            submitted: false,
            grade: 0,
            message: ''
        };
        this.quizId = this.props.computedMatch.params.id;
        this.quizName = localStorage.getItem("quizName");
    }

    handleChange = (checked, answer, index) => {
        let answers = this.state.checkedAnswers;

        switch (answer) {
            case 1:
                answers[index].answer1 = checked;
                break;
            case 2:
                answers[index].answer2 = checked;
                break;
            case 3:
                answers[index].answer3 = checked;
                break;
            case 4:
                answers[index].answer4 = checked;
                break;
            default:
                break;
        }
        this.setState({ checkedAnswers: answers });
    }

    QuestionComponent = (question, index) => {
        //'#adffc7' : '#ff7d7d'
        const ratio = 10 / this.state.questions.length;
        return (
            <li style={{padding: '1% 0%'}}>
                <p style={{fontSize: 18}}>{question.question}</p>
                <div style={{display: this.state.submitted ? 'block' : 'none'}}>
                    {this.checkIfCorrect(question, index) ? (
                        <p style={{padding: '2%', backgroundColor: '#adffc7'}}>{ratio}/{ratio}</p>
                    ) : (
                        <p style={{padding: '2%', backgroundColor: '#ff7d7d'}}>0/{ratio}</p>
                    )}
                </div>
                <FormGroup style={{marginleft: '5%'}}>
                    <FormControlLabel
                        control={<Checkbox checked={this.state.checkedAnswers[index].answer1}
                                           onChange={(event, checked) => this.handleChange(checked, 1, index)} />}
                        label={question.answer1}
                    />
                    <div style={{display: this.state.submitted && this.state.checkedAnswers[index].answer1 ? 'block' : 'none'}}>
                        {(parseInt(question.correctAnswer1) !== 0) === this.state.checkedAnswers[index].answer1 ? (
                            <h2 style={{color: 'green', marginLeft: '3%'}}>Corect</h2>
                        ) : (
                            <h2 style={{color: 'red', marginLeft: '3%'}}>Greșit</h2>
                        )}
                    </div>
                    <FormControlLabel
                        control={<Checkbox checked={this.state.checkedAnswers[index].answer2}
                                           onChange={(event, checked) => this.handleChange(checked, 2, index)} />}
                        label={question.answer2}
                    />
                    <div style={{display: this.state.submitted && this.state.checkedAnswers[index].answer2 ? 'block' : 'none'}}>
                        {(parseInt(question.correctAnswer2) !== 0) === this.state.checkedAnswers[index].answer2 ? (
                            <h2 style={{color: 'green', marginLeft: '3%'}}>Corect</h2>
                        ) : (
                            <h2 style={{color: 'red', marginLeft: '3%'}}>Greșit</h2>
                        )}
                    </div>
                    <FormControlLabel
                        control={<Checkbox checked={this.state.checkedAnswers[index].answer3}
                                           onChange={(event, checked) => this.handleChange(checked, 3, index)} />}
                        label={question.answer3}
                    />
                    <div style={{display: this.state.submitted && this.state.checkedAnswers[index].answer3 ? 'block' : 'none'}}>
                        {(parseInt(question.correctAnswer3) !== 0) === this.state.checkedAnswers[index].answer3 ? (
                            <h2 style={{color: 'green', marginLeft: '3%'}}>Corect</h2>
                        ) : (
                            <h2 style={{color: 'red', marginLeft: '3%'}}>Greșit</h2>
                        )}
                    </div>
                    <FormControlLabel
                        control={<Checkbox checked={this.state.checkedAnswers[index].answer4}
                                           onChange={(event, checked) => this.handleChange(checked, 4, index)} />}
                        label={question.answer4}
                    />
                    <div style={{display: this.state.submitted && this.state.checkedAnswers[index].answer4 ? 'block' : 'none'}}>
                        {(parseInt(question.correctAnswer4) !== 0) === this.state.checkedAnswers[index].answer4 ? (
                            <h2 style={{color: 'green', marginLeft: '3%'}}>Corect</h2>
                        ) : (
                            <h2 style={{color: 'red', marginLeft: '3%'}}>Greșit</h2>
                        )}
                    </div>
                </FormGroup>
            </li>
        )
    }

    prepCheckedAnswers = (questions) => {
        let answers = [];
        questions.map((q, index) => {
            answers.push({
                answer1: false,
                answer2: false,
                answer3: false,
                answer4: false,
            })
        });
        this.setState({checkedAnswers: answers});
    }

    updateQuizDb = async (grade) => {
        console.log(JSON.stringify({
            "name": this.quizName,
            "questions": this.state.questions.length,
            "user_id": authProvider.getUser()[0].id,
            "quiz_id": this.quizId,
            "grade": grade
        }))
        await fetch("https://api.amosed.ro/edu/radical/quiz_answers.php", {
            method: "POST",
            body: JSON.stringify({
                "name": this.quizName,
                "questions": this.state.questions.length,
                "user_id": authProvider.getUser()[0].id,
                "quiz_id": this.quizId,
                "grade": grade
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .catch(error => {
                console.error(error);
            })
    }

    checkIfCorrect = (q, index) => {
        let allCorrect = true;
        if ((parseInt(q.correctAnswer1) !== 0) !== this.state.checkedAnswers[index].answer1) {
            allCorrect = false
        }
        if ((parseInt(q.correctAnswer2) !== 0) !== this.state.checkedAnswers[index].answer2) {
            allCorrect = false
        }
        if ((parseInt(q.correctAnswer3) !== 0) !== this.state.checkedAnswers[index].answer3) {
            allCorrect = false
        }
        if ((parseInt(q.correctAnswer4) !== 0) !== this.state.checkedAnswers[index].answer4) {
            allCorrect = false
        }

        return allCorrect;
    }

    calculateGrade = () => {
        const ratio = 10 / this.state.questions.length;
        let grade = 0;
        this.state.questions.map((q, index) => {
            if (this.checkIfCorrect(q, index)) {
                grade += ratio;
            }
        })

        this.setState({grade: grade});
        this.updateQuizDb(grade);
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        fetch(`https://api.amosed.ro/edu/radical/quiz.php?quiz_id=${this.quizId}`, {
            method: "GET",
            headers: {
                "Content-Type": "applicatoin/json",
            },
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.prepCheckedAnswers(json);
                // setQuestions(json);
                this.setState({questions: json});
            })
            .catch(error => {
                console.error(error);
            })
    }

    checkIfComplete = () => {
        let complete = true;
        this.state.checkedAnswers.map(ans => {
            if (!(ans.answer1 || ans.answer2 || ans.answer3 || ans.answer4)) {
                complete = false;
            }
        })
        return complete;
    }

    submit = () => {
        if (this.checkIfComplete()) {
            this.calculateGrade();
            this.setState({submitted: true});
        }
        else {
            this.setState({message: "Te rog completează toate câmpurile din quiz"});
            setTimeout(() => {
                this.setState({message: ''});
            }, 7500);
        }
    }

    render() {
        return (
            <div style={{margin: '3%'}}>
                <div style={{paddingLeft: '2%'}}>
                    <div style={{display: this.state.submitted ? 'block' : 'none', backgroundColor: this.state.grade >= 8 ? '#adffc7' : '#ff7d7d', padding: '1%',
                        textAlign: 'center', margin: '1% 0%'}}>
                        {this.state.grade >= 8 ? (
                            <div>
                                <h2>Felicitari! Ai trecut testul!</h2>
                                <p>Punctajul tău: {this.state.grade}/10</p>
                            </div>
                        ) : (
                            <div>
                                <h2>Îmi pare rău, ai picat.</h2>
                                <p>Punctajul tău: {this.state.grade}/10</p>
                            </div>
                        )}
                    </div>
                    <h1>{this.quizName}</h1>
                    <p>Total: 10 puncte</p>
                    <p>Minim: 8 puncte</p>
                    <Divider />
                </div>

                {this.state.questions.length > 0 ? (
                    <div>
                        <ol>
                            {this.state.questions.map((q, i) => {
                                return this.QuestionComponent(q, i);
                            })}
                        </ol>
                        <SubmitButton submit={this.submit} />
                        <p>{this.state.message}</p>
                    </div>
                ) : (<div></div>)}
            </div>
        )
    }

}