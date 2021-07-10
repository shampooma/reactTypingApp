import { useEffect, useState } from 'react';
import Head from './Head';
import Body from './Body';

function WebScrape() {
    const [text, setText] = useState([]);

    return (<div id="webScrape">
        <Head
            text={text}
            setText={setText}
        />
        <Body
            text={text}
            setText={setText}
        />
    </div>)
}



export default WebScrape