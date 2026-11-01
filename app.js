const STORAGE_KEY = "ecoimpact.progress.v1";

const questions = [
  {
    category: "VOS DÉPLACEMENTS",
    title: "Comment se passent vos trajets du quotidien ?",
    help: "Pensez surtout à vos déplacements habituels.",
    answers: ["Souvent en voiture, même seul·e", "Un mélange de voiture et d’autres moyens", "Surtout à pied, à vélo ou en transports"]
  },
  {
    category: "VOTRE ASSIETTE",
    title: "Quelle place la viande prend-elle dans vos repas ?",
    help: "Il n’y a pas de bonne ou de mauvaise réponse.",
    answers: ["Presque tous les jours", "Quelques repas par semaine", "Rarement ou jamais"]
  },
  {
    category: "VOTRE LOGEMENT",
    title: "À la maison, comment gérez-vous le chauffage ?",
    help: "Choisissez ce qui ressemble le plus à votre quotidien.",
    answers: ["Je chauffe plutôt beaucoup", "Je fais déjà attention, selon les pièces", "Je chauffe peu ou j’ai déjà de bons réflexes"]
  },
  {
    category: "VOS ACHATS",
    title: "À quelle fréquence achetez-vous des choses neuves ?",
    help: "Vêtements, objets et équipement du quotidien.",
    answers: ["Régulièrement, selon mes envies", "De temps en temps, quand j’en ai besoin", "Rarement ; je répare ou j’achète d’occasion"]
  },
  {
    category: "VOTRE ENVIE",
    title: "Sur quel sujet aimeriez-vous agir en premier ?",
    help: "Votre préférence guidera la suggestion, sans calculer de score.",
    answers: ["Mes déplacements", "Mon alimentation", "Mon logement", "Mes achats"]
  }
];

const actions = {
  "Mes déplacements": {
    category: "MOBILITÉ",
    title: "Remplacer un court trajet en voiture",
    description: "Cette semaine, choisissez un trajet court que vous pourriez faire à pied, à vélo ou en transports. Commencez par un seul aller-retour, à votre rythme."
  },
  "Mon alimentation": {
    category: "ALIMENTATION",
    title: "Essayer un repas végétal qui vous plaît",
    description: "Choisissez un repas cette semaine pour découvrir une recette végétale simple. L’objectif est de trouver une option savoureuse à refaire, pas de tout changer."
  },
  "Mon logement": {
    category: "ÉNERGIE",
    title: "Baisser légèrement le chauffage",
    description: "Testez une baisse d’un degré dans une pièce où vous êtes à l’aise, puis voyez si cela vous convient. Adaptez toujours selon votre santé et votre confort."
  },
  "Mes achats": {
    category: "CONSOMMATION",
    title: "Faire durer un objet un peu plus longtemps",
    description: "Repérez un objet à réparer, emprunter ou acheter d’occasion avant de le remplacer. Un seul choix réfléchi suffit pour commencer."
  }
};

const welcome = document.querySelector("#welcome");
const onboarding = document.querySelector("#onboarding");
const result = document.querySelector("#result");
const answersContainer = document.querySelector("#answers");
const questionTitle = document.querySelector("#question-title");
const questionHelp = document.querySelector("#question-help");
const questionCategory = document.querySelector("#question-category");
const progressBar = document.querySelector("#progress-bar");
const progressTrack = document.querySelector(".progress-track");
const progressLabel = document.querySelector("#progress-label");
const formError = document.querySelector("#form-error");
const nextButton = document.querySelector("#next-button");
const completeButton = document.querySelector("#complete-button");

let state = loadState();
let questionIndex = 0;
let storageAvailable = true;

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return { answers: [], completed: false, started: false };
    const parsed = JSON.parse(saved);
    if (!parsed || !Array.isArray(parsed.answers)) throw new Error("Données de progression invalides.");
    return {
      answers: parsed.answers.slice(0, questions.length),
      completed: parsed.completed === true,
      started: parsed.started === true
    };
  } catch (error) {
    console.error("Impossible de lire la progression EcoImpact.", error);
    storageAvailable = false;
    return { answers: [], completed: false, started: false };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Impossible d’enregistrer la progression EcoImpact.", error);
    storageAvailable = false;
  }
}

