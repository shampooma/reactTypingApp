import React, { useState } from 'react';
import './NoQuote.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// params
const timingInterval = 1000;
const autoPauseTime = 2000;

// variables
let paused = true;
let previousTimeUsed = 0;
let totalWords = 0;
let restartTime = 0;
let lastInputTime = 0;
let timerTimeout = null;

// test
let longestTimeForInput = 0



function NoQuote() {
    const [displayWPM, setDisplayWPM] = useState('- -');
    const [displayWords, setDisplayWords] = useState('- -');

    function onInput(e) {
        lastInputTime = Date.now();
        let newText = e.target.value ? e.target.value : "";
        let matchArray = newText.match(/[\w'][^\w']/g)
        let newTotalWords = matchArray ? matchArray.length : 0;

        totalWords = newTotalWords;
        setDisplayWords(totalWords)
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
                setDisplayWPM(Math.round(totalWords / totalTimeUsed * 600000) / 10)
            }
        }
    }

    function pauseFunction() {
        previousTimeUsed += lastInputTime - restartTime;
        paused = true;
        clearTimeout(timerTimeout);
        let wpm = previousTimeUsed > 0 ? Math.round(totalWords / previousTimeUsed * 600000) / 10 : ' - -';
        setDisplayWPM(wpm);
        lastInputTime = 0;
        restartTime = 0;
        timerTimeout = null;
    }

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
        </div>
    )
}

export default NoQuote;