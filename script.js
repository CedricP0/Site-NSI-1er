

var inputMoney = document.querySelector("#inputMonnaie");
var textMoney = document.getElementById("resultats");
var buttonMoney = document.getElementById("buttonMoney");

function changeMonnaie(amount) {
  let listePieces = [1, 2, 5, 10, 20, 50, 100, 200];
  listePieces.sort((a, b) => b - a); 
  let change = []; 
  for (let piece of listePieces) {
    while (amount >= piece) {
      change.push(piece);
      amount -= piece;
    }
  }
  return change;
}

function algoMoney(){
  if(inputMoney.value>1000){
    alert("Entrez 1000 centimes au maximum")
  }else{
    textMoney.innerText = " La meilleur combinaison sera [ "+changeMonnaie(inputMoney.value)+" ].";
  }
  
}



function switchTab(index) {
  var onglets = document.querySelectorAll('.onglets');
  var contenu = document.querySelectorAll('.contenu');

  for (var i = 0; i < onglets.length; i++) {
    onglets[i].classList.remove('active');
    contenu[i].classList.remove('activeContenu');
  }

  onglets[index].classList.add('active');
  contenu[index].classList.add('activeContenu');
}


///QUIZ


var questions = [
  {
    question: "1. À quoi sert un algorithme glouton?",
    options: ["Calculer la distance entre deux points", "Déterminer la longueur d'une liste", "Retourner un résultat optimal", "Génerez des données aléatoirement"],
    correctAnswer: "Retourner un résultat optimal"
  },
  {
    question: "2. Comment appelle t-on un algorithme glouton qui ne renvoie pas la solution optimal ?",
    options: ["Erreur gloutonne", "Heuristique gloutonne", "Trace gloutonne", "Risque gloutonnien"],
    correctAnswer: "Heuristique gloutonne"
  },
  {
    question: "3. Lequel de ces algorithme n'utilise pas le principe d'un algorithme glouton ?",
    options: ["Codage de Huffman", "Voyageur de commerce", "Problème du sac à dos", "Algorithme de tri rapide"],
    correctAnswer: "Algorithme de tri rapide"
  },
  {
    question: "4. Que fais la commande 'ls' ?",
    options: ["Lister le contenu d'un dossier", "Copier des fichiers", "Affiche le chemin du dossier", "Désinstaller Linux"],
    correctAnswer: "Lister le contenu d'un dossier"
  },
  {
    question: "5. Que fais la commande 'clear' ?",
    options: ["Affiche du texte dans le Terminal", "Effacer le contenu d'un dossier", "Effacer le contenu de la fenètre du Terminal", "Ferme le Terminal"],
    correctAnswer: "Effacer le contenu de la fenètre du Terminal"
  },
  {
    question: "6. À quel commande correspond cette définition : 'Est utilisée pour supprimer des fichiers ou des répertoires' ?",
    options: ["mkdir", "cd", "rm", "mv"],
    correctAnswer: "rm"
  },
  {
    question: "7. À quel commande correspond cette définition : 'Affiche le chemin complet du repertoire dans laquel vous vous trouvez ?",
    options: ["man", "echo", "ping", "pwd"],
    correctAnswer: "pwd"
  }
];

var currentQuestionIndex = 0;
var answered = false; 
var score = 0;

function displayQuestion() {
  var questionElement = document.getElementById("question");
  questionElement.textContent = questions[currentQuestionIndex].question;

  var optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";
  questions[currentQuestionIndex].options.forEach(function(option) {
    var button = document.createElement("button");
    button.textContent = option;
    button.className = "option";
    button.onclick = function() {
      if (!answered) { 
        checkAnswer(option, button);
        answered = true; 
      }
    };
    optionsContainer.appendChild(button);
  });
  updateProgressBar();
}

function checkAnswer(answer, button) {
  var resultElement = document.getElementById("result");
  if (answer === questions[currentQuestionIndex].correctAnswer) {
    resultElement.textContent = "Correct !";
    resultElement.style.color = "green";
    button.style.backgroundColor = "green";
    score++;
  } else {
    resultElement.textContent = "Incorrect ! La bonne réponse est : " + questions[currentQuestionIndex].correctAnswer + ".";
    resultElement.style.color = "red";
    button.style.backgroundColor = "red";
  }
  disableOptions(); 
  
  document.getElementById("next-button").style.display = "block";
}

function disableOptions() {
  var optionButtons = document.querySelectorAll(".option");
  optionButtons.forEach(function(button) {
    button.disabled = true;
  });
}

function updateProgressBar() {
  var progressBar = document.getElementById("progress-bar");
  var progressValue = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.value = progressValue;
}

function nextQuestion() {
  currentQuestionIndex++;
  answered = false; 
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
    document.getElementById("result").textContent = "";
    document.getElementById("next-button").style.display = "none";
  } else {
    document.getElementById("result").textContent = "Votre score : " + score+"/7";
    document.getElementById("question-container").innerHTML = "<p>Fin du quizz !</p>";
    document.getElementById("options-container").innerHTML = "";
    document.getElementById("next-button").style.display = "none";
    document.getElementById("replay").style.display  = "block";
    document.getElementById("progress-bar").style.display ="none";
  }
}

function replay(){
  window.location.reload();
}

displayQuestion();