function showScreen(screen) {
  welcome.hidden = screen !== "welcome";
  onboarding.hidden = screen !== "onboarding";
  result.hidden = screen !== "result";
}

function renderQuestion() {
  const question = questions[questionIndex];
  questionCategory.textContent = question.category;
  questionTitle.textContent = question.title;
  questionHelp.textContent = question.help;
  progressLabel.textContent = `QUESTION ${questionIndex + 1} / ${questions.length}`;
  progressBar.style.width = `${((questionIndex + 1) / questions.length) * 100}%`;
  progressTrack.setAttribute("aria-valuenow", String(questionIndex + 1));
  nextButton.innerHTML = questionIndex === questions.length - 1
    ? 'Voir mon premier pas <span aria-hidden="true">→</span>'
    : 'Continuer <span aria-hidden="true">→</span>';
  answersContainer.replaceChildren(answersContainer.querySelector("legend"));

  question.answers.forEach((answer, answerIndex) => {
    const id = `answer-${questionIndex}-${answerIndex}`;
    const wrapper = document.createElement("div");
    wrapper.className = "answer-option";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.id = id;
    input.value = answer;
    input.checked = state.answers[questionIndex] === answer;
    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = answer;
    wrapper.append(input, label);
    answersContainer.append(wrapper);
  });
  formError.hidden = true;
}

function renderResult() {
  const preference = state.answers[4] || "Mes déplacements";
  const action = actions[preference] || actions["Mes déplacements"];
  document.querySelector("#result-intro").textContent =
    `Vous avez choisi de commencer par ${preference.toLowerCase()}. Voici une idée simple pour passer de l’envie à l’action.`;
  document.querySelector("#action-category").textContent = action.category;
  document.querySelector("#action-title").textContent = action.title;
  document.querySelector("#action-description").textContent = action.description;
  completeButton.classList.toggle("is-complete", state.completed);
  completeButton.setAttribute("aria-pressed", String(state.completed));
  completeButton.innerHTML = state.completed
    ? 'Défi relevé <span aria-hidden="true">✓</span>'
    : 'Je relève le défi <span aria-hidden="true">✓</span>';
  document.querySelector("#saved-status").textContent = storageAvailable
    ? state.completed
      ? "Votre défi est enregistré sur cet appareil."
      : "Vos réponses sont enregistrées sur cet appareil."
    : "Le stockage local est indisponible : vos réponses ne seront pas conservées.";
}

document.querySelector("#start-button").addEventListener("click", () => {
  state.started = true;
  saveState();
  questionIndex = Math.min(state.answers.length, questions.length - 1);
  showScreen("onboarding");
  renderQuestion();
  questionTitle.focus();
});

document.querySelector("#back-button").addEventListener("click", () => {
  if (questionIndex === 0) {
    showScreen("welcome");
    return;
  }
  questionIndex -= 1;
  renderQuestion();
  questionTitle.focus();
});

document.querySelector("#question-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const selected = answersContainer.querySelector('input[name="answer"]:checked');
  if (!selected) {
    formError.hidden = false;
    return;
  }
  state.answers[questionIndex] = selected.value;
  state.answers = state.answers.slice(0, questionIndex + 1);
  saveState();
  if (questionIndex < questions.length - 1) {
    questionIndex += 1;
    renderQuestion();
    questionTitle.focus();
    return;
  }
  showScreen("result");
  renderResult();
  document.querySelector("#result-title").focus();
});

completeButton.addEventListener("click", () => {
  state.completed = !state.completed;
  saveState();
  renderResult();
});

function restart() {
  state = { answers: [], completed: false, started: false };
  questionIndex = 0;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Impossible d’effacer la progression EcoImpact.", error);
    storageAvailable = false;
  }
  showScreen("welcome");
}

document.querySelector("#restart-button").addEventListener("click", restart);
document.querySelector("#clear-button").addEventListener("click", restart);

if (state.answers.length === questions.length) {
  showScreen("result");
  renderResult();
} else if (state.started) {
  questionIndex = Math.min(state.answers.length, questions.length - 1);
  showScreen("onboarding");
  renderQuestion();
}
