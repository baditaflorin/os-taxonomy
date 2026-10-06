import { assessmentPromptFor } from "./taxonomy.js";
import { childAssessmentFor } from "./child-assessments.js?v=assignment-path-12";
import { preschoolActivityFor, preschoolIconFor } from "./preschool-activities.js?v=assignment-path-12";

const PRESCHOOL_MIN_AGE = 3;

const COPY = {
  en: {
    hello: "Ready to explore", voiceOff: "Voice off", voiceOn: "Voice on", listen: "Listen",
    age: "I'm learning at age", subject: "Choose a subject", allSubjects: "All subjects",
    pathTitle: "Your learning path", pathIntro: "Pick a glowing challenge. Finish one to open more of the path! Practice is not a test.", kidPathIntro: "Choose a world or play your next game!",
    trailTitle: "Your adventure trail", chooseWorld: "Choose a world", worldsIntro: "Choose a world to see its trail, or play your next adventure.",
    continueTrail: "Your next adventure", continueAction: "Play this game", allWorlds: "All worlds",
    worldProgress: "{done} of {total} games played", trailSteps: "Steps in this adventure",
    stepComplete: "done", stepCurrent: "now", stepUpcoming: "up next",
    countingObjects: "Objects to count", allMoved: "All moved! You can tap one again if you want to count them again.",
    moveObject: "Tap to move", revisitObject: "Tap to look at this one again",
    countingGameHint: "Move each one, then answer. You can tap them again if you want another look.",
    missionCompleteHint: "Mission complete! Your next adventure is ready.",
    ready: "Choose a game", locked: "Coming up", done: "Done for now", practiced: "Practised", more: "More games",
    play: "Play this challenge", back: "Back to my path", challenge: "Your quick assignment",
    childChallenge: "A little learning mission", grownupOriginal: "Grown-up: original assignment", grownupSettings: "Grown-up settings", grownupExit: "Grown-up",
    mission: "Mission", missionCheck: "Check my answer!", missionPass: "Nice thinking! You got this part!", missionRetry: "Not quite. Look again and try another answer.",
    assessmentHint: "Tap the picture that answers the question.", practiceGameHint: "Pick a picture. If it is not the right one yet, you can try again!", guidedHint: "Try the challenge by saying it, pointing, drawing, or using toys. No grown-up check needed.",
    chooseResponseMode: "How will you try it? Pick one!",
    responseModes: [{ id: "say", icon: "🗣️", label: "Say it" }, { id: "point", icon: "👆", label: "Point to it" }, { id: "show", icon: "🧸", label: "Show with toys" }, { id: "draw", icon: "🎨", label: "Draw it" }],
    readyToShow: "I tried it!", practicePass: "Nice work trying! This mission counts as practice, not a test.",
    missionsComplete: "You did every mission!", finishMissions: "Open my next adventure!", finishQuiz: "Finish my adventure!", chooseAtLeast: "Pick at least two pictures, then check.",
    sourceEnglish: "The original taxonomy prompt is in English.", ageThree: "No Quick Assignments are tagged for age 3 in this taxonomy yet. The youngest source age is 4. Try an age-4 challenge together with a grown-up.",
    ageThreeTitle: "For little explorers",
    tryAgeFour: "Show age-4 challenges",
    lockedBy: "First try", unlocks: "This can open", noPath: "No challenges match these choices yet. Try another age or subject.",
    success: "Adventure complete! New challenges may have opened.",
    stars: "path stars this session", guest: "Playing as a guest. Add a child profile to save practice and open the path.", saved: "Practice stays in this browser. Grown-ups can separately mark what a child knows.",
    unavailable: "Voice is unavailable in this browser. A grown-up can read the challenge aloud.",
    waiting: "Complete the first challenge to see what it opens.", completed: "Known", lockedLabel: "Locked", prerequisite: "Finish first:",
  },
  ro: {
    hello: "Gata de explorat", voiceOff: "Fără voce", voiceOn: "Cu voce", listen: "Ascultă",
    age: "Învăț la vârsta de", subject: "Alege un domeniu", allSubjects: "Toate domeniile",
    pathTitle: "Drumul tău de învățare", pathIntro: "Alege o provocare luminoasă. Termină una ca să deschizi altele! Exersarea nu este un test.", kidPathIntro: "Alege o lume sau joacă următorul joc!",
    trailTitle: "Drumul aventurilor", chooseWorld: "Alege o lume", worldsIntro: "Alege o lume ca să-i vezi drumul sau joacă următoarea aventură.",
    continueTrail: "Următoarea aventură", continueAction: "Joacă jocul", allWorlds: "Toate lumile",
    worldProgress: "Ai jucat {done} din {total} jocuri", trailSteps: "Pașii acestei aventuri",
    stepComplete: "terminat", stepCurrent: "acum", stepUpcoming: "urmează",
    countingObjects: "Obiecte de numărat", allMoved: "Toate au fost mutate! Poți atinge un obiect dacă vrei să le numeri din nou.",
    moveObject: "Atinge ca să muți", revisitObject: "Atinge ca s-o privești din nou",
    countingGameHint: "Mută-le pe rând, apoi răspunde. Le poți atinge din nou dacă vrei să le mai privești.",
    missionCompleteHint: "Misiune terminată! Următoarea aventură te așteaptă.",
    ready: "Alege un joc", locked: "Urmează", done: "Gata pentru acum", practiced: "Am exersat", more: "Mai multe jocuri",
    play: "Joacă această provocare", back: "Înapoi la drum", challenge: "Provocarea ta rapidă",
    childChallenge: "O misiune de învățare", grownupOriginal: "Pentru adult: provocarea originală", grownupSettings: "Setări pentru adult", grownupExit: "Adult",
    mission: "Misiunea", missionCheck: "Verifică răspunsul!", missionPass: "Bravo! Ai rezolvat această parte!", missionRetry: "Nu chiar. Uită-te din nou și mai încearcă.",
    assessmentHint: "Atinge imaginea care răspunde la întrebare.", practiceGameHint: "Alege o imagine. Dacă nu este cea potrivită, mai poți încerca!", guidedHint: "Încearcă provocarea: spune, arată, desenează sau folosește jucării. Nu ai nevoie de verificarea unui adult.",
    chooseResponseMode: "Cum vrei să încerci? Alege una!",
    responseModes: [{ id: "say", icon: "🗣️", label: "Spune" }, { id: "point", icon: "👆", label: "Arată cu degetul" }, { id: "show", icon: "🧸", label: "Arată cu jucării" }, { id: "draw", icon: "🎨", label: "Desenează" }],
    readyToShow: "Am încercat!", practicePass: "Bravo că ai încercat! Misiunea înseamnă exersare, nu test.",
    missionsComplete: "Ai terminat toate misiunile!", finishMissions: "Hai la următoarea aventură!", finishQuiz: "Termină aventura!", chooseAtLeast: "Alege cel puțin două imagini, apoi verifică.",
    sourceEnglish: "Textul original din taxonomie este în engleză.", ageThree: "Taxonomia nu are încă provocări rapide etichetate pentru 3 ani. Cele mai mici provocări din sursă sunt de la 4 ani. Încearcă una împreună cu un adult.",
    ageThreeTitle: "Pentru micii exploratori",
    tryAgeFour: "Arată provocările pentru 4 ani",
    lockedBy: "Încearcă mai întâi", unlocks: "Aceasta poate deschide", noPath: "Nu sunt provocări pentru aceste alegeri. Încearcă altă vârstă sau domeniu.",
    success: "Aventură terminată! S-ar putea să se fi deschis provocări noi.",
    stars: "stele pe drum în sesiunea aceasta", guest: "Te joci ca oaspete. Adaugă profilul copilului ca să salvezi exersarea și să deschizi drumul.", saved: "Exersarea rămâne în acest browser. Un adult poate marca separat ce știe copilul.",
    unavailable: "Vocea nu este disponibilă în acest browser. Un adult îți poate citi provocarea.",
    waiting: "Termină prima provocare ca să vezi ce deschide.", completed: "Știe", lockedLabel: "Încuiat", prerequisite: "Încearcă mai întâi:",
  },
};

