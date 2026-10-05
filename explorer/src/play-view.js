import { assessmentPromptFor } from "./taxonomy.js";
import { childAssessmentFor } from "./child-assessments.js?v=assignment-path-6";
import { preschoolActivityFor, preschoolIconFor } from "./preschool-activities.js";

const PRESCHOOL_MIN_AGE = 3;

const COPY = {
  en: {
    hello: "Ready to explore", voiceOff: "Voice off", voiceOn: "Voice on", listen: "Listen",
    age: "I'm learning at age", subject: "Choose a subject", allSubjects: "All subjects",
    pathTitle: "Your learning path", pathIntro: "Pick a glowing challenge. Finish one to open more of the path! Practice is not a test.",
    ready: "Ready to play", locked: "Coming up", done: "Done for now", practiced: "Practised", more: "Show more challenges",
    play: "Play this challenge", back: "Back to my path", challenge: "Your quick assignment",
    childChallenge: "A little learning mission", preschoolHint: "Pick a picture, then tell or show what you noticed.",
    pictureWarmup: "Bonus picture warm-up (optional)",
    tapPicture: "Tap a big picture", tellIt: "I can say it", pointToIt: "I can point", showWithToys: "I can show it with toys",
    childFallback: "Try this little challenge. Say, point, or show what you know.",
    foundIt: "You found it! Nice choice.", goodTry: "Good try! Choose again, or listen to the challenge.",
    childReady: "Nice choice! Now give it a try.", grownupOriginal: "Grown-up: original assignment",
    mission: "Mission", missionCheck: "Check my answer!", missionPass: "Nice thinking! You got this part!", missionRetry: "Not quite. Look again and try another answer.",
    assessmentHint: "Choose the picture that answers the question. Tap Check when you're ready.", guidedHint: "Try the challenge by saying it, pointing, drawing, or using toys. No grown-up check needed.",
    chooseResponseMode: "How will you try it? Pick one!",
    responseModes: [{ id: "say", icon: "🗣️", label: "Say it" }, { id: "point", icon: "👆", label: "Point to it" }, { id: "show", icon: "🧸", label: "Show with toys" }, { id: "draw", icon: "🎨", label: "Draw it" }],
    readyToShow: "I tried it!", practicePass: "Nice work trying! This mission counts as practice, not a test.",
    missionsComplete: "You did every mission!", finishMissions: "Save my practice & unlock the next challenge", chooseAtLeast: "Pick at least two pictures, then check.",
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
    pathTitle: "Drumul tău de învățare", pathIntro: "Alege o provocare luminoasă. Termină una ca să deschizi altele! Exersarea nu este un test.",
    ready: "Gata de joacă", locked: "Urmează", done: "Gata pentru acum", practiced: "Am exersat", more: "Arată mai multe provocări",
    play: "Joacă această provocare", back: "Înapoi la drum", challenge: "Provocarea ta rapidă",
    childChallenge: "O misiune de învățare", preschoolHint: "Alege o imagine, apoi spune sau arată ce ai observat.",
    pictureWarmup: "Joc bonus cu imagini (opțional)",
    tapPicture: "Atinge o imagine", tellIt: "Îi spun adultului", pointToIt: "Arăt cu degetul", showWithToys: "Arăt cu jucării",
    childFallback: "Încearcă această provocare. Spune, arată cu degetul sau folosește jucării.",
    foundIt: "Ai găsit! Ai ales bine.", goodTry: "Bravo că ai încercat! Alege din nou sau ascultă provocarea.",
    childReady: "Ai ales! Acum încearcă.", grownupOriginal: "Pentru adult: provocarea originală",
    mission: "Misiunea", missionCheck: "Verifică răspunsul!", missionPass: "Bravo! Ai rezolvat această parte!", missionRetry: "Nu chiar. Uită-te din nou și mai încearcă.",
    assessmentHint: "Alege imaginea care răspunde la întrebare. Apasă Verifică atunci când ești gata.", guidedHint: "Încearcă provocarea: spune, arată, desenează sau folosește jucării. Nu ai nevoie de verificarea unui adult.",
    chooseResponseMode: "Cum vrei să încerci? Alege una!",
    responseModes: [{ id: "say", icon: "🗣️", label: "Spune" }, { id: "point", icon: "👆", label: "Arată cu degetul" }, { id: "show", icon: "🧸", label: "Arată cu jucării" }, { id: "draw", icon: "🎨", label: "Desenează" }],
    readyToShow: "Am încercat!", practicePass: "Bravo că ai încercat! Misiunea înseamnă exersare, nu test.",
    missionsComplete: "Ai terminat toate misiunile!", finishMissions: "Salvează exersarea și deschide următoarea provocare", chooseAtLeast: "Alege cel puțin două imagini, apoi verifică.",
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
  constructor(root, { taxonomy, onAssess, onPractice, onNeedProfile, onCelebrate }) {
    this.root = root;
    this.taxonomy = taxonomy;
    this.onAssess = onAssess;
    this.onPractice = onPractice;
    this.onNeedProfile = onNeedProfile;
    this.onCelebrate = onCelebrate;
    this.lang = "en";
    this.age = 5;
    this.subject = "";
    this.stars = 0;
    this.screen = "path";
    this.selectedTopicId = null;
    this.voiceOn = false;
    try {
      const savedLanguage = globalThis.localStorage.getItem("marble-taxonomy:play-language");
      if (savedLanguage === "ro" || savedLanguage === "en") this.lang = savedLanguage;
      const savedAge = Number(globalThis.localStorage.getItem("marble-taxonomy:play-age"));
      if (Number.isInteger(savedAge) && savedAge >= PRESCHOOL_MIN_AGE && savedAge <= taxonomy.maxAge) this.age = savedAge;
    } catch { /* Playing still works when browser storage is unavailable. */ }
    this.profile = null;
    this.progressKey = "";
    this.activityResponses = new Map();
    this.assessmentSessions = new Map();
    globalThis.addEventListener("resize", () => this.drawPathLinks());
    this.render();
    document.addEventListener("visibilitychange", () => { if (document.hidden) this.stopSpeaking(); });
  }

  get copy() { return COPY[this.lang]; }
  get activeTopic() { return this.taxonomy.byId.get(this.selectedTopicId); }
  get path() { return getPlayPath(this.taxonomy, this.profile?.progress ?? {}, this.age, this.subject); }

  setProfile(profile) {
    const progressKey = JSON.stringify(Object.entries(profile?.progress ?? {}).map(([id, entry]) => [id, entry.status, entry.assessment?.verified]).sort());
    const changed = this.profile?.id !== profile?.id || this.profile?.name !== profile?.name || this.progressKey !== progressKey;
    if (this.profile?.id && this.profile.id !== profile?.id) {
      this.activityResponses.clear();
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
      const speech = active ? this.spokenChallengeFor(active) : { text: c.pathIntro };
      if (this.voiceOn) this.speak(speech.text, speech.language);
      else this.stopSpeaking();
      voice.textContent = `🔊 ${this.voiceOn ? c.voiceOn : c.voiceOff}`;
      voice.setAttribute("aria-pressed", String(this.voiceOn));
    });
    voice.disabled = !voiceAvailable;
    voice.setAttribute("aria-pressed", String(this.voiceOn));
    settings.append(language, voice);
    header.append(greeting, settings);
    const score = node("p", "play-score", `⭐ ${this.stars} ${c.stars}`);
    score.setAttribute("aria-live", "polite");
    shell.append(header, score);
    this.stage = node("div", "play-stage");
    shell.append(this.stage, node("p", "play-parent-note", this.profile ? c.saved : c.guest));
    if (!voiceAvailable) shell.append(node("p", "play-parent-note", c.unavailable));
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
    const prompt = task.prompt?.[this.lang] ?? task.prompt?.en ?? "";
    const name = this.profile?.name;
    return name && !prompt.includes(name) ? `${name}, ${prompt}` : prompt;
  }

  spokenChallengeFor(topic) {
    const assessment = childAssessmentFor(topic, this.profile?.name);
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
    const filters = node("div", "play-path-filters");
    const ageLabel = node("label", "play-filter-label", c.age);
    const age = node("select", "play-filter");
    age.setAttribute("aria-label", c.age);
    for (let value = Math.min(PRESCHOOL_MIN_AGE, this.taxonomy.minAge); value <= this.taxonomy.maxAge; value += 1) age.append(new Option(String(value), String(value)));
    age.value = String(this.age);
    age.addEventListener("change", () => {
      this.age = Number(age.value);
      try { globalThis.localStorage.setItem("marble-taxonomy:play-age", String(this.age)); } catch { /* Optional preference. */ }
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
    subject.addEventListener("change", () => { this.subject = subject.value; this.render(); });
    subjectLabel.append(subject);
    filters.append(ageLabel, subjectLabel);

    const heading = node("h2", "play-instruction", c.pathTitle);
    const intro = node("p", "play-path-intro", c.pathIntro);
    const controls = node("div", "play-map-controls");
    controls.append(button(`🔊 ${c.listen}`, () => this.speak(c.pathIntro)));
    const board = node("div", "learning-path-board");
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
      this.stage.append(filters, heading, intro, controls, board);
      return;
    }
    if (!available.length && !locked.length && !completed.length) board.append(node("p", "play-path-empty", c.noPath));
    this.availableLimit = this.availableLimit ?? 8;
    this.lockedLimit = this.lockedLimit ?? 6;
    this.completedLimit = this.completedLimit ?? 6;
    this.pathBoard = board;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("path-connections");
    svg.setAttribute("aria-hidden", "true");
    board.append(svg);
    const lanes = [
      { state: "completed", topics: completed, limit: this.completedLimit, copy: c.done },
      { state: "available", topics: available, limit: this.availableLimit, copy: c.ready },
      { state: "locked", topics: locked, limit: this.lockedLimit, copy: c.locked },
    ];
    for (const laneData of lanes) {
      const lane = node("section", `path-lane path-lane-${laneData.state}`);
      lane.append(node("h3", "path-section-title", `${laneData.copy} · ${Math.min(laneData.limit, laneData.topics.length)} / ${laneData.topics.length}`));
      const list = node("div", `path-nodes path-${laneData.state}`);
      const visible = laneData.topics.slice(0, laneData.limit);
      for (const item of visible) {
        const topic = laneData.state === "locked" ? item.topic : item;
        const unmet = laneData.state === "locked" ? item.unmet : [];
        list.append(this.assignmentNode(topic, laneData.state, unmet));
      }
      if (!visible.length) list.append(node("p", "path-lane-empty", laneData.state === "completed" ? c.waiting : c.noPath));
      lane.append(list);
      if (laneData.topics.length > laneData.limit) lane.append(button(c.more, () => {
        this[`${laneData.state}Limit`] += laneData.state === "available" ? 8 : 6;
        this.render();
      }, "play-button path-more"));
      board.append(lane);
    }
    this.stage.append(filters, heading, intro, controls, board);
    requestAnimationFrame(() => this.drawPathLinks());
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
    details.append(node("strong", "", topic.name), node("small", "", `${topic.subject} · ages ${topic.ageRangeStart}–${topic.ageRangeEnd}`));
    if (state === "locked" && unmet.length) details.append(node("small", "path-prerequisite", `${c.prerequisite} ${unmet.slice(0, 2).map(({ topic: prerequisite }) => prerequisite?.name ?? "another challenge").join(", ")}${unmet.length > 2 ? ` +${unmet.length - 2}` : ""}`));
    item.append(details, node("span", "path-node-state", state === "available" ? c.play : state === "completed" ? (practiced ? c.practiced : c.completed) : c.lockedLabel));
    return item;
  }

  renderPreschoolActivity(topic, onResponse) {
    const c = this.copy;
    const activity = preschoolActivityFor(topic);
    const card = node("section", "preschool-challenge");
    card.setAttribute("aria-label", c.pictureWarmup);
    const hero = node("div", "preschool-challenge-hero");
    hero.append(node("span", "preschool-challenge-icon", preschoolIconFor(topic)));
    const intro = node("div", "preschool-challenge-copy");
    intro.append(node("p", "play-eyebrow", c.pictureWarmup), node("p", "preschool-hint", c.preschoolHint));
    hero.append(intro);
    card.append(hero);

    if (activity) {
      card.append(node("h4", "preschool-question", activity.prompt[this.lang]));
      const choices = node("div", "preschool-choice-grid");
      const feedback = node("p", "preschool-feedback");
      feedback.setAttribute("role", "status");
      feedback.setAttribute("aria-live", "polite");
      const response = this.activityResponses.get(topic.id);
      const choiceButtons = activity.choices.map((choice, index) => {
        const option = node("button", "preschool-choice");
        option.type = "button";
        option.setAttribute("aria-pressed", String(response?.kind === "choice" && response.index === index));
        option.append(node("span", "preschool-choice-icon", choice.icon), node("span", "preschool-choice-label", choice.label[this.lang]));
        option.addEventListener("click", () => {
          this.activityResponses.set(topic.id, { kind: "choice", index });
          choiceButtons.forEach((candidate, candidateIndex) => {
            const selected = candidateIndex === index;
            candidate.setAttribute("aria-pressed", String(selected));
            candidate.classList.toggle("preschool-choice-selected", selected);
            candidate.classList.toggle("preschool-choice-correct", selected && Boolean(choice.correct));
          });
          feedback.textContent = choice.correct ? c.foundIt : c.goodTry;
          feedback.classList.toggle("preschool-feedback-success", Boolean(choice.correct));
          onResponse();
          if (this.voiceOn) this.speak(choice.correct ? c.foundIt : c.goodTry);
        });
        const selected = response?.kind === "choice" && response.index === index;
        option.classList.toggle("preschool-choice-selected", selected);
        option.classList.toggle("preschool-choice-correct", selected && Boolean(choice.correct));
        choices.append(option);
        return option;
      });
      card.append(choices, feedback);
      if (response?.kind === "choice") {
        const chosen = activity.choices[response.index];
        if (chosen) {
          feedback.textContent = chosen.correct ? c.foundIt : c.goodTry;
          feedback.classList.toggle("preschool-feedback-success", Boolean(chosen.correct));
        }
      }
      return card;
    }

    card.append(node("h4", "preschool-question", topic.name), node("p", "preschool-hint", c.childFallback));
    const ways = node("div", "preschool-choice-grid preschool-response-modes");
    const feedback = node("p", "preschool-feedback");
    feedback.setAttribute("role", "status");
    feedback.setAttribute("aria-live", "polite");
    const response = this.activityResponses.get(topic.id);
    const modes = [
      { id: "say", icon: "🗣️", label: c.tellIt },
      { id: "point", icon: "👆", label: c.pointToIt },
      { id: "show", icon: "🧸", label: c.showWithToys },
    ];
    for (const mode of modes) {
      const option = node("button", "preschool-choice preschool-mode-choice");
      option.type = "button";
      option.setAttribute("aria-pressed", String(response?.kind === "mode" && response.mode === mode.id));
      option.append(node("span", "preschool-choice-icon", mode.icon), node("span", "preschool-choice-label", mode.label));
      option.addEventListener("click", () => {
        this.activityResponses.set(topic.id, { kind: "mode", mode: mode.id });
        for (const candidate of ways.querySelectorAll(".preschool-choice")) {
          const selected = candidate === option;
          candidate.setAttribute("aria-pressed", String(selected));
          candidate.classList.toggle("preschool-choice-selected", selected);
        }
        feedback.textContent = c.childReady;
        onResponse();
      });
      const selected = response?.kind === "mode" && response.mode === mode.id;
      option.classList.toggle("preschool-choice-selected", selected);
      ways.append(option);
    }
    if (response?.kind === "mode") feedback.textContent = c.childReady;
    card.append(ways, feedback);
    return card;
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

    this.activityResponses.delete(topic.id);
    this.assessmentSessions.delete(topic.id);
    this.screen = "path";
    this.selectedTopicId = null;
    this.stars += 1;
    if (assessment.kind === "choice") this.onAssess(topic.id, evidence);
    else this.onPractice(topic.id);
    this.onCelebrate();
    this.scrollToTop();
    this.render();
    if (this.voiceOn) this.speak(this.copy.success);
  }

  renderChildAssessment(topic, assessment) {
    const c = this.copy;
    let session = this.assessmentSessions.get(topic.id);
    if (!session) {
      session = newAssessmentSession(assessment);
      this.assessmentSessions.set(topic.id, session);
    }

    const card = node("section", "child-assessment preschool-challenge");
    card.setAttribute("aria-label", c.childChallenge);
    const header = node("div", "preschool-challenge-hero");
    header.append(node("span", "preschool-challenge-icon", assessment.icon ?? preschoolIconFor(topic)));
    const intro = node("div", "preschool-challenge-copy");
    intro.append(
      node("p", "play-eyebrow", c.childChallenge),
      node("p", "preschool-hint", assessment.kind === "choice" ? c.assessmentHint : c.guidedHint),
    );
    header.append(intro);
    card.append(header);

    const completed = session.completedTasks;
    const task = assessment.tasks[session.completedTasks];
    if (!task) {
      card.append(node("p", "child-assessment-progress", `⭐ ${assessment.tasks.length} / ${assessment.tasks.length}`));
      card.append(node("h4", "preschool-question", c.missionsComplete));
      const stars = node("div", "child-assessment-stars");
      for (const _task of assessment.tasks) stars.append(node("span", "", "⭐"));
      card.append(stars);
      card.append(button(c.finishMissions, () => this.finishChildAssessment(topic, assessment), "play-button play-finish"));
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
        session.completedTasks += 1;
        session.selectedMode = null;
        session.feedback = { success: true, text: c.practicePass };
        this.render();
        if (this.voiceOn) this.speak(c.practicePass);
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
      option.addEventListener("click", () => {
        const selected = new Set(session.selectedChoices);
        if (task.select === "single") {
          selected.clear();
          selected.add(index);
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
        checkAnswer.disabled = selected.size < (task.requiredCount ?? 1);
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

      session.completedTasks += 1;
      session.selectedChoices = [];
      session.feedback = { success: true, text: c.missionPass };
      if (this.voiceOn) this.speak(c.missionPass);
      this.render();
    }, "play-button play-finish child-assessment-check");
    checkAnswer.disabled = session.selectedChoices.length < (task.requiredCount ?? 1);
    card.append(choices, feedback, checkAnswer);
    return card;
  }

  renderChallenge(topic) {
    const c = this.copy;
    const toolbar = node("div", "play-activity-bar");
    const speech = this.spokenChallengeFor(topic);
    toolbar.append(button(`← ${c.back}`, () => { this.screen = "path"; this.scrollToTop(); this.render(); }), button(`🔊 ${c.listen}`, () => this.speak(speech.text, speech.language)));
    const heading = node("h2", "play-instruction", c.challenge);
    const topicHeading = node("h3", "assignment-topic", topic.name);
    const metadata = node("p", "assignment-meta", `${topic.subject} · ages ${topic.ageRangeStart}–${topic.ageRangeEnd}`);
    const assessment = childAssessmentFor(topic, this.profile?.name);
    const childActivity = this.renderChildAssessment(topic, assessment);
    let warmup = null;
    if (this.age <= 5 && preschoolActivityFor(topic)) {
      warmup = node("details", "bonus-warmup");
      warmup.append(node("summary", "", `🧩 ${c.pictureWarmup}`), this.renderPreschoolActivity(topic, () => {}));
    }
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
      for (const next of nextTopics) list.append(node("li", "", next.name));
      unlockPreview.append(list);
    }

    this.stage.append(toolbar, heading, topicHeading, metadata);
    if (warmup) this.stage.append(warmup);
    this.stage.append(childActivity, promptCard, unlockPreview);
  }
}
