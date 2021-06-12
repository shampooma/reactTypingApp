
import React, { useEffect } from 'react';

function NumberTyping_displaySampleText(){


	//function 1
	



	//functions after return 
	useEffect(() => {	
	var generatedNumber
	var decidedDigits;
	//clean up the div_displayGeneratedNumber
	document.getElementById("div_displayGeneratedNumber").innerHTML = "";
	
	function genAndDisplayNumWhenInitialize (){		

		
		//gen 11 numbers
		for (var i = 0; i < 10; i++) {
		var randomDicimalToDecideDigits = Math.random();
		if (randomDicimalToDecideDigits < 0.1){decidedDigits = 100}
		else if (randomDicimalToDecideDigits >= 0.1 && randomDicimalToDecideDigits < 0.2) {decidedDigits = 1000}
		else if (randomDicimalToDecideDigits >= 0.2 && randomDicimalToDecideDigits < 0.5) {decidedDigits = 10000}
		else if (randomDicimalToDecideDigits >= 0.5 && randomDicimalToDecideDigits < 0.8) {decidedDigits = 100000}
		else {decidedDigits = 1000000}
		
		//gen 11 numbers: the gened number
		generatedNumber = Math.floor(Math.random() * decidedDigits);
		//gen 11 numbers: print the number (each number add new number & linebreak)
		document.getElementById("div_displayGeneratedNumber").innerHTML += generatedNumber + "<br>";
		}
		
	

		function pressEnterGenAndAddOneNumber() {
			document.body.addEventListener("keydown", function(pressedKey){if(pressedKey.keyCode === 13){ 
			var randomDicimalToDecideDigits2 = Math.random();
			
			//gen a single number
			if (randomDicimalToDecideDigits2 < 0.1){decidedDigits = 100}
			else if (randomDicimalToDecideDigits2 >= 0.1 && randomDicimalToDecideDigits2 < 0.2) {decidedDigits = 1000}
			else if (randomDicimalToDecideDigits2 >= 0.2 && randomDicimalToDecideDigits2 < 0.5) {decidedDigits = 10000}
			else if (randomDicimalToDecideDigits2 >= 0.5 && randomDicimalToDecideDigits2 < 0.8) {decidedDigits = 100000}
			else {decidedDigits = 1000000};
			generatedNumber = Math.floor(Math.random() * decidedDigits);

			//gen a single number: print & add the new gened number
			document.getElementById("div_displayGeneratedNumber").innerHTML += generatedNumber + "<br>";}})
			}
		pressEnterGenAndAddOneNumber();
	}
	genAndDisplayNumWhenInitialize();
})//useEffect end.	

	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////


	//html (i.e. print on the Numer-typing page)
	return (
		<div>
			<div id="div_displayGeneratedNumber"></div>


		
		
		
		
		</div>
		) 

	
}



export default NumberTyping_displaySampleText