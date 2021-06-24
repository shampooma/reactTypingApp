import React, { useEffect } from 'react';
import './Number typing.css'


function NumberTyping_displaySampleText() {
	var SampleTextArray = []

	//function 1

///jasddkfjfgaskfgfkuasgdfuyagsuydfgausdjgasdhjfguaysdgyaegrufyaudgaasfdsdg


	//functions after return 
	useEffect(() => {
		var generatedNumber
		var decidedDigits;
		//clean up the div_displayGeneratedNumber
		//document.getElementById("div_displayGeneratedNumber").innerText = "";


		//useEffect function 0: AutoFocus
		
			document.getElementById("numTextArea").focus();
		  

		//useEffect function 1: gen 15 num
		function genAndDisplayNumWhenInitialize() {
			//gen 10 numbers
			for (var i = 0; i < 6; i++) {
				var randomDicimalToDecideDigits = Math.random();
				if (randomDicimalToDecideDigits < 0.1) { decidedDigits = 100 }
				else if (randomDicimalToDecideDigits >= 0.1 && randomDicimalToDecideDigits < 0.2) { decidedDigits = 1000 }
				else if (randomDicimalToDecideDigits >= 0.2 && randomDicimalToDecideDigits < 0.5) { decidedDigits = 10000 }
				else if (randomDicimalToDecideDigits >= 0.5 && randomDicimalToDecideDigits < 0.8) { decidedDigits = 100000 }
				else { decidedDigits = 1000000 }

				//gen 10 numbers: the gened number
				generatedNumber = Math.floor(Math.random() * decidedDigits);
				//gen 10 numbers: print the number (each number add new number & linebreak)
				document.getElementById("div_displayGeneratedNumber").innerHTML += generatedNumber + "<br>";
			}
			//document.getElementById("div_displayGeneratedNumber").innerHTML += "ma zi yeung";
		}
		genAndDisplayNumWhenInitialize();

		//useEffect function 2: press enter
		function pressEnterGenAndAddOneNumber() {
			var from1toInfinity = 1;
			document.body.addEventListener("keydown", function (pressedKey) {
				
				if (pressedKey.keyCode === 13) {
					var randomDicimalToDecideDigits2 = Math.random();
					
					//document.getElementById("div_displayGeneratedNumber").innerHTML = "abc"
					//gen a single number
					if (randomDicimalToDecideDigits2 < 0.1) { decidedDigits = 100 }
					else if (randomDicimalToDecideDigits2 >= 0.1 && randomDicimalToDecideDigits2 < 0.2) { decidedDigits = 1000 }
					else if (randomDicimalToDecideDigits2 >= 0.2 && randomDicimalToDecideDigits2 < 0.5) { decidedDigits = 10000 }
					else if (randomDicimalToDecideDigits2 >= 0.5 && randomDicimalToDecideDigits2 < 0.8) { decidedDigits = 100000 }
					else { decidedDigits = 1000000 };
					generatedNumber = Math.floor(Math.random() * decidedDigits).toString();
					//gen a single number: print & add the new gened number
					SampleTextArray.push(generatedNumber)
					console.log(SampleTextArray)
					let temp = "";
					for (let i = 0; i < generatedNumber.length; i++) {
						temp += "<span>" + generatedNumber[i] + '</span>'
					}
					document.getElementById("div_displayGeneratedNumber").innerHTML += "<span>" + temp + "</span><br>";

					//press enter will scroll TO 70.5 * fromItoInfiinity
					function scroll (){
						from1toInfinity = from1toInfinity + 1;
						document.getElementById("div_displayGeneratedNumber").scroll(0, from1toInfinity * 70.5);
						console.log(from1toInfinity);
					}
					scroll();
				}

			})
		}
		pressEnterGenAndAddOneNumber();


		//useEffect function 3
		(() => {
			var putNumOnSampleText = document.getElementById("div_displayGeneratedNumber");
			SampleTextArray = putNumOnSampleText.innerHTML.split("<br>");
			SampleTextArray = SampleTextArray.slice(0, SampleTextArray.length - 1)
			var textArea = document.querySelector("#numTextArea");
			//var Wpm = document.querySelectorAll("#wpm")[1];
			//var Error = document.querySelectorAll("#errors")[1];
			var HighLightElementRow = 0;
			var HighLightElementColumn = 0;
			var CorrectNumber = 0;
			var WrongNumber = 0;
			var Started = false;
			var Ended = false;
			var StartTime;
			var TimeInterval;
			var HightLightColor = "#33333333";
			var red = "#ff0000";
			var green = "#00bf44";
			var black = "#000000";
			var missedGrey = "black";
			var historyValue;

			var insert = ""
			for (var i = 0; i < SampleTextArray.length; i++) {
				if (SampleTextArray[i].length > 0) {
						insert += "<span>";
						for (var j = 0; j < SampleTextArray[i].length; j++) {
							insert += "<span>" + SampleTextArray[i][j] + "</span>";
						}
						insert += "</span><br>";

				}
			}

			Error.textContent = "123";
			putNumOnSampleText.innerHTML = insert;
			putNumOnSampleText.style.whiteSpace = "pre-wrap";
			putNumOnSampleText.children[HighLightElementRow * 2].children[HighLightElementColumn].style.backgroundColor = HightLightColor;
			textArea.value = "";
			historyValue = "";
			//scroll(0);

			textArea.addEventListener("input", (e) => {
				if (!Ended) {
					if (!Started) {
						Started = true;
						StartTime = Date.now();

					}
					if (SampleTextArray[HighLightElementRow] && SampleTextArray[HighLightElementRow][HighLightElementColumn]) {
						putNumOnSampleText.children[HighLightElementRow * 2].children[HighLightElementColumn].style.backgroundColor = "";
					} else {
							putNumOnSampleText.children[HighLightElementRow * 2].removeChild(putNumOnSampleText.children[HighLightElementRow * 2].children[HighLightElementColumn]);
					}

					var currentValue = textArea.value;
					var startPosition = 0;
					for (i = 0; i < historyValue.length && currentValue.length; i++) {
						if (historyValue[i] != currentValue[i]) {
							break;
						} else {
							startPosition++;
						}
					}

					var historyValueArray = historyValue.split(/\r?\n|\r/g);
					var currentValueArray = currentValue.split(/\r?\n|\r/g);
					var nonChangeRowNumber = currentValue.slice(0, startPosition).split(/\r?\n|\r/g).length - 2;
					deleteHistoryValue(nonChangeRowNumber, historyValueArray);
					addCurrentValue(nonChangeRowNumber, currentValueArray);

					if (currentValueArray.length > SampleTextArray.length) {
						Ended = true;
					}
					Error.innerText = WrongNumber;
					if (Ended) {

					}
					else {
						HighLightElementRow = currentValueArray.length - 1;
						HighLightElementColumn = currentValueArray ? currentValueArray[currentValueArray.length - 1] ? currentValueArray[currentValueArray.length - 1].length : 0 : 0;
						if (putNumOnSampleText.children[HighLightElementRow * 2] && putNumOnSampleText.children[HighLightElementRow * 2].children[HighLightElementColumn]) {
							putNumOnSampleText.children[HighLightElementRow * 2].children[HighLightElementColumn].style.backgroundColor = HightLightColor;
							if (!SampleTextArray[HighLightElementRow] || !SampleTextArray[HighLightElementRow][HighLightElementColumn]) {
								putNumOnSampleText.children[HighLightElementRow * 2].children[HighLightElementColumn].innerText = " ";
							}
						} else {
							var newElement = document.createElement("span");
							newElement.style.backgroundColor = HightLightColor;
							newElement.innerText = " ";
							putNumOnSampleText.children[HighLightElementRow * 2].appendChild(newElement);
						}
						//scroll(HighLightElementRow);
					}
					historyValue = currentValue;
				}
			});

			function deleteHistoryValue(nonChangeRowNumber, historyValueArray) {
				for (i = historyValueArray.length - 1; i > nonChangeRowNumber; i--) {
					if (SampleTextArray[i]) {
						if (i < historyValueArray.length - 1) {
							for (j = SampleTextArray[i].length - 1; j >= historyValueArray.length; j--) {
								putNumOnSampleText.children[i * 2].children[j].style.color = black;
							}
						}


						for (j = historyValueArray[i].length - 1; j >= 0; j--) {
							if (SampleTextArray[i][j]) {
								if (historyValueArray[i][j] == SampleTextArray[i][j]) {
									CorrectNumber--;
								} else {
									WrongNumber--;
								}
								putNumOnSampleText.children[i * 2].children[j].style.color = black;
							} else {
								WrongNumber--;
								putNumOnSampleText.children[i * 2].removeChild(putNumOnSampleText.children[i * 2].children[j]);
							}
						}
					} else {
						WrongNumber -= historyValueArray[i].length;
						putNumOnSampleText.removeChild(putNumOnSampleText.children[i * 2]);
					}
				}
			}

			function addCurrentValue(nonChangeRowNumber, currentValueArray) {
				for (i = nonChangeRowNumber + 1; i < currentValueArray.length; i++) {
					if (SampleTextArray[i]) {
						for (j = 0; j < currentValueArray[i].length; j++) {
							if (SampleTextArray[i][j]) {
								if (currentValueArray[i][j] == SampleTextArray[i][j]) {
									CorrectNumber++;
									putNumOnSampleText.children[i * 2].children[j].style.color = green;
								} else {
									WrongNumber++;
									putNumOnSampleText.children[i * 2].children[j].style.color = red;
								}
							} else {
								WrongNumber++;
								var newChild = document.createElement("span");
								newChild.textContent = currentValueArray[i][j];
								newChild.style.color = red;
								putNumOnSampleText.children[i * 2].appendChild(newChild);
							}
						}

						if (i < currentValueArray.length - 1) {
							for (j = currentValueArray[i].length; j < SampleTextArray[i].length; j++) {
								putNumOnSampleText.children[i * 2].children[j].style.color = missedGrey;
							}
						}
					} else {
						WrongNumber += currentValueArray[i].length;
						putNumOnSampleText.appendChild(document.createElement("span"));
						putNumOnSampleText.appendChild(document.createElement("br"));
						for (j = 0; j < currentValueArray[i].length; j++) {
							var newChild = document.createElement("span");
							newChild.textContent = currentValueArray[i][j];
							newChild.style.color = red;
							putNumOnSampleText.children[i * 2].appendChild(newChild);
						}
					}
				}

			}


			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			// function scroll(elementRowNumber) {
			// 	var textheight = putNumOnSampleText.children[1].offsetHeight;

			// 	if (textheight*elementRowNumber < (putNumOnSampleText.offsetHeight - textheight) / 2) {
			// 		putNumOnSampleText.scroll(0,0);
			// 	} else {
			// 		putNumOnSampleText.scroll(0,elementRowNumber*textheight - (putNumOnSampleText.offsetHeight - textheight) / 2);
			// 	}
			// }
			// function scroll(elementRowNumber) {
			// 	var textheight = putNumOnSampleText.children[0].offsetHeight;
			// 	console.log('test height', textheight)
			// 	console.log(elementRowNumber)
				
			// 	if(textheight)

			// }
		})();
				// if (textheight * elementRowNumber < (putNumOnSampleText.offsetHeight - textheight) / 2) {
				// 	putNumOnSampleText.scroll(0, 0);
				// } else {
				// 	putNumOnSampleText.scroll(0, 100);
				// }
//elementRowNumber * textheight - (putNumOnSampleText.offsetHeight - textheight) / 2


	})//useEffect end.	

	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////


	//html (i.e. print on the Numer-typing page)
	return (
		<div>




			<div style={{ position: "relative" }}>
			<div id="div_displayGeneratedNumber">
			</div>
			</div>
			<textarea id="numTextArea"></textarea>





		</div>
	) //return end. 	
} //full script end.

export default NumberTyping_displaySampleText