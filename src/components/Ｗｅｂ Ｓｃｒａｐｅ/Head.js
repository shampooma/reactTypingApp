import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ArrowReturnLeft } from 'react-bootstrap-icons';

let a = 1

function Head(props) {
    const { text, setText } = props
    const urlInputId = "webScrapeURLInput"

    function enterButtonOnclick() {
        let input = document.querySelector(`#webScrape #${urlInputId}`)
        fetch(input.value)
            .then(res => res.text())
            .then(responseText => {
                let bodyElement = document.createElement('div')

                let bodyText = responseText.match(/<body[\s\S]*<\/body>/)[0]
                bodyElement.innerHTML = bodyText

                let paragraphArray = bodyElement.querySelectorAll('.zn-body__paragraph')

                setText(paragraphArray)
            })
    }

    return (<div>
        <Row>
            <Col xs={2}>
                <select
                    style={{
                        width: "100%"
                    }}
                ></select>
            </Col>
            <Col xs={9}>
                <input
                    id={urlInputId}
                    placeholder="URL"
                    style={{
                        width: "100%"
                    }}
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