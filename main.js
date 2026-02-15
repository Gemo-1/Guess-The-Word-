let gameName = "Guess The Word"
let head = document.querySelector("h1").innerHTML = `${gameName}`
let checkBtn = document.querySelector(".check")
let inputs = document.querySelector(".inputs")
let footrz = document.querySelector("footer").innerHTML = `${gameName} Game Created By Gemo`
let trys = 4;
let numbersOfLetters = 5;
const masg = document.querySelector(".massg")
function creat() {
  for (let i = 1; i <= trys; i++) {
    let tryDiv = document.createElement("div")
    tryDiv.classList.add(`try${i}`)
    tryDiv.innerHTML = `<span>Try${i}</span>`
   
    if (i !== 1) tryDiv.classList.add("disabled-inputs")
    inputs.appendChild(tryDiv)
    for (let j = 1; j <= numbersOfLetters; j++) {
      let emtInput = document.createElement("input")
      emtInput.setAttribute("maxlength", "1")
      emtInput.id = `guess${i}-letter${j}`
      // emtInput.classList.add(`input`)
      tryDiv.appendChild(emtInput)
    }
  }
  inputs.children[0].children[1].focus()
  const disInputs = document.querySelectorAll(".disabled-inputs input")
  disInputs.forEach((i) => i.disabled = true)
  const onInput = document.querySelectorAll("input")
  onInput.forEach((inp, i) => {
    inp.addEventListener("input", function () {
      this.value = this.value.toUpperCase()
      const nextLetter = onInput[i + 1].focus()
    })
    inp.addEventListener("keydown", (event) => {
        arrOfIntput = Array.from(onInput).indexOf(event.target)
        if (event.key === "ArrowRight") {
          const nextInput = onInput[arrOfIntput + 1]
          if (arrOfIntput < onInput.length) {
            nextInput.focus()
          }
        }
        if (event.key === "ArrowLeft") {
          const preInput = onInput[arrOfIntput - 1]
          if (arrOfIntput > 0) {
            preInput.focus()
          }
        }
        if (event.key === "Backspace") {
          const delInput = onInput[arrOfIntput - 1]
          delInput.value = ""
          delInput.focus()
          onInput[arrOfIntput].value = ""
          onInput.value = ""
        }
      })
  })
}

// game words 
let wordToGuss = ""
const words = [
  "apple",
  "brain",
  "cloud",
  "dream",
  "earth",
  "flame",
  "grape",
  "house",
  "juice",
  "knife",
  "lemon",
  "magic",
  "night",
  "ocean",
  "plant",
  "queen",
  "river",
  'space',
  'table',
  'Valid',
  'Watch',
  'books',
  "smile"]
 wordToGuss = words[Math.floor(Math.random() * words.length)].toLowerCase()
 
 let numberOfTheTrys = 1;
 checkBtn.addEventListener("click", checkWorld)
 function checkWorld () {
  let youWin = true;
  for (let i = 1; i <= numbersOfLetters; i++) {    
   const letterInput = document.querySelector(`#guess${numberOfTheTrys}-letter${i}`)
   const theLetter = letterInput.value.toLowerCase();
   const achulyLetter = wordToGuss[i - 1];
   if (theLetter ===  achulyLetter) {
    letterInput.classList.add("right")
   }else if(wordToGuss.includes(theLetter) && theLetter !== ""){
    letterInput.classList.add("not-right")
    youWin = false;
   }else {
    youWin = false;
    letterInput.classList.add("wrong")
   }
    
  }
  if(youWin){
      masg.innerHTML = `You Win The Word Is <span>${wordToGuss.charAt(0).toUpperCase() + wordToGuss.slice(1)}</span>`
      let allTrys = document.querySelectorAll(".inputs > div")
      allTrys.forEach((e) => e.classList.add("disabled-inputs"))
      checkBtn.disabled = true;
    }else{
      document.querySelector(`.try${numberOfTheTrys}`).classList.add("disabled-inputs")
      const fristTry = document.querySelectorAll(`.try${numberOfTheTrys} input`)
      fristTry.forEach((e) => e.disabled = true ) 
      // heart icons
    let fullHaert = document.querySelectorAll(".fa-solid")
    let emtyHeart = document.querySelectorAll(".fa-regular")
    fullHaert[numberOfTheTrys - 1].classList.add("on")
    emtyHeart[numberOfTheTrys - 1].classList.remove("on")
      
      numberOfTheTrys++
      const lastTry = document.querySelectorAll(`.try${numberOfTheTrys} input`)
      lastTry.forEach((e) => e.disabled = false )
     
     let el = document.querySelector(`.try${numberOfTheTrys}`) 
     if(el){
       document.querySelector(`.try${numberOfTheTrys}`).classList.remove("disabled-inputs")
       el.children[1].focus();
     }else {
      checkBtn.disabled = true
      masg.innerHTML = `You Lose The Word Is <p>${wordToGuss.charAt(0).toUpperCase() + wordToGuss.slice(1)}</p>`
     }
    }
}
inputs.addEventListener("keydown", function (e) {
  if(e.key === "Enter"){
   checkWorld()
  }
})
let hint = document.querySelector(".hint")
hint.addEventListener("click", getHint)
let numberOfHints = 2;
document.querySelector(".hint span").innerHTML = numberOfHints

function getHint(){
  if(numberOfHints > 0 ){
  numberOfHints--
 document.querySelector(".hint span").innerHTML = numberOfHints
 let inputFild = document.querySelectorAll("input:not([disabled])")
//  console.log(inputFild)
 let chekIfInputEmty = Array.from(inputFild).filter((el) => el.value === "")
//  console.log(chekIfInputEmty)
 if(chekIfInputEmty.length > 0){
  const randomLetter = [Math.floor(Math.random() * chekIfInputEmty.length)]
  const randomInput = chekIfInputEmty[randomLetter]
  console.log(randomInput)
  const fillInput = Array.from(inputFild).indexOf(randomInput)
  console.log(fillInput)
  if(fillInput !== -1){
    randomInput.value = wordToGuss[fillInput].toUpperCase()
    // randomInput.classList.add("right")
    // randomInput.disabled = true
  }
 }
}
}

console.log(wordToGuss)

window.onload = creat


