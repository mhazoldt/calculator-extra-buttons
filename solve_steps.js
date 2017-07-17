function solveNextStep(eqString) {
  printStep(" ")
  console.log("start: " + eqString)
  printStep("next: " + eqString)

  // get arrays of operands and operators
  let eqOperands = eqString.split(/[*/+\-%]/)
  let eqOperators = eqString.match(/[*/+\-%]/g)
  console.log(eqOperands)
  console.log(eqOperators)

  let nextMod = eqOperators.indexOf("%")
  let nextMultiplication = eqOperators.indexOf("*")
  let nextDivision = eqOperators.indexOf("/")
  let nextAddition = eqOperators.indexOf("+")
  let nextSubtraction = eqOperators.indexOf("-")

  nextMod = (nextMod === -1) ? eqOperators.length : nextMod
  nextMultiplication = (nextMultiplication === -1) ? eqOperators.length : nextMultiplication
  nextDivision = (nextDivision === -1) ? eqOperators.length : nextDivision
  nextAddition = (nextAddition === -1) ? eqOperators.length : nextAddition
  nextSubtraction = (nextSubtraction === -1) ? eqOperators.length : nextSubtraction

  let answerForNextStep;
  let operand1;
  let operand2;


  if(nextMultiplication < eqOperators.length || nextDivision < eqOperators.length || nextMod < eqOperators.length) {
    let nextOperatorIndex = Math.min(nextMultiplication, nextDivision, nextMod)
    let operatorCharacter = eqOperators[nextOperatorIndex]

    if(operatorCharacter === "*") {
      operand1 = parseFloat(eqOperands[nextMultiplication])
      operand2 = parseFloat(eqOperands[nextMultiplication + 1])

      answerForNextStep = operand1 * operand2
      eqOperands.splice(nextMultiplication, 2, answerForNextStep)
      eqOperators.splice(nextMultiplication, 1)
      console.log("Multiplication!")
      printStep(">Multiplication<")
      console.log(operand1 + " * " + operand2 + " = " + answerForNextStep)
      printStep(operand1 + " * " + operand2 + " = " + answerForNextStep)
      console.log(eqOperands)
      console.log(eqOperators)

    } else if(operatorCharacter === "/") {
      operand1 = parseFloat(eqOperands[nextDivision])
      operand2 = parseFloat(eqOperands[nextDivision + 1])

      answerForNextStep = operand1 / operand2
      eqOperands.splice(nextDivision, 2, answerForNextStep)
      eqOperators.splice(nextDivision, 1)
      console.log("Division!")
      printStep(">Division<")
      console.log(operand1 + " / " + operand2 + " = " + answerForNextStep)
      printStep(operand1 + " / " + operand2 + " = " + answerForNextStep)
      console.log(eqOperands)
      console.log(eqOperators)

    } else if(operatorCharacter === "%") {
      operand1 = parseFloat(eqOperands[nextMod])
      operand2 = parseFloat(eqOperands[nextMod + 1])

      answerForNextStep = operand1 % operand2
      eqOperands.splice(nextMod, 2, answerForNextStep)
      eqOperators.splice(nextMod, 1)
      console.log("Mod!")
      printStep(">Mod<")
      console.log(operand1 + " % " + operand2 + " = " + answerForNextStep)
      printStep(operand1 + " % " + operand2 + " = " + answerForNextStep)
      console.log(eqOperands)
      console.log(eqOperators)

      } else {

    }

  } else if(nextAddition < eqOperators.length || nextSubtraction < eqOperators.length) {
    if(nextAddition < nextSubtraction) {
      operand1 = parseFloat(eqOperands[nextAddition])
      operand2 = parseFloat(eqOperands[nextAddition + 1])

      answerForNextStep = operand1 + operand2
      eqOperands.splice(nextAddition, 2, answerForNextStep)
      eqOperators.splice(nextAddition, 1)
      console.log("Addition!")
      printStep(">Addition<")
      console.log(operand1 + " + " + operand2 + " = " + answerForNextStep)
      printStep(operand1 + " + " + operand2 + " = " + answerForNextStep)
      console.log(eqOperands)
      console.log(eqOperators)

    } else if(nextSubtraction < nextAddition) {
      operand1 = parseFloat(eqOperands[nextSubtraction])
      operand2 = parseFloat(eqOperands[nextSubtraction + 1])

      answerForNextStep = operand1 - operand2
      eqOperands.splice(nextSubtraction, 2, answerForNextStep)
      eqOperators.splice(nextSubtraction, 1)
      console.log("Subtraction!")
      printStep(">Subtraction<")
      console.log(operand1 + " - " + operand2 + " = " + answerForNextStep)
      printStep(operand1 + " - " + operand2 + " = " + answerForNextStep)
      console.log(eqOperands)
      console.log(eqOperators)

    } else {

    }

  } else {

  }


  let newEqString = ""

  for(counter = 0; counter < eqOperands.length; counter++) {
    let lastIteration = eqOperands.length - 1
    if(counter != lastIteration) {
      newEqString = newEqString.concat(eqOperands[counter])
      newEqString = newEqString.concat(eqOperators[counter])

    } else {
      newEqString = newEqString.concat(eqOperands[counter])

    }


  }
  console.log("end: " + newEqString)
  printStep("new: " + newEqString)
  console.log(" ")
  printStep(" ")

  if(eqOperators.length != 0) {
    newEqString = solveNextStep(newEqString)
    return newEqString
  } else {
    printStep("Answer: " + newEqString)
    return newEqString

  }

}
