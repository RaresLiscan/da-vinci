import React, { useState, useEffect } from 'react';

const API_URL =
    'https://opentdb.com/api.php?amount=10&category=14&difficulty=easy';

function Quizz() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setQuestions(data.results);
            });
    }, []);

    return (
        questions.length > 0 ? (
            <div className="container" style={{padding: '2%'}}>
                <h1 style={{textAlign: 'center', fontSize: 28, fontWeight: 'bold', }}>Intrebarea #1</h1>
                <div className="bg-white text-black p-10 rounded-lg shadow-md w-full" style={{backgroundColor: '#001c2f'}}>
                    <h2 className="text-2xl" style={{color: 'white'}}>
                        {questions[0].question}
                    </h2>
                </div>
                <div className=" grid grid-cols-2 gap-6 mt-6">
                    <button className="bg-white  p-4 font-semibold rounded shadow" style={{backgroundColor: '#3b6978', color: 'white'}}>{questions[0].correct_answer}</button>
                    <button className="bg-white p-4 font-semibold rounded shadow"  style={{backgroundColor: '#3b6978', color: 'white'}}>{questions[0].incorrect_answers [0]}</button>
                    <button className="bg-white  p-4 font-semibold rounded shadow" style={{backgroundColor: '#3b6978', color: 'white'}}>{questions[0].incorrect_answers [1]}</button>
                    <button className="bg-white  p-4 font-semibold rounded shadow" style={{backgroundColor: '#3b6978', color: 'white'}}>{questions[0].incorrect_answers [2]}</button>
                </div>
            </div>
        ) : (
            <h1>we are loading</h1>
        )
    );

}

export default Quizz;
