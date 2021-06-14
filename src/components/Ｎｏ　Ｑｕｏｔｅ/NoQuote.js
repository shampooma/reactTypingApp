import React, { useState, useEffect } from 'react';
import './NoQuote.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// params
const timingInterval = 500;
const autoPauseTime = 15000;

// variables
let paused;
let previousTimeUsed;
let totalWords;
let currentWords;
let restartTime;
let lastInputTime;
let timerTimeout;

// test
let longestTimeForInput = 0



function NoQuote() {
    const [displayWPM, setDisplayWPM] = useState('- -');
    const [displayWords, setDisplayWords] = useState('- -');

    useEffect(() => {
        paused = true;
        previousTimeUsed = 0;
        totalWords = 0;
        currentWords = 0;
        restartTime = 0;
        lastInputTime = 0;
        timerTimeout = null;

        document.querySelector('#testing').focus()
    }, [])

    function onInput(e) {
        e.preventDefault();
        lastInputTime = Date.now();
        let newText = e.target.value ? e.target.value : "";

        if (newText.length === 0) {
            totalWords += currentWords;
            currentWords = 0;
        } else {
            let matchArray = newText.match(/[\w'][^\w']/g)
            let newTotalWords = matchArray ? matchArray.length : 0;
    
            currentWords = newTotalWords;
        }
        setDisplayWords(totalWords + currentWords)

        if (paused) {
            paused = false;
            restartTime = lastInputTime;
            timer();
        }

        let timeUsedForInput = Date.now() - lastInputTime;
        if (timeUsedForInput > longestTimeForInput) {
            longestTimeForInput = timeUsedForInput
            console.log('time used for on input in no quote: ', timeUsedForInput)
        }
    }

    function timer() {
        if (Date.now() - lastInputTime >= autoPauseTime) {
            pauseFunction()
        } else {
            timerTimeout = setTimeout(timer, timingInterval);
            let totalTimeUsed = previousTimeUsed + Date.now() - restartTime;
            if (totalTimeUsed > 0) {
                setDisplayWPM(Math.round((totalWords + currentWords) / totalTimeUsed * 600000) / 10)
            }
        }
    }

    function pauseFunction() {
        previousTimeUsed += lastInputTime - restartTime;
        paused = true;
        clearTimeout(timerTimeout);
        let wpm = previousTimeUsed > 0 ? Math.round((totalWords + currentWords) / previousTimeUsed * 600000) / 10 : ' - -';
        setDisplayWPM(wpm);
        lastInputTime = 0;
        restartTime = 0;
        timerTimeout = null;
    }
    console.log('initializing no quote')
    return (
        <div id="noQuote">
            <Row className="justify-content-center text-center">
                <Col></Col>
                <Col lg={6}>
                    <Row>
                        <Col xs={6}>
                            <h6 className="th">WPM</h6>
                            <h5>{displayWPM}</h5>
                        </Col>
                        <Col xs={6}>
                            <h6  className="th">Words</h6>
                            <h5>{displayWords}</h5>
                        </Col>
                    </Row>
                </Col>
                <Col></Col>

            </Row>
            <textarea onInput={onInput} onBlur={pauseFunction}></textarea>
            <textarea id="testing" onInput={() => {
                console.log('inputing')
            }} style={{height: "0", width: "0", padding: "0", margin: "0"}}></textarea>
        </div>
    )
}

export default NoQuote;