const CHILD_TOPIC_NAMES = {
  mt_SsS7GptD_o: "Ce sunt banii?",
  mt_FNSeo9_T2Z: "Cum păstrăm banii în siguranță?",
  mt_zrCyqhngYm: "Economisim bani",
  mt_N8CpN1EJrP: "Construim propoziții",
  mt_of2GggtxFl: "Spații între cuvinte",
  mt__KHQttMde3: "Unim sunetele în cuvinte",
  mt_frDIaXzWbx: "Recunoaștem literele",
  mt_PvU3eoikev: "Începuturi și rime",
  mt_4GiE83rJF_: "Cuvinte care rimează",
  mt_F978c32kDr: "Sunetele literelor",
  "mt_OvyoRo47K-": "Adunăm împreună",
  "mt_PgsHGYJMH-": "Adunare și scădere",
  mt__h7hvT4tEb: "Mai multe sau mai puține",
  mt_dmNvjroCPT: "Câte sunt în total?",
  mt_sYpKWbq5ra: "Încă unul de fiecare dată",
  mt_WcfaSfVT33: "Numărăm fiecare obiect",
  mt_KJeEeTutJI: "Forme plane",
  mt_Qcp2d_kuta: "Forme 3D",
};

const CHILD_WORLDS = {
  Computing: { icon: "💻", en: "Tech explorers", ro: "Exploratori digitali" },
  English: { icon: "📖", en: "Word explorers", ro: "Exploratori ai cuvintelor" },
  History: { icon: "🏰", en: "Time travelers", ro: "Călători în timp" },
  "Learning to Learn": { icon: "🧠", en: "Learning tools", ro: "Unelte de învățare" },
  "Life Skills": { icon: "🛒", en: "Everyday heroes", ro: "Eroi de zi cu zi" },
  Mathematics: { icon: "🔢", en: "Number explorers", ro: "Exploratori ai numerelor" },
  "Personal & Social Development": { icon: "🤝", en: "Feelings & friends", ro: "Prieteni și emoții" },
  Science: { icon: "🔬", en: "Nature explorers", ro: "Exploratori în natură" },
};

function childTopicName(topic, language) {
  return language === "ro" ? CHILD_TOPIC_NAMES[topic.id] ?? topic.name : topic.name;
}

