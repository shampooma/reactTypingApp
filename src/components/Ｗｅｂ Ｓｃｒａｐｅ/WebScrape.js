import { useState } from 'react';
import Head from './Head';
import Body from './Body';

function WebScrape() {
    const [textArray, setTextArray] = useState('Please enter the URL');

    return (<div id="webScrape">
        <Head
            textArray={textArray}
            setTextArray={setTextArray}
        />
        <Body
            textArray={textArray}
            setTextArray={setTextArray}
        />
    </div>)
}



export default WebScrape