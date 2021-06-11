
import React, { useEffect } from 'react';

function NumberTyping_displaySampleText(){


	//function 1
	// function genNumbers() {		
		
	// console.log(generatedNumber);
		
	// }
	// genNumbers();



	////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	//html (i.e. print on the Numer-typing page)




	useEffect(() => {	
		//clean up the div_displayGeneratedNumber
		document.getElementById("div_displayGeneratedNumber").innerHTML = "";
		
		//gen 11 numbers
		for (var i = 0; i <= 10; i++) {
		var randomDicimalToDecideDigits = Math.random();
		var decidedDigits;

		if (randomDicimalToDecideDigits < 0.1){decidedDigits = 100}
		else if (randomDicimalToDecideDigits >= 0.1 && randomDicimalToDecideDigits < 0.2) {decidedDigits = 1000}
		else if (randomDicimalToDecideDigits >= 0.2 && randomDicimalToDecideDigits < 0.5) {decidedDigits = 10000}
		else if (randomDicimalToDecideDigits >= 0.5 && randomDicimalToDecideDigits < 0.8) {decidedDigits = 100000}
		else {decidedDigits = 1000000}	
		//gen 11 numbers: the gened number
		var generatedNumber = Math.floor(Math.random() * decidedDigits);
		////gen 11 numbers: print the number
		document.getElementById("div_displayGeneratedNumber").innerHTML += generatedNumber + "<br>";

	}
	})

	return (
		<div>
			<div id="div_displayGeneratedNumber"></div>


		
		
		
		
		</div>
		) 


}
export default NumberTyping_displaySampleText

