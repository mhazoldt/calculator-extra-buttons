
let operandDisplay = [ "" ];
let nextOperandCount = 0;

let operatorDisplay = [];
let nextOperatorCount = 0;

let newDisplayString = "";
let historyDisplayString = ""

let displayBox = document.getElementById("displayBox")
let historyBox = document.querySelector("#gridList2 > li.historyBox > div");
let historyBoxScroll = document.querySelector("#gridList2 > li.historyBox");


function okToInputDecimal() {return (operandDisplay[nextOperandCount].indexOf(".") === -1) && (operandDisplay[nextOperandCount].innerText != "")}
function okToEvaluate() {return (operandDisplay.length > 0 && operatorDisplay.length > 0 && operatorInputMode())}

function updateDisplay() {

  displayBox.innerText = ""
  displayBox.innerText = buildDisplayString()

}

function printStep(stepText) {
  let withNewline = stepText + "\n"
  historyDisplayString = historyDisplayString.concat(withNewline)

}

function buildDisplayString() {

  newDisplayString = ""

  for(counter = 0; counter < operandDisplay.length; counter++) {

      newDisplayString = newDisplayString.concat(operandDisplay[counter])

      if(counter < operatorDisplay.length) {
        newDisplayString = newDisplayString.concat(operatorDisplay[counter])
      }

  }

  return newDisplayString

}


//function operandInputMode() { return (operandDisplay.length === operatorDisplay.length) }

function operatorInputMode() { return ( operandDisplay.length === (operatorDisplay.length + 1) && operandDisplay[0] != "" ) }





function operandInput(nextSymbol) {
  if(nextSymbol === "0") {
    if(operandDisplay[nextOperandCount] != "") {
      operandDisplay[nextOperandCount] = operandDisplay[nextOperandCount] + nextSymbol
      updateDisplay()

    } else {
      redBlink()

    }

  } else if( (nextSymbol === ".") && okToInputDecimal() ) {
    if(operandDisplay[nextOperandCount] != "") {
      operandDisplay[nextOperandCount] = operandDisplay[nextOperandCount] + nextSymbol
      updateDisplay()

    } else {
      redBlink()

    }

  } else if( nextSymbol.match(/[\d]/) ) {
    console.log("symbol matches digit")
    operandDisplay[nextOperandCount] = operandDisplay[nextOperandCount] + nextSymbol
    updateDisplay()


  } else {
    console.log("symbol doesn't match anything")
    redBlink()
  }

  console.log(" ")
  console.log("operandDisplay: " + operandDisplay)
  console.log(nextOperandCount)
  console.log("operatorDisplay: " + operatorDisplay)
  console.log(nextOperatorCount)

}


function operatorInput(nextSymbol) {
  operatorDisplay.push(nextSymbol)
  updateDisplay()
  operandDisplay.push("")

  nextOperatorCount++
  nextOperandCount++

}


function doTheMaths() {
  let operand1 = parseFloat(operandDisplay[0])
  let operand2 = parseFloat(operandDisplay[1])
  let operator = operatorDisplay

  if(operator === "/") {
    return operand1 / operand2

  } else if(operator === "*") {
    return operand1 * operand2

  } else if(operator === "-") {
    return operand1 - operand2

  } else if(operator === "+") {
    return operand1 + operand2

  } else {

  }

}


function resetVariables() {
  operandDisplay = [ "" ];
  nextOperandCount = 0;

  operatorDisplay = [];
  nextOperatorCount = 0;

  newDisplayString = "";

}

function redBlink() {
  displayBox.classList.add("redbackground");
  setTimeout(function(){displayBox.classList.add("originalbackground");}, 500);
  setTimeout(function(){
    displayBox.classList.remove("originalbackground");
    displayBox.classList.remove("redbackground");
  }, 1000);

}


function inputController(nextSymbol) {

  if( nextSymbol.match(/[\d\.]/) ){
    operandInput(nextSymbol)

  } else if( nextSymbol.match(/[/*\-+%]/) && operatorInputMode() ) {
    console.log("symbol matches operator")
    operatorInput(nextSymbol)

  } else if( nextSymbol === "=" && okToEvaluate() ) {
    printStep("----------")
    printStep("start: " + buildDisplayString())
    displayBox.innerText = solveNextStep(buildDisplayString())
    printStep("----------")
    historyBox.innerText = historyDisplayString;
    historyBoxScroll.scrollTop = historyBoxScroll.scrollHeight;
    resetVariables()

  } else if (nextSymbol === "C") {
    displayBox.innerText = ""
    resetVariables()

  } else if ( nextSymbol === "S" && operandDisplay[nextOperandCount] != "" ) {
    printStep("----------")
    printStep("Square Root of: " + operandDisplay[nextOperandCount])
    operandDisplay[nextOperandCount] = Math.sqrt(operandDisplay[nextOperandCount])
    printStep("Answer: " + operandDisplay[nextOperandCount])
    printStep("----------")
    updateDisplay()
    historyBox.innerText = historyDisplayString;
    historyBoxScroll.scrollTop = historyBoxScroll.scrollHeight;

  } else {
    console.log("symbol matches nothing at first level")
    redBlink()

  }

}
