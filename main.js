const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersContainer = document.querySelector(".letters");
let lettersArray = Array.from(letters);

lettersArray.forEach(letter=>{
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(letter));
    span.className = "letter";
lettersContainer.appendChild(span);
});

const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Egypt", "Palestine", "Yemen", "Syria", "Bahrain", "Qatar"]
  };

  const keys = Object.keys(words);

let  randomIndex = Math.floor(Math.random() * keys.length);
let randomWord = keys[randomIndex];
let categoryArray = words[randomWord];
let randomValueIndex = Math.floor(Math.random()* categoryArray.length);
let randomValue = categoryArray[randomValueIndex];


let category = document.querySelector(".category span").innerHTML = `${randomWord}`;
let lettersGuess = document.querySelector(".letters-guess");

arrayLetter = Array.from(randomValue);

let message = document.querySelector(".message");

arrayLetter.forEach((letter)=>{
    let span = document.createElement("span");
    if(letter === " "){
        span.className = "space";
    }
    lettersGuess.appendChild(span);
});

let guessSpans = document.querySelectorAll(".letters-guess span");
let hangmanDraw = document.querySelector(".hangman-draw");

let wrong = 0;
let maxWrong = 8;

function checkWin() {
    let allFilled = Array.from(guessSpans).every(span => span.innerHTML !== '');
    if (allFilled) {
        message.innerHTML = "congratulations, You Win!";
        message.classList.add("popup");
        document.querySelector(".letters").classList.add("finished");
        document.querySelectorAll(".letters span").forEach(span => span.classList.add("clicked"));
    }
}


document.addEventListener(("click"), (e)=>{
    let statuse = false;
    if(e.target.className === "letter"){
    e.target.classList.add("clicked");
    let letterCapital = e.target.innerHTML.toUpperCase();
    arrayLetter.forEach((letter,index)=>{
  if(letterCapital === letter.toUpperCase()){
    statuse = true;
    guessSpans.forEach((span,indexspan)=>{
if(index === indexspan){
    span.innerHTML = letter.toUpperCase();
}
 })
  }
    })
    if(!statuse && wrong < maxWrong){
        wrong++;
        hangmanDraw.classList.add(`wrong-${wrong}`);
        document.getElementById("fail").play();
        if(hangmanDraw.classList.contains("wrong-8")){
            document.querySelectorAll(".letters span").forEach((span)=>{
                span.classList.add("clicked");
            });

           document.querySelector(".letters").classList.add("finished");
          
          message.innerHTML = `You Lose, The Word Is &nbsp;<span class="word">${randomValue}</span>`;
          message.classList.add("popup");
        }
    }else{
        if(wrong < maxWrong){
    document.getElementById("success").play();
    checkWin();
        }   
    }
}
});