function node(tag, className = "", text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function button(label, action, className = "play-button") {
  const element = node("button", className, label);
  element.type = "button";
  element.addEventListener("click", action);
  return element;
}

function hardPrerequisites(taxonomy, topicId) {
  return taxonomy.prerequisites.get(topicId).filter(({ strength }) => strength === "hard");
}

function pathComplete(progress, topicId) {
  const status = progress[topicId]?.status;
  return status === "mastered" || status === "practiced";
}

function newAssessmentSession(assessment) {
  const choiceOrders = {};
  for (const [taskIndex, task] of assessment.tasks.entries()) {
    if (!Array.isArray(task.choices)) continue;
    const order = task.choices.map((_, index) => index);
    for (let index = order.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
    }
    choiceOrders[taskIndex] = order;
  }
  return { completedTasks: 0, selectedChoices: [], selectedMode: null, feedback: null, choiceOrders };
}

function latestCompletedPrerequisiteAt(taxonomy, progress, topicId) {
  return hardPrerequisites(taxonomy, topicId).reduce((latest, { prerequisiteId }) => {
    const entry = progress[prerequisiteId];
    const updatedAt = pathComplete(progress, prerequisiteId) ? Date.parse(entry.updatedAt) : 0;
    return Number.isFinite(updatedAt) ? Math.max(latest, updatedAt) : latest;
  }, 0);
}

export function getPlayPath(taxonomy, progress, age, subject = "") {
  const inScope = taxonomy.topics.filter((topic) =>
    topic.ageRangeStart <= age && topic.ageRangeEnd >= age && (!subject || topic.subject === subject),
  );
  const available = [];
  const locked = [];
  const completed = [];

  for (const topic of inScope) {
    const entry = progress[topic.id];
    const prerequisites = hardPrerequisites(taxonomy, topic.id);
    const unmet = prerequisites.filter(({ prerequisiteId }) => !pathComplete(progress, prerequisiteId));
    if (pathComplete(progress, topic.id)) completed.push(topic);
    else if (!unmet.length) available.push(topic);
    else locked.push({ topic, unmet });
  }

  const order = (left, right) => {
    const leftLearning = progress[left.id]?.status === "learning" ? 0 : 1;
    const rightLearning = progress[right.id]?.status === "learning" ? 0 : 1;
    return leftLearning - rightLearning || left.ageRangeStart - right.ageRangeStart ||
      (right.centrality || 0) - (left.centrality || 0) || left.name.localeCompare(right.name);
  };
  const readyIds = new Set(available.map(({ id }) => id));
  locked.sort((left, right) =>
    right.unmet.filter(({ prerequisiteId }) => readyIds.has(prerequisiteId)).length -
      left.unmet.filter(({ prerequisiteId }) => readyIds.has(prerequisiteId)).length ||
    left.unmet.length - right.unmet.length || order(left.topic, right.topic),
  );
  const opensCount = new Map();
  for (const item of locked) for (const edge of item.unmet) {
    if (readyIds.has(edge.prerequisiteId)) opensCount.set(edge.prerequisiteId, (opensCount.get(edge.prerequisiteId) ?? 0) + 1);
  }
  const openedAt = new Map(available.map((topic) => [
    topic.id,
    latestCompletedPrerequisiteAt(taxonomy, progress, topic.id),
  ]));
  available.sort((left, right) =>
    (progress[left.id]?.status === "learning" ? 0 : 1) - (progress[right.id]?.status === "learning" ? 0 : 1) ||
    (age <= 5 && preschoolActivityFor(left) ? 0 : 1) - (age <= 5 && preschoolActivityFor(right) ? 0 : 1) ||
    openedAt.get(right.id) - openedAt.get(left.id) ||
    (opensCount.get(right.id) ?? 0) - (opensCount.get(left.id) ?? 0) || order(left, right),
  );
  completed.sort((left, right) => (progress[right.id]?.updatedAt ?? "").localeCompare(progress[left.id]?.updatedAt ?? "") || order(left, right));
  return { available, locked, completed };
}

export class PlayView {
  constructor(root, { taxonomy, onAssess, onPractice, onNeedProfile, onExit, onCelebrate }) {
    this.root = root;
    this.taxonomy = taxonomy;
    this.onAssess = onAssess;
    this.onPractice = onPractice;
    this.onNeedProfile = onNeedProfile;
    this.onExit = onExit ?? (() => {});
    this.onCelebrate = onCelebrate;
    this.lang = globalThis.navigator?.language?.toLocaleLowerCase().startsWith("ro") ? "ro" : "en";
    this.age = 5;
    this.subject = "";
    this.stars = 0;
    this.screen = "path";
    this.selectedTopicId = null;
    this.visible = false;
    this.voiceOn = Boolean(globalThis.speechSynthesis && globalThis.SpeechSynthesisUtterance);
    try {
      const savedLanguage = globalThis.localStorage.getItem("marble-taxonomy:play-language");
      if (savedLanguage === "ro" || savedLanguage === "en") this.lang = savedLanguage;
      const savedAge = Number(globalThis.localStorage.getItem("marble-taxonomy:play-age"));
      if (Number.isInteger(savedAge) && savedAge >= PRESCHOOL_MIN_AGE && savedAge <= taxonomy.maxAge) this.age = savedAge;
      const savedVoice = globalThis.localStorage.getItem("marble-taxonomy:play-voice");
      if (savedVoice === "on") this.voiceOn = Boolean(globalThis.speechSynthesis && globalThis.SpeechSynthesisUtterance);
      if (savedVoice === "off") this.voiceOn = false;
    } catch { /* Playing still works when browser storage is unavailable. */ }
    this.profile = null;
    this.progressKey = "";
    this.assessmentSessions = new Map();
    globalThis.addEventListener("resize", () => this.drawPathLinks());
    this.render();
    document.addEventListener("visibilitychange", () => { if (document.hidden) this.stopSpeaking(); });
  }

  get copy() { return COPY[this.lang]; }
  get activeTopic() { return this.taxonomy.byId.get(this.selectedTopicId); }
  get path() { return getPlayPath(this.taxonomy, this.profile?.progress ?? {}, this.age, this.subject); }

  setVisible(visible) {
    this.visible = visible;
    this.render();
  }

  setProfile(profile) {
    const progressKey = JSON.stringify(Object.entries(profile?.progress ?? {}).map(([id, entry]) => [id, entry.status, entry.assessment?.verified]).sort());
    const changed = this.profile?.id !== profile?.id || this.profile?.name !== profile?.name || this.progressKey !== progressKey;
    if (this.profile?.id && this.profile.id !== profile?.id) {
      this.assessmentSessions.clear();
      this.stars = 0;
      this.selectedTopicId = null;
      this.screen = "path";
    }
    this.profile = profile;
    this.progressKey = progressKey;
    if (changed) this.render();
  }

  stopSpeaking() { globalThis.speechSynthesis?.cancel(); }
  scrollToTop() {
    const workspace = this.root.closest(".workspace");
    if (workspace) workspace.scrollTop = 0;
  }
  speak(text, language = this.lang === "ro" ? "ro-RO" : "en-US") {
    if (!globalThis.speechSynthesis || !globalThis.SpeechSynthesisUtterance) return;
    this.stopSpeaking();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.82;
    globalThis.speechSynthesis.speak(utterance);
  }

  render() {
    const c = this.copy;
    const active = this.activeTopic;
    const kidPlay = this.visible && this.age <= 5;
    const kidChallenge = kidPlay && this.screen === "challenge";
    document.body.classList.toggle("kid-play-mode", kidPlay);
    document.body.classList.toggle("kid-challenge-mode", kidChallenge);
    this.root.replaceChildren();
    this.root.lang = this.lang;
    const shell = node("div", "play-shell");
    const header = node("header", "play-header");
    const greeting = node("div");
    greeting.append(node("p", "play-eyebrow", "✦ LITTLE EXPLORERS"), node("h1", "", `${c.hello}, ${this.profile?.name || (this.lang === "ro" ? "exploratorule" : "explorer")}!`));
    const settings = node("div", "play-settings");
    const language = node("select");
    language.setAttribute("aria-label", "Play language / Limba jocului");
    language.append(new Option("English", "en"), new Option("Română", "ro"));
    language.value = this.lang;
    language.addEventListener("change", () => {
      this.lang = language.value;
      try { globalThis.localStorage.setItem("marble-taxonomy:play-language", this.lang); } catch { /* Optional preference. */ }
      this.stopSpeaking();
      this.render();
    });
    const voiceAvailable = Boolean(globalThis.speechSynthesis && globalThis.SpeechSynthesisUtterance);
    const voice = button(`🔊 ${this.voiceOn ? c.voiceOn : c.voiceOff}`, () => {
      this.voiceOn = !this.voiceOn;
      try { globalThis.localStorage.setItem("marble-taxonomy:play-voice", this.voiceOn ? "on" : "off"); } catch { /* Optional preference. */ }
      const speech = active ? this.spokenChallengeFor(active) : { text: this.age <= 5 ? c.kidPathIntro : c.pathIntro };
      if (this.voiceOn) this.speak(speech.text, speech.language);
      else this.stopSpeaking();
      voice.textContent = `🔊 ${this.voiceOn ? c.voiceOn : c.voiceOff}`;
      voice.setAttribute("aria-pressed", String(this.voiceOn));
    });
    voice.disabled = !voiceAvailable;
    voice.setAttribute("aria-pressed", String(this.voiceOn));
    settings.append(language, voice);
    if (kidPlay) settings.append(button(`🧑 ${c.grownupExit}`, this.onExit));
    header.append(greeting, settings);
    const score = node("p", "play-score", `⭐ ${this.stars} ${c.stars}`);
    score.setAttribute("aria-live", "polite");
    shell.append(header, score);
    this.stage = node("div", "play-stage");
    const parentNote = node("p", "play-parent-note", this.profile ? c.saved : c.guest);
    parentNote.hidden = kidPlay;
    shell.append(this.stage, parentNote);
    if (!voiceAvailable && !kidPlay) shell.append(node("p", "play-parent-note", c.unavailable));
    this.root.append(shell);
    if (this.screen === "challenge" && active) this.renderChallenge(active);
    else this.renderPath();
  }

  promptFor(topic) {
    if (topic.assessmentPrompt) return assessmentPromptFor(topic, this.profile?.name);
    const description = topic.description?.trim();
    return `${this.profile?.name ? `${this.profile.name}, ` : ""}show what you know about ${topic.name}${description ? `: ${description}` : "."}`;
  }

  missionPrompt(task) {
    return task.prompt?.[this.lang] ?? task.prompt?.en ?? "";
  }

  spokenChallengeFor(topic) {
    const assessment = childAssessmentFor(topic);
    const session = this.assessmentSessions.get(topic.id);
    const task = assessment.tasks[session?.completedTasks ?? 0];
    if (task) {
      const choices = Array.isArray(task.choices) ? task.choices.map(({ label }) => label[this.lang] ?? label.en).join(", ") : "";
      return {
        text: [this.missionPrompt(task), choices].filter(Boolean).join(" "),
        language: task.language ?? (task.prompt?.[this.lang] ? (this.lang === "ro" ? "ro-RO" : "en-US") : "en-US"),
      };
    }
    return { text: this.copy.missionsComplete, language: this.lang === "ro" ? "ro-RO" : "en-US" };
  }

  renderPath() {
    const c = this.copy;
    const kidPath = this.visible && this.age <= 5;
    const filters = node("div", "play-path-filters");
    const ageLabel = node("label", "play-filter-label", c.age);
    const age = node("select", "play-filter");
    age.setAttribute("aria-label", c.age);
    for (let value = Math.min(PRESCHOOL_MIN_AGE, this.taxonomy.minAge); value <= this.taxonomy.maxAge; value += 1) age.append(new Option(String(value), String(value)));
    age.value = String(this.age);
    age.addEventListener("change", () => {
      this.age = Number(age.value);
      this.subject = "";
      try { globalThis.localStorage.setItem("marble-taxonomy:play-age", String(this.age)); } catch { /* Optional preference. */ }
      this.availableLimit = this.age <= 5 ? 4 : 8;
      this.completedLimit = this.age <= 5 ? 4 : 6;
      this.lockedLimit = this.age <= 5 ? 4 : 6;
      this.selectedTopicId = null;
      this.render();
    });
    ageLabel.append(age);
    const subjectLabel = node("label", "play-filter-label", c.subject);
    const subject = node("select", "play-filter");
    subject.setAttribute("aria-label", c.subject);
    subject.append(new Option(c.allSubjects, ""));
    for (const name of this.taxonomy.subjects) subject.append(new Option(name, name));
    subject.value = this.subject;
    subject.addEventListener("change", () => {
      this.subject = subject.value;
      this.availableLimit = this.age <= 5 ? 4 : 8;
      this.completedLimit = this.age <= 5 ? 4 : 6;
      this.lockedLimit = this.age <= 5 ? 4 : 6;
      this.scrollToTop();
      this.render();
    });
    subjectLabel.append(subject);
    filters.append(ageLabel, subjectLabel);
    const parentSettings = node("details", "play-parent-settings");
    parentSettings.append(node("summary", "", `🧑 ${c.grownupSettings}`), filters);
    const pathSettings = kidPath ? parentSettings : filters;

    const world = CHILD_WORLDS[this.subject];
    const headingText = kidPath
      ? (world ? world[this.lang] : c.trailTitle)
      : c.pathTitle;
    const heading = node("h2", "play-instruction", headingText);
    const introText = kidPath ? (world ? `${world[this.lang]}!` : c.worldsIntro) : c.pathIntro;
    const intro = node("p", "play-path-intro", introText);
    const controls = node("div", "play-map-controls");
    controls.append(button(`🔊 ${c.listen}`, () => this.speak(introText)));
    if (kidPath && world) controls.append(button(`🗺️ ${c.allWorlds}`, () => {
      this.subject = "";
      this.availableLimit = 4;
      this.completedLimit = 4;
      this.lockedLimit = 4;
      this.scrollToTop();
      this.render();
    }));
    const board = node("div", "learning-path-board");
    if (kidPath) board.classList.add("kid-path-board");
    board.setAttribute("role", "group");
    board.setAttribute("aria-label", c.pathTitle);
    this.visiblePathNodes = new Map();
    const { available, locked, completed } = this.path;
    if (this.age === 3 && !available.length && !locked.length && !completed.length) {
      const empty = node("section", "age-three-empty");
      empty.append(node("span", "age-three-icon", "🌱"), node("h3", "", c.ageThreeTitle), node("p", "", c.ageThree));
      empty.append(button(c.tryAgeFour, () => {
        this.age = 4;
        try { globalThis.localStorage.setItem("marble-taxonomy:play-age", "4"); } catch { /* Optional preference. */ }
        this.render();
      }, "play-button age-three-next"));
      board.append(empty);
      this.stage.append(pathSettings, heading, intro, controls, board);
      return;
    }
    if (!available.length && !locked.length && !completed.length) board.append(node("p", "play-path-empty", c.noPath));
    // The constructor can render once before Play becomes the active view. Base
    // the initial page size on the child's age, not that first hidden render.
    this.availableLimit = this.availableLimit ?? (this.age <= 5 ? 4 : 8);
    this.lockedLimit = this.lockedLimit ?? (kidPath ? 4 : 6);
    this.completedLimit = this.completedLimit ?? (kidPath ? 4 : 6);
    this.pathBoard = board;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("path-connections");
    svg.setAttribute("aria-hidden", "true");
    board.append(svg);
    if (kidPath && !this.subject) {
      this.renderKidTrailHome(board, available);
      this.stage.append(pathSettings, heading, intro, controls, board);
      return;
    }
    if (kidPath) board.append(this.renderKidWorldProgress(available, locked, completed));
    const lanes = kidPath
      ? [
        ...(completed.length ? [{ state: "completed", topics: completed, limit: this.completedLimit, copy: c.done }] : []),
        { state: "available", topics: available, limit: this.availableLimit, copy: c.ready },
        { state: "locked", topics: locked, limit: this.lockedLimit, copy: c.locked },
      ]
      : [
        { state: "completed", topics: completed, limit: this.completedLimit, copy: c.done },
        { state: "available", topics: available, limit: this.availableLimit, copy: c.ready },
        { state: "locked", topics: locked, limit: this.lockedLimit, copy: c.locked },
      ];
    for (const laneData of lanes) {
      const lane = node("section", `path-lane path-lane-${laneData.state}`);
      const laneTitle = kidPath ? laneData.copy : `${laneData.copy} · ${Math.min(laneData.limit, laneData.topics.length)} / ${laneData.topics.length}`;
      lane.append(node("h3", "path-section-title", laneTitle));
      const list = node("div", `path-nodes path-${laneData.state}`);
      const visible = laneData.topics.slice(0, laneData.limit);
      for (const item of visible) {
        const topic = laneData.state === "locked" ? item.topic : item;
        const unmet = laneData.state === "locked" ? item.unmet : [];
        const pathNode = this.assignmentNode(topic, laneData.state, unmet);
        if (kidPath && laneData.state === "available" && topic.id === available[0]?.id) pathNode.classList.add("path-node-current");
        list.append(pathNode);
      }
      if (!visible.length) list.append(node("p", "path-lane-empty", laneData.state === "completed" ? c.waiting : c.noPath));
      lane.append(list);
      if (laneData.topics.length > laneData.limit) lane.append(button(c.more, () => {
        this[`${laneData.state}Limit`] += kidPath ? 4 : laneData.state === "available" ? 8 : 6;
        this.render();
      }, "play-button path-more"));
      board.append(lane);
    }
    this.stage.append(pathSettings, heading, intro, controls, board);
    requestAnimationFrame(() => this.drawPathLinks());
  }

  renderKidTrailHome(board, available) {
    const c = this.copy;
    if (available.length) {
      const next = node("section", "kid-continue-card");
      next.append(node("p", "play-eyebrow", `✨ ${c.continueTrail}`));
      const task = this.assignmentNode(available[0], "available");
      task.classList.add("path-node-current", "kid-continue-node");
      next.append(task);
      board.append(next);
    }

    const worlds = node("section", "kid-worlds");
    worlds.append(node("h3", "path-section-title", c.chooseWorld));
    const grid = node("div", "kid-world-grid");
    for (const subject of this.taxonomy.subjects) {
      const topicList = this.taxonomy.topics.filter((topic) =>
        topic.subject === subject && topic.ageRangeStart <= this.age && topic.ageRangeEnd >= this.age,
      );
      if (!topicList.length) continue;
      const completed = topicList.filter((topic) => pathComplete(this.profile?.progress ?? {}, topic.id)).length;
      const label = c.worldProgress.replace("{done}", String(completed)).replace("{total}", String(topicList.length));
      const definition = CHILD_WORLDS[subject] ?? { icon: "✨", en: subject, ro: subject };
      const card = button("", () => {
        this.subject = subject;
        this.availableLimit = 4;
        this.completedLimit = 4;
        this.lockedLimit = 4;
        this.scrollToTop();
        this.render();
      }, "kid-world-card");
      card.setAttribute("aria-pressed", "false");
      card.append(
        node("span", "kid-world-icon", definition.icon),
        node("strong", "kid-world-title", definition[this.lang]),
        node("span", "kid-world-count", label),
      );
      const progress = document.createElement("progress");
      progress.max = topicList.length;
      progress.value = completed;
      progress.setAttribute("aria-label", label);
      card.append(progress);
      grid.append(card);
    }
    worlds.append(grid);
    board.append(worlds);
  }

  renderKidWorldProgress(available, locked, completed) {
    const c = this.copy;
    const total = available.length + locked.length + completed.length;
    const label = c.worldProgress.replace("{done}", String(completed.length)).replace("{total}", String(total));
    const summary = node("section", "kid-world-progress");
    summary.append(node("strong", "", label));
    const progress = document.createElement("progress");
    progress.max = total || 1;
    progress.value = completed.length;
    progress.setAttribute("aria-label", label);
    summary.append(progress);
    return summary;
  }

  drawPathLinks() {
    if (!this.pathBoard?.isConnected || !this.visiblePathNodes?.size) return;
    const svg = this.pathBoard.querySelector(".path-connections");
    const bounds = this.pathBoard.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    svg.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
    svg.replaceChildren();
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    for (const [id, color] of [["path-arrow", "#548b60"], ["path-arrow-locked", "#bc932b"]]) {
      const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
      marker.setAttribute("id", id);
      marker.setAttribute("viewBox", "0 0 10 10");
      marker.setAttribute("refX", "9");
      marker.setAttribute("refY", "5");
      marker.setAttribute("markerWidth", "10");
      marker.setAttribute("markerHeight", "10");
      marker.setAttribute("orient", "auto-start-reverse");
      const arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
      arrow.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
      arrow.setAttribute("fill", color);
      marker.append(arrow);
      defs.append(marker);
    }
    svg.append(defs);
    for (const dependency of this.taxonomy.dependencies) {
      if (dependency.strength !== "hard") continue;
      const from = this.visiblePathNodes.get(dependency.prerequisiteId);
      const to = this.visiblePathNodes.get(dependency.topicId);
      if (!from || !to) continue;
      const fromBox = from.getBoundingClientRect();
      const toBox = to.getBoundingClientRect();
      const horizontal = !matchMedia("(max-width: 760px)").matches;
      const start = horizontal
        ? { x: fromBox.right - bounds.left, y: fromBox.top + fromBox.height / 2 - bounds.top }
        : { x: fromBox.left + fromBox.width / 2 - bounds.left, y: fromBox.bottom - bounds.top };
      const end = horizontal
        ? { x: toBox.left - bounds.left, y: toBox.top + toBox.height / 2 - bounds.top }
        : { x: toBox.left + toBox.width / 2 - bounds.left, y: toBox.top - bounds.top };
      const bend = Math.abs(horizontal ? end.x - start.x : end.y - start.y) * 0.42;
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", horizontal
        ? `M ${start.x} ${start.y} C ${start.x + bend} ${start.y}, ${end.x - bend} ${end.y}, ${end.x} ${end.y}`
        : `M ${start.x} ${start.y} C ${start.x} ${start.y + bend}, ${end.x} ${end.y - bend}, ${end.x} ${end.y}`);
      path.setAttribute("class", `path-edge${to.classList.contains("path-node-locked") ? " path-edge-locked" : ""}`);
      path.setAttribute("marker-end", `url(#${to.classList.contains("path-node-locked") ? "path-arrow-locked" : "path-arrow"})`);
      svg.append(path);
    }
  }

  assignmentNode(topic, state, unmet = []) {
    const c = this.copy;
    const practiced = state === "completed" && this.profile?.progress?.[topic.id]?.status === "practiced";
    const item = node(state === "locked" ? "div" : "button", `path-node path-node-${state}${practiced ? " path-node-practiced" : ""}`);
    if (item instanceof HTMLButtonElement) {
      item.type = "button";
      item.addEventListener("click", () => {
        if (!this.profile) {
          this.onNeedProfile();
          return;
        }
        this.selectedTopicId = topic.id;
        this.screen = "challenge";
        this.scrollToTop();
        this.render();
        if (this.voiceOn) {
          const speech = this.spokenChallengeFor(topic);
          this.speak(speech.text, speech.language);
        }
      });
    } else item.setAttribute("aria-disabled", "true");
    this.visiblePathNodes.set(topic.id, item);
    const icon = state === "available"
      ? preschoolIconFor(topic)
      : state === "completed" ? (practiced ? "⭐" : "✓") : "🔒";
    item.append(node("span", "path-node-icon", icon));
    const details = node("span", "path-node-details");
    details.append(node("strong", "", childTopicName(topic, this.lang)));
    if (!(this.visible && this.age <= 5)) details.append(node("small", "", `${topic.subject} · ages ${topic.ageRangeStart}–${topic.ageRangeEnd}`));
    if (state === "locked" && unmet.length) details.append(node("small", "path-prerequisite", `${c.prerequisite} ${unmet.slice(0, 2).map(({ topic: prerequisite }) => childTopicName(prerequisite, this.lang)).join(", ")}${unmet.length > 2 ? ` +${unmet.length - 2}` : ""}`));
    const stateLabel = state === "available"
      ? (this.visible && this.age <= 5 ? c.continueAction : c.play)
      : state === "completed" ? (practiced ? c.practiced : c.completed) : c.lockedLabel;
    item.append(details, node("span", "path-node-state", stateLabel));
    return item;
  }

  finishChildAssessment(topic, assessment) {
    if (!this.profile) {
      this.onNeedProfile();
      return;
    }

    const evidence = assessment.kind === "choice"
      ? [...new Set(assessment.tasks.flatMap(({ evidenceIndexes, evidenceIndex }) =>
        evidenceIndexes ?? (Number.isInteger(evidenceIndex) ? [evidenceIndex] : []),
      ))]
      : [];

    const session = this.assessmentSessions.get(topic.id);
    const countingTask = assessment.tasks.find(({ interaction }) => interaction?.kind === "tap-each");
    const observation = countingTask && session?.counting ? {
      kind: "counting",
      objectKind: countingTask.interaction.objectLabel?.en ?? "object",
      objectCount: countingTask.interaction.count,
      uniqueTaps: session.counting.tappedObjectIndexes.length,
      revisitTaps: session.counting.revisitTaps,
      answers: session.counting.answers,
      responseMs: session.counting.responseMs,
    } : undefined;

    this.assessmentSessions.delete(topic.id);
    this.screen = "path";
    this.selectedTopicId = null;
    this.stars += 1;
    if (assessment.kind === "choice") this.onAssess(topic.id, evidence);
    else this.onPractice(topic.id, observation);
    this.onCelebrate();
    this.scrollToTop();
    this.render();
    if (this.voiceOn) this.speak(this.copy.success);
  }

  advanceMission(topic, session, successText) {
    session.completedTasks += 1;
    session.selectedChoices = [];
    session.selectedMode = null;
    session.feedback = { success: true, text: successText };
    this.render();
    if (this.voiceOn) {
      const next = this.spokenChallengeFor(topic);
      this.speak([successText, next.text].filter(Boolean).join(" "), next.language);
    }
  }

  renderChildAssessment(topic, assessment) {
    const c = this.copy;
    let session = this.assessmentSessions.get(topic.id);
    if (!session) {
      session = newAssessmentSession(assessment);
      this.assessmentSessions.set(topic.id, session);
    }

    const card = node("section", "child-assessment preschool-challenge");
    const task = assessment.tasks[session.completedTasks];
    card.setAttribute("aria-label", c.childChallenge);
    const header = node("div", "preschool-challenge-hero");
    header.append(node("span", "preschool-challenge-icon", assessment.icon ?? preschoolIconFor(topic)));
    const intro = node("div", "preschool-challenge-copy");
    intro.append(
      node("p", "play-eyebrow", c.childChallenge),
      node("p", "preschool-hint", !task
        ? c.missionCompleteHint
        : task.interaction?.kind === "tap-each"
          ? c.countingGameHint
          : assessment.kind === "guided" ? c.guidedHint : assessment.kind === "practice-game" ? c.practiceGameHint : c.assessmentHint),
    );
    header.append(intro);
    card.append(header);

    const completed = session.completedTasks;
    card.append(this.renderMissionTrail(assessment.tasks.length, completed));
    if (!task) {
      card.append(node("p", "child-assessment-progress", `⭐ ${assessment.tasks.length} / ${assessment.tasks.length}`));
      card.append(node("h4", "preschool-question", c.missionsComplete));
      const stars = node("div", "child-assessment-stars");
      for (const _task of assessment.tasks) stars.append(node("span", "", "⭐"));
      card.append(stars);
      const finishLabel = assessment.kind === "choice" ? c.finishQuiz : c.finishMissions;
      card.append(button(finishLabel, () => this.finishChildAssessment(topic, assessment), "play-button play-finish"));
      return card;
    }

    if (task.interaction?.kind === "tap-each") {
      card.append(this.renderCountingTask(task, session));
      return card;
    }

    const taskNumber = completed + 1;
    card.append(node("p", "child-assessment-progress", `${c.mission} ${taskNumber} / ${assessment.tasks.length} · ⭐ ${completed} / ${assessment.tasks.length}`));
    card.append(node("h4", "preschool-question", this.missionPrompt(task)));
    if (this.lang === "ro" && task.language === "en-US") card.append(node("p", "assignment-language-note", c.sourceEnglish));
    if (session.feedback) {
      const previousFeedback = node("p", "preschool-feedback child-assessment-feedback", session.feedback.text);
      previousFeedback.classList.toggle("preschool-feedback-success", session.feedback.success);
      previousFeedback.setAttribute("role", "status");
      previousFeedback.setAttribute("aria-live", "polite");
      card.append(previousFeedback);
    }

    if (assessment.kind === "guided") {
      card.append(node("p", "child-observation-instruction", c.chooseResponseMode));
      const modes = node("div", "preschool-choice-grid mission-response-modes");
      for (const mode of c.responseModes) {
        const option = button("", () => {
          session.selectedMode = mode.id;
          for (const candidate of modes.querySelectorAll("button")) {
            const selected = candidate.dataset.mode === mode.id;
            candidate.setAttribute("aria-pressed", String(selected));
            candidate.classList.toggle("preschool-choice-selected", selected);
          }
          ready.disabled = false;
        }, "preschool-choice mission-response-mode");
        option.dataset.mode = mode.id;
        option.append(node("span", "preschool-choice-icon", mode.icon), node("span", "preschool-choice-label", mode.label));
        option.setAttribute("aria-pressed", String(session.selectedMode === mode.id));
        option.classList.toggle("preschool-choice-selected", session.selectedMode === mode.id);
        modes.append(option);
      }
      const ready = button(c.readyToShow, () => {
        this.advanceMission(topic, session, c.practicePass);
      }, "play-button play-finish child-assessment-check");
      ready.disabled = !session.selectedMode;
      card.append(modes, ready);
      return card;
    }

    if (task.select === "multiple") card.append(node("p", "preschool-hint child-assessment-instruction", c.chooseAtLeast));

    const choices = node("div", "preschool-choice-grid child-assessment-choices");
    const displayChoices = session.choiceOrders[session.completedTasks].map((index) => task.choices[index]);
    const feedback = node("p", "preschool-feedback child-assessment-feedback");
    feedback.setAttribute("role", "status");
    feedback.setAttribute("aria-live", "polite");
    const choiceButtons = displayChoices.map((choice, index) => {
      const option = node("button", "preschool-choice");
      option.type = "button";
      option.setAttribute("aria-pressed", String(session.selectedChoices.includes(index)));
      option.append(node("span", "preschool-choice-icon", choice.icon), node("span", "preschool-choice-label", choice.label[this.lang]));
      option.classList.toggle("preschool-choice-selected", session.selectedChoices.includes(index));
      option.classList.toggle("preschool-choice-incorrect", session.selectedChoices.includes(index) && session.feedback?.success === false);
      option.addEventListener("click", () => {
        const selected = new Set(session.selectedChoices);
        if (task.select === "single") {
          selected.clear();
          selected.add(index);
          session.selectedChoices = [...selected];
          for (const [candidateIndex, candidate] of choiceButtons.entries()) {
            const pressed = candidateIndex === index;
            candidate.setAttribute("aria-pressed", String(pressed));
            candidate.classList.toggle("preschool-choice-selected", pressed);
            candidate.classList.toggle("preschool-choice-correct", pressed && displayChoices[index]?.correct === true);
            candidate.classList.toggle("preschool-choice-incorrect", pressed && displayChoices[index]?.correct !== true);
          }
          if (displayChoices[index]?.correct === true) {
            this.advanceMission(topic, session, c.missionPass);
          } else {
            session.feedback = { success: false, text: c.missionRetry };
            feedback.textContent = c.missionRetry;
            feedback.classList.remove("preschool-feedback-success");
            if (this.voiceOn) this.speak(c.missionRetry);
          }
          return;
        } else if (selected.has(index)) selected.delete(index);
        else selected.add(index);
        session.selectedChoices = [...selected];
        session.feedback = null;
        for (const [candidateIndex, candidate] of choiceButtons.entries()) {
          const pressed = selected.has(candidateIndex);
          candidate.setAttribute("aria-pressed", String(pressed));
          candidate.classList.toggle("preschool-choice-selected", pressed);
        }
        feedback.textContent = "";
        feedback.classList.remove("preschool-feedback-success");
        if (task.select === "multiple") checkAnswer.disabled = selected.size < (task.requiredCount ?? 1);
      });
      choices.append(option);
      return option;
    });

    const checkAnswer = button(c.missionCheck, () => {
      const enoughChoices = session.selectedChoices.length >= (task.requiredCount ?? 1);
      const allCorrect = enoughChoices && session.selectedChoices.every((index) => displayChoices[index]?.correct === true);
      if (!allCorrect) {
        session.feedback = { success: false, text: c.missionRetry };
        feedback.textContent = c.missionRetry;
        feedback.classList.remove("preschool-feedback-success");
        if (this.voiceOn) this.speak(c.missionRetry);
        return;
      }

      this.advanceMission(topic, session, c.missionPass);
    }, "play-button play-finish child-assessment-check");
    checkAnswer.disabled = session.selectedChoices.length < (task.requiredCount ?? 1);
    card.append(choices, feedback);
    if (task.select === "multiple") card.append(checkAnswer);
    return card;
  }

  renderCountingTask(task, session) {
    const c = this.copy;
    const interaction = task.interaction;
    const total = interaction.count;
    const state = session.counting ??= {
      tappedObjectIndexes: [],
      revisitTaps: 0,
      answers: [],
      questionStartedAt: null,
      responseMs: null,
    };
    const tapped = new Set(state.tappedObjectIndexes);
    const allMoved = tapped.size === total;
    if (allMoved && state.questionStartedAt === null) state.questionStartedAt = Date.now();

    const stage = node("section", "counting-stage");
    stage.append(node("h4", "preschool-question", allMoved ? this.missionPrompt(task) : interaction.instruction[this.lang]));
    const board = node("div", "counting-board");
    const source = node("div", "counting-source");
    source.setAttribute("role", "group");
    source.setAttribute("aria-label", c.countingObjects);
    const destination = interaction.destination[this.lang];
    let objectIndex = 0;

    for (const [groupIndex, groupCount] of interaction.groups.entries()) {
      const group = node("div", "counting-source-group");
      for (let index = 0; index < groupCount; index += 1) {
        const currentIndex = objectIndex++;
        if (tapped.has(currentIndex)) {
          const placeholder = node("span", "counting-object-placeholder");
          placeholder.setAttribute("aria-hidden", "true");
          group.append(placeholder);
          continue;
        }
        const object = button(interaction.objectIcon, () => {
          state.tappedObjectIndexes.push(currentIndex);
          this.render();
        }, "counting-object counting-object-source-item");
        object.setAttribute("aria-label", `${c.moveObject} ${interaction.objectLabel[this.lang]} ${currentIndex + 1} ${this.lang === "ro" ? "în" : "to"} ${destination}`);
        group.append(object);
      }
      source.append(group);
      if (groupIndex < interaction.groups.length - 1) source.append(node("span", "counting-group-plus", "+"));
    }
    board.append(source, node("span", "counting-drive-arrow", "➜"));

    const destinationArea = node("section", "counting-destination");
    destinationArea.setAttribute("aria-label", destination);
    destinationArea.append(node("strong", "counting-destination-title", `${interaction.destinationIcon} ${destination}`));
    const movedItems = node("div", "counting-destination-items");
    for (let index = 0; index < total; index += 1) {
      if (!tapped.has(index)) continue;
      const object = allMoved
        ? button(interaction.objectIcon, () => {
          state.revisitTaps += 1;
          state.lastRevisited = index;
          this.render();
        }, `counting-object counting-object-destination-item${state.lastRevisited === index ? " counting-object-revisited" : ""}`)
        : node("span", "counting-object counting-object-destination-item", interaction.objectIcon);
      if (allMoved) object.setAttribute("aria-label", `${c.revisitObject}: ${interaction.objectLabel[this.lang]} ${index + 1}`);
      movedItems.append(object);
    }
    destinationArea.append(movedItems);
    board.append(destinationArea);
    stage.append(board);

    if (!allMoved) return stage;

    stage.append(node("p", "counting-ready-note", c.allMoved));
    const answers = node("div", "preschool-choice-grid counting-answer-grid");
    const displayChoices = session.choiceOrders[session.completedTasks].map((index) => task.choices[index]);
    for (const choice of displayChoices) {
      const option = button("", () => {
        state.answers.push(choice.value);
        if (choice.correct) {
          state.responseMs = Date.now() - state.questionStartedAt;
          this.advanceMission(this.activeTopic, session, c.missionPass);
          return;
        }
        session.feedback = { success: false, text: c.missionRetry };
        this.render();
        if (this.voiceOn) this.speak(c.missionRetry);
      }, "preschool-choice counting-answer");
      option.append(node("span", "preschool-choice-icon", choice.icon), node("span", "preschool-choice-label", choice.label[this.lang]));
      option.setAttribute("aria-label", choice.label[this.lang]);
      answers.append(option);
    }
    stage.append(answers);
    if (session.feedback) {
      const feedback = node("p", "preschool-feedback child-assessment-feedback", session.feedback.text);
      feedback.setAttribute("role", "status");
      feedback.setAttribute("aria-live", "polite");
      stage.append(feedback);
    }
    return stage;
  }

  renderMissionTrail(total, completed) {
    const c = this.copy;
    const steps = node("ol", "mission-trail");
    steps.setAttribute("aria-label", c.trailSteps);
    for (let index = 0; index < total; index += 1) {
      const state = index < completed ? "completed" : index === completed ? "current" : "upcoming";
      const step = node("li", `mission-trail-step mission-trail-${state}`);
      const label = state === "completed" ? c.stepComplete : state === "current" ? c.stepCurrent : c.stepUpcoming;
      step.setAttribute("aria-label", `${c.mission} ${index + 1}: ${label}`);
      if (state === "current") step.setAttribute("aria-current", "step");
      step.append(node("span", "mission-trail-marker", state === "completed" ? "✓" : String(index + 1)));
      steps.append(step);
    }
    return steps;
  }

  renderChallenge(topic) {
    const c = this.copy;
    const toolbar = node("div", "play-activity-bar");
    const speech = this.spokenChallengeFor(topic);
    toolbar.append(button(`← ${c.back}`, () => { this.screen = "path"; this.scrollToTop(); this.render(); }), button(`🔊 ${c.listen}`, () => this.speak(speech.text, speech.language)));
    const heading = node("h2", "play-instruction", c.challenge);
    const topicHeading = node("h3", "assignment-topic", childTopicName(topic, this.lang));
    const metadata = node("p", "assignment-meta", `${topic.subject} · ages ${topic.ageRangeStart}–${topic.ageRangeEnd}`);
    const assessment = childAssessmentFor(topic);
    const childActivity = this.renderChildAssessment(topic, assessment);
    const promptCard = node("details", "grownup-original");
    promptCard.append(node("summary", "", `🧑‍🧑‍🧒 ${c.grownupOriginal}`));
    promptCard.append(node("p", "assignment-question", this.promptFor(topic)), node("p", "assignment-language-note", c.sourceEnglish));

    const nextTopics = (this.taxonomy.unlocks.get(topic.id) ?? [])
      .filter(({ strength, topic: next }) => strength === "hard" && next && (next.ageRangeStart <= this.age && next.ageRangeEnd >= this.age))
      .map(({ topic: next }) => next)
      .filter((next) => hardPrerequisites(this.taxonomy, next.id)
        .every(({ prerequisiteId }) => prerequisiteId === topic.id || pathComplete(this.profile?.progress ?? {}, prerequisiteId)))
      .slice(0, 3);
    const unlockPreview = node("section", "assignment-unlocks");
    unlockPreview.append(node("strong", "", nextTopics.length ? c.unlocks : c.waiting));
    if (nextTopics.length) {
      const list = node("ul");
      for (const next of nextTopics) list.append(node("li", "", childTopicName(next, this.lang)));
      unlockPreview.append(list);
    }

    this.stage.append(toolbar, heading, topicHeading, metadata);
    this.stage.append(childActivity, promptCard, unlockPreview);
  }
}
