import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ArrowReturnLeft } from 'react-bootstrap-icons';

function Head(props) {
    const { textArray, setTextArray } = props
    const urlInputId = "webScrapeURLInput"
    const domainNameSelectOptions = [
        'edition.cnn.com'
    ]

    const paragraphArrayQuerySelectors = {
        'edition.cnn.com': '.zn-body__paragraph'
    }

    function inputOnKeyDown(e) {
        if (e.key === 'Enter') {
            enterButtonOnclick()
        }
    }

    function enterButtonOnclick() {
        let input = document.querySelector(`#webScrape #${urlInputId}`)
        fetch(input.value)
            .then(res => res.text())
            .then(responseText => {
                let domainNameSelect = document.querySelector('#webScrapeDomainNameSelect')

                // Select the body as string
                let bodyText = responseText.match(/<body[\s\S]*<\/body>/)[0]

                // Make an element using the body Text as innerHTML
                let bodyElement = document.createElement('div')
                bodyElement.innerHTML = bodyText

                // Find the array of target paragraphs
                let paragraphArray = bodyElement.querySelectorAll(paragraphArrayQuerySelectors[domainNameSelect.value])

                if (paragraphArray.length > 0) {
                    // Able to find target paragraphs
                    let newTextArray = new Array(paragraphArray.length)

                    for (let i = 0; i < paragraphArray.length; i++) {
                        newTextArray[i] = paragraphArray[i].innerText.replace(/^\s*|\s*$/g, "")
                    }

                    setTextArray(newTextArray)
                } else {
                    // Not able to find target paragraphs
                    throw(new Error())
                }
            })
            .catch((e) => {
                setTextArray('Failed to scrape web')
            })
    }

    function makeDomainNameSelectOptionElements() {
        return domainNameSelectOptions.map((domainName) => {
            return <option>{domainName}</option>
        })
    }

    return (<div>
        <Row>
            <Col xs={2}>
                <select
                    id="webScrapeDomainNameSelect"
                    style={{
                        width: "100%"
                    }}
                >{makeDomainNameSelectOptionElements()}</select>
            </Col>
            <Col xs={9}>
                <input
                    id={urlInputId}
                    placeholder="URL"
                    style={{
                        width: "100%"
                    }}
                    onKeyDown={inputOnKeyDown}
                ></input>
            </Col>
            <Col xs={1}>
                <ArrowReturnLeft
                    style={{
                        cursor: "pointer"
                    }}
                    onClick={enterButtonOnclick}
                ></ArrowReturnLeft>
            </Col>
        </Row>
    </div>)
}

export default Head