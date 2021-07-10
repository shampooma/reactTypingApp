import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ArrowReturnLeft } from 'react-bootstrap-icons';
import { useEffect } from 'react';

let historyValue;
let sampleText;
let wrongNumber
let correctNumber

function Body(props) {
    const { text, setText } = props

    useEffect(() => {
        historyValue = ""
        wrongNumber = 0
        correctNumber = 0
    }, [])


    function makeTextElement(textArray) {
        let newLine = "newLine"
        let output = []


        for (let i = 0; i < textArray.length; i++) {
            let paragraph = []

            for (let j = 0; j < textArray[i].innerText.length; j++) {
                let character = textArray[i].innerText[j]
                paragraph.push(<span v={character}>{character}</span>)
            }

            paragraph.push(<span v='\n'>⮐</span>)

            output.push(<div className="webScrapeBodyParagraph">{paragraph}</div>)

            if (i != textArray.length - 1) {
                output.push(<div className="webScrapeBodyParagraph"><span v="\n">⮐</span></div>)
            }
        }


        return output
    }

    function textAreaOnInput(e) {
        let currentValue = e.target.value
        let differentPosition = null

        for (let i = 0; i < currentValue.length; i++) {
            if (i == historyValue.length) {
                differentPosition = i
                break
            }

            if (currentValue[i] != historyValue[i]) {
                differentPosition = i
                break
            }
        }

        if (differentPosition === null && historyValue.length > currentValue.length) {
            differentPosition = currentValue.length;
        }

        if (differentPosition !== null) {
            // Delete

            // Find the position for start counting delete
            let startDeletePosition
            for (let i = differentPosition - 1; i >= 0; i--) {
                if (historyValue[i].match(/[^\w]/)) {
                    startDeletePosition = i + 1;
                    break;
                }
            }

            let currentDeleteWordCorrect = true
            let deletingWord = false
            for (let i = startDeletePosition; i < historyValue.length; i++) {
                if (i < sampleText.length) {
                    if (sampleText[i].match(/[\w]/)) {
                        // If sampleText index i is a word, check is it correct or not
                        deletingWord = true
    
                        if (historyValue[i] != sampleText[i]) {
                            currentDeleteWordCorrect = false;
                        }
                    } else {
                        if (deletingWord) {
                            if (currentDeleteWordCorrect) {
                                correctNumber--;
                            } else {
                                wrongNumber--;
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

        }
    }

    return (<div
        style={{
            whiteSpace: "pre-wrap"
        }}
    >
        <textarea
            id="webScrapeTextArea"
            style={{
                zIndex: "1",
                position: "fixed",
                top: "0",
                left: "0"
            }}></textarea>
        {makeTextElement(text)}
    </div>)
}

export default Body