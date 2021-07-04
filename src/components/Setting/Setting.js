import { useEffect, useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Setting.css';

let originSetting = {}

function Setting(props) {
    console.log('rendered setting')
    const { showSetting, setShowSetting, setting, setSetting } = props
    const [currentSettingTab, setCurrentSettingTab] = useState(0)

    let settingNames = [
        'aboutSetting', 
        'quoteSetting',
        'numberTypingSetting',
        'codeSetting',
        'webScrapSetting',
        'noQuoteSetting', 
    ]

    useEffect(async () => {
        console.log('setting used effect')
        let currentSetting = {}
        await Promise.all([
            import('../Ａｂｏｕｔ/About'),
            import('../Ｑｕｏｔｅ/Quote'),
            import('../Ｎｕｍｂｅｒ/Number typing'),
            import('../Ｃｏｄｅ/Code'),
            import('../Ｗｅｂ Ｓｃｒａｐｅ/WebScrape'),
            import('../Ｎｏ　Ｑｕｏｔｅ/NoQuote'),
        ])
            .then(array => {
                array.forEach((obj, i) => {
                    let settingName = settingNames[i]

                    // Set current setting to be initial setting
                    if (typeof obj['setting'] === 'object') {
                        currentSetting[settingName] = obj['setting']
                        originSetting[settingName] = obj['setting']
                    } else {
                        currentSetting[settingName] = {}
                        originSetting[settingName] = {}
                    }

                    // Get stored setting in browser
                    let storedSetting = window.localStorage.getItem(settingName) ?? "{}"
                    storedSetting = JSON.parse(storedSetting)
                    let newStoredSetting = {}

                    // Check if type of stored setting valid
                    if (typeof storedSetting === 'object') {
                        for (const property in storedSetting) {
                            if (Object.keys(currentSetting[settingName]).includes(property)) {
                                currentSetting[settingName][property] = storedSetting[property]
                                newStoredSetting[property] = storedSetting[property]
                            }
                        }
                    }

                    // Store new setting
                    if (newStoredSetting.keys !== undefined) {
                        window.localStorage.setItem(settingName, JSON.stringify(newStoredSetting))
                    }
                })
            });

        setSetting(currentSetting)
    }, [])

    function settingBackgroundOnClick(e) {
        if (e.target.id == "settingBackground") {
            setShowSetting(false)
        }
    }

    function closeButtonOnClick() {
        setShowSetting(false)
    }

    function changeTab(e, n) {
        setCurrentSettingTab(n)
    }

    function setSettingOnClick(e) {
        let parent = e.target.parentElement.parentElement;
        let settingName = parent.parentElement.getAttribute('settingname')
        let propertyName = parent.getAttribute('propertyname')
        let newSetting = JSON.parse(JSON.stringify(setting))

        let newValue = parent.childNodes[2].childNodes[0].value
        newSetting[settingName][propertyName] = newValue
        setSetting(newSetting)

        // Store setting
        let storedSetting = window.localStorage.getItem(settingName) ?? "{}"
        storedSetting = JSON.parse(storedSetting)
        storedSetting[propertyName] = newValue
        window.localStorage.setItem(settingName, JSON.stringify(storedSetting))
    }

    function tableRow(propertyName, currentValue, key) {
        return (<Row key={key} propertyname={propertyName}>
            <Col>{propertyName}</Col>
            <Col>{currentValue}</Col>
            <Col><input /></Col>
            <Col><button onClick={setSettingOnClick}>Set</button></Col>
        </Row>)
    }

    return (<div
        id="settingBackground"
        className={showSetting ? "settingBackgroundShow" : "settingBackgroundNonShow"}
        onClick={settingBackgroundOnClick}>

        <button style={{ ...(!showSetting && { display: "none" }) }} id="closeButton" onClick={closeButtonOnClick}>Close</button>
        <div id="setting" className={showSetting ? "settingShow" : "settingNonShow"}>


            <div className="d-flex justify-content-center">
                <Tabs
                    value={currentSettingTab}
                    onChange={changeTab}>
                    {Object.keys(setting).map((e, i) => {
                        return (<Tab
                            key={i}
                            label={e}>
                        </Tab>)
                    })}
                </Tabs>
            </div>
            {Object.entries(setting).map((settingEntry, i) => {
                let settingName = settingEntry[0]
                let settingObj = settingEntry[1]

                let tableBody = Object.entries(settingObj).map((propertyEntry, i) => {
                    let propertyName = propertyEntry[0]
                    let propertyValue = propertyEntry[1]

                    return (tableRow(propertyName, propertyValue, i))
                })

                if (tableBody.length === 0) {
                    tableBody = <h1>No Setting</h1>
                }

                return (<div
                    className="d-flex justify-content-center"
                    key={i}
                >
                    {currentSettingTab === i &&
                        <div settingname={settingName} style={{ width: "100%" }}>
                            <Row>
                                <Col>Value</Col>
                                <Col>Current value</Col>
                                <Col>New value</Col>
                                <Col></Col>
                            </Row>
                            {tableBody}
                        </div>}
                </div>)

            })}
        </div>
    </div >)
}

export default Setting