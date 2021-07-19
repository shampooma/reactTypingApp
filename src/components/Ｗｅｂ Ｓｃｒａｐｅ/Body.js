import { useEffect, useState } from 'react';
import './WebScrape.css'
import ReactDOM from 'react-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Dates
let historyValue = "";
let sampleText = "";
let wrongWordAmount = 0
let correctWordAmount = 0
let previousTimeUsed = 0
let currentIntervalStartTime = 0;
let lastInputTime = null;

// States
let initialized = false;
let readied = false;
let started = false;
let paused = true;

// Equipments
let currentTimeOut = null;

// Parameters
let wpmTimeOutStopMilliseconds = 1500 // How long does it takes for the time interval to stop automatically after no new input
let wpmTimeOutMilliseconds = 500 // How long does it takes for recalculate wpm by time interval

// Colors for the sample text
let colors = {
    origin: "#000000",
    correct: "#1fde5d",
    wrong: "#ff0000",
}


function Body(props) {
    const { textArray, setTextArray } = props
    const [textColor, setTextColor] = useState([]);
    const [displayWPM, setDisplayWPM] = useState('- -');
    const [displayWords, setDisplayWords] = useState('- -');

    // Array of elements that originally contains in sample text container
    const sampleTextContainerInitialElements = [
        <div
            id="webScrapTextCover"
            onClick={textContainerOnClick}
        ></div>,
        <div id="webScrapeSampleTextIndicator"></div>
    ]

    // Initialize
    useEffect(initialize, [textArray])

    window.addEventListener('resize', () => {
        moveWebScrapeSampleTextIndicator();
    })

    function initialize() {
        historyValue = ""
        sampleText = ""
        wrongWordAmount = 0
        correctWordAmount = 0

        if (Array.isArray(textArray) && textArray.length > 0) {
            // Initialize sample text
            let textSpanElements = []

            for (let i = 0; i < textArray.length; i++) {
                sampleText += textArray[i]
                if (i !== textArray.length - 1) {
                    sampleText += '\n\n'
                }
            }


            for (let i = 0; i < sampleText.length; i++) {
                if (sampleText[i] === '\n') {
                    textSpanElements.push(<span
                        key={i}
                    >
                        ⮐
                    </span>)

                    textSpanElements.push(<br key={"br" + i} />)
                } else {
                    textSpanElements.push(<span
                        key={i}
                    >
                        {sampleText[i]}
                    </span>)
                }
            }



            // Initialize text color
            let newTextColor = new Array(textArray.length).fill(0)
            setTextColor(newTextColor)

            ReactDOM.render([...sampleTextContainerInitialElements, ...textSpanElements], document.querySelector('#webScrapeSampleTextContainer'))
            moveWebScrapeSampleTextIndicator()
            initialized = true;
            ready();
        } else {
            let warningText = <div
                style={{
                    width: "100%",
                    textAlign: "center"
                }}

            >{textArray}</div>

            ReactDOM.render(warningText, document.querySelector('#webScrapeSampleTextContainer'))
            initialized = false;
            unready();
        }
    }

    function ready() {
        if (initialized) {
            let webScrapeTextArea = document.querySelector('#webScrapeTextArea');

            // Focus to textarea
            webScrapeTextArea.focus();
            readied = true;
        }
    }

    function unready() {
        stop();
        readied = false;
    }

    function start(newCurrentIntervalStartTime) {
        if (readied && !started) {
            currentIntervalStartTime = newCurrentIntervalStartTime;
            loop(newCurrentIntervalStartTime);

            paused = false;
            started = true;
        }
    }

    function stop() {
        pause();
        started = false;
    }

    function loop(currentTime) {
        let currentIntervalTimeUsed = 0

        if (currentTime - lastInputTime >= wpmTimeOutStopMilliseconds) {
            // If have to pause timeout
            pause()
        } else {
            // If not yet pause timeout
            // Calculate the milliseconds for next timeout
            let newWPMTimeOutMilliseconds;
            let remainder = (currentTime - currentIntervalStartTime) % wpmTimeOutMilliseconds

            if (remainder < wpmTimeOutMilliseconds / 2) {
                newWPMTimeOutMilliseconds = wpmTimeOutMilliseconds - remainder
            } else {
                newWPMTimeOutMilliseconds = wpmTimeOutMilliseconds + wpmTimeOutMilliseconds - remainder
            }

            // Set timeout for next loop
            setTimeout(() => {
                loop(Date.now())
            }, newWPMTimeOutMilliseconds);

            // Calculate currentIntervalTimeUsed
            currentIntervalTimeUsed = currentTime - currentIntervalStartTime;
        }

        // Calculate total time used
        let totalTimeUsed = previousTimeUsed + currentIntervalTimeUsed;
        if (totalTimeUsed === 0) {
            setDisplayWPM('- -')
        } else {
            // Calculate wpm
            let wpm = Math.round(((correctWordAmount + wrongWordAmount) / totalTimeUsed) * 10 * 60000) / 10
            setDisplayWPM(wpm)
        }
    }

    function pause() {
        if (currentTimeOut !== null) {
            clearTimeout(currentTimeOut)
            currentTimeOut = null;
        }

        if (!paused) {
            previousTimeUsed += lastInputTime - currentIntervalStartTime;
        }
        paused = true;
    }

    function textAreaOnInput(e) {
        lastInputTime = Date.now()

        // Start if not yet started
        if (!started) {
            start(lastInputTime)
        }

        // Calculate amount of correct and wrong word
        let firstDifferentPosition = null;
        let currentValue = e.target.value
        let changeColor = [];

        // Find the position where the first different occur between history value and current value
        // Check based on current value and look for history value
        for (let i = 0; i < currentValue.length; i++) {
            // If i position is the length of history value, set firstDifferentPosition to be i
            if (i === historyValue.length) {
                firstDifferentPosition = i
                break
            }

            // If i position of current value is not equal to history value, set firstDifferentPosition to be i
            if (currentValue[i] !== historyValue[i]) {
                firstDifferentPosition = i
                break
            }
        }

        // If all current value is same as history value, and length of history value is longer than current value, set firstDifferentPosition to be length of current value
        if (firstDifferentPosition === null && historyValue.length > currentValue.length) {
            firstDifferentPosition = currentValue.length;
        }

        // For all position that history value have but current value don't have, set the color to be origin
        for (let i = currentValue.length; i < historyValue.length; i++) {
            changeColor.push({
                position: i,
                color: 'origin'
            })
        }

        if (firstDifferentPosition !== null) {
            // Delete
            // Find the position for start counting amount of words to be deleted
            let startDeletePosition = 0
            for (let i = firstDifferentPosition - 1; i >= 0; i--) {
                if (historyValue[i].match(/[^\w]/)) {
                    startDeletePosition = i + 1;
                    break;
                }
            }

            // Start counting amount of correct and wrong words to be deleted
            let currentDeleteWordCorrect = true
            let deletingWord = false

            for (let i = startDeletePosition; i < historyValue.length; i++) {
                if (i < sampleText.length) {
                    // If the counting is still in the range of sample text
                    if (sampleText[i].match(/[\w]/)) {
                        // If sampleText index i is a word

                        deletingWord = true

                        if (historyValue[i] !== sampleText[i]) {
                            currentDeleteWordCorrect = false;
                        }
                    } else {
                        // If sampleText index i is not a word
                        if (deletingWord) {
                            if (currentDeleteWordCorrect) {
                                correctWordAmount--;
                            } else {
                                wrongWordAmount--;
                            }
                        }

                        deletingWord = false;
                        currentDeleteWordCorrect = true;
                    }
                } else {
                    break;
                }
            }

            // Add
            // Find the position for start counting amount of words to be added
            let startAddPosition = 0
            for (let i = firstDifferentPosition - 1; i >= 0; i--) {
                if (currentValue[i].match(/[^\w]/)) {
                    startAddPosition = i
                    break;
                }
            }

            // Start counting amount of correct and wrong words to be added
            let currentAddWordCorrect = true
            let addingWord = false
            for (let i = startAddPosition; i < currentValue.length; i++) {
                if (i < sampleText.length) {
                    // If the counting is still in the range of sample text
                    // Change the color of sample text depends on whether it is correct or not
                    changeColor.push({
                        position: i,
                        color: currentValue[i] === sampleText[i] ? 'correct' : 'wrong'
                    })

                    if (sampleText[i].match(/[\w]/)) {
                        // If sampleText index i is a word
                        addingWord = true

                        if (currentValue[i] !== sampleText[i]) {
                            currentAddWordCorrect = false;
                        }
                    } else {
                        // If sampleText index i is not a word
                        if (addingWord) {
                            if (currentAddWordCorrect) {
                                correctWordAmount++;
                            } else {
                                wrongWordAmount++;
                            }
                        }

                        deletingWord = false;
                        currentAddWordCorrect = true;
                    }
                } else {
                    break;
                }
            }
        }

        // Change sample text color
        for (let i = 0; i < changeColor.length; i++) {
            let spans = document.querySelector('#webScrapeSampleTextContainer').querySelectorAll('span');

            spans[changeColor[i]['position']].style.color = colors[changeColor[i]['color']];
        }


        // Change history value to current value
        historyValue = currentValue;

        // Change statistics
        setDisplayWords(correctWordAmount + wrongWordAmount);

        // Move sample text indicator
        moveWebScrapeSampleTextIndicator()
    }

    function textAreaOnBlur() {
        pause();
    }

    function textContainerOnClick() {
        ready()
    }

    function moveWebScrapeSampleTextIndicator() {
        if (initialized) {
            let webScrapeTextIndicator = document.querySelector('#webScrapeSampleTextIndicator');
            let webScrapeTextArea = document.querySelector('#webScrapeTextArea');

            let spanElements = document.querySelector('#webScrapeSampleTextContainer').querySelectorAll('span')

            if (spanElements.length >= webScrapeTextArea.value.length) {
                let nextInputTextElement = spanElements[webScrapeTextArea.value.length]

                webScrapeTextIndicator.style.height = `${nextInputTextElement.offsetHeight}px`
                webScrapeTextIndicator.style.width = `${nextInputTextElement.offsetWidth}px`
                webScrapeTextIndicator.style.top = `${nextInputTextElement.offsetTop}px`
                webScrapeTextIndicator.style.left = `${nextInputTextElement.offsetLeft}px`

                webScrapeTextIndicator.classList.add('showTextIndicator')
                webScrapeTextIndicator.classList.remove('hideTextIndicator')
            } else {
                webScrapeTextIndicator.classList.remove('showTextIndicator')
                webScrapeTextIndicator.classList.add('hideTextIndicator')
            }
        }
    }

    return (<div
        style={{
            whiteSpace: "pre-wrap"
        }}
    >
        <Row className="justify-content-center text-center">
            <Col></Col>
            <Col lg={6}>
                <Row>
                    <Col xs={6}>
                        <h6 className="th">WPM</h6>
                        <h5>{displayWPM}</h5>
                    </Col>
                    <Col xs={6}>
                        <h6 className="th">Words</h6>
                        <h5>{displayWords}</h5>
                    </Col>
                </Row>
            </Col>
            <Col></Col>
        </Row>
        <textarea
            id="webScrapeTextArea"
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                zIndex: "-1",
            }}
            onInput={textAreaOnInput}
            onBlur={textAreaOnBlur}
        ></textarea>
        <div
            id="webScrapeSampleTextContainer"
            style={{
                position: "relative",
                borderRadius: "3px"
            }}
        >
        </div>
    </div>)
}

export default Body