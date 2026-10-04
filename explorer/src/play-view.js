import { assessmentPromptFor } from "./taxonomy.js";

const COPY = {
  en: {
    hello: "Ready to explore", voiceOff: "Voice off", voiceOn: "Voice on", listen: "Listen",
    age: "I'm learning at age", subject: "Choose a subject", allSubjects: "All subjects",
    pathTitle: "Your learning path", pathIntro: "Pick a glowing challenge. Finish one to open more of the path!",
    ready: "Ready to play", locked: "Coming up", done: "Known", more: "Show more challenges",
    play: "Play this challenge", back: "Back to my path", challenge: "Your quick assignment",
    tryIt: "Try it your way: tell your grown-up, or type your answer here. Your answer stays on this device and is not saved.",
    answerPlaceholder: "Type your answer here (optional)…", iTried: "I had a go!",
    grownup: "Grown-up check", grownupIntro: "Listen to or look at what your child tried. Check the things you saw them do.",
    markKnown: "I saw all of these — mark it known", keepLearning: "Keep practising for now", needProfile: "Create a child profile to save this path and unlock the next challenges.",
    needProfileButton: "Add child profile", lockedBy: "First try", unlocks: "This can open", noPath: "No challenges match these choices yet. Try another age or subject.",
    success: "Adventure complete! New challenges may have opened.", learning: "Saved as learning. You can try this challenge again later.",
    stars: "path stars this session", guest: "Playing as a guest. Add a child profile to save progress and open the path.", saved: "Progress stays in this browser. A grown-up can check what you know.",
    unavailable: "Voice is unavailable in this browser. A grown-up can read the challenge aloud.",
    waiting: "Complete the first challenge to see what it opens.", completed: "Known", lockedLabel: "Locked", prerequisite: "Finish first:",
  },
  ro: {
    hello: "Gata de explorat", voiceOff: "Fără voce", voiceOn: "Cu voce", listen: "Ascultă",
    age: "Învăț la vârsta de", subject: "Alege un domeniu", allSubjects: "Toate domeniile",
    pathTitle: "Drumul tău de învățare", pathIntro: "Alege o provocare luminoasă. Termină una ca să deschizi altele!",
    ready: "Gata de joacă", locked: "Urmează", done: "Știe deja", more: "Arată mai multe provocări",
    play: "Joacă această provocare", back: "Înapoi la drum", challenge: "Provocarea ta rapidă",
    tryIt: "Încearcă în felul tău: spune-i unui adult sau scrie răspunsul aici. Răspunsul rămâne pe acest dispozitiv și nu se salvează.",
    answerPlaceholder: "Scrie răspunsul aici (opțional)…", iTried: "Am încercat!",
    grownup: "Verificare pentru adult", grownupIntro: "Ascultă sau privește ce a încercat copilul. Bifează lucrurile pe care l-ai văzut făcându-le.",
    markKnown: "Le-a făcut pe toate — marchează că știe", keepLearning: "Mai exersăm deocamdată", needProfile: "Creează un profil ca să salvezi drumul și să deschizi provocările următoare.",
    needProfileButton: "Adaugă profilul copilului", lockedBy: "Încearcă mai întâi", unlocks: "Aceasta poate deschide", noPath: "Nu sunt provocări pentru aceste alegeri. Încearcă altă vârstă sau domeniu.",
    success: "Aventură terminată! S-ar putea să se fi deschis provocări noi.", learning: "Salvat ca în curs de învățare. Poți încerca din nou mai târziu.",
    stars: "stele pe drum în sesiunea aceasta", guest: "Te joci ca oaspete. Adaugă profilul copilului ca să salvezi progresul și să deschizi drumul.", saved: "Progresul rămâne în acest browser. Un adult poate verifica ce știi.",
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

function latestMasteredPrerequisiteAt(taxonomy, progress, topicId) {
  return hardPrerequisites(taxonomy, topicId).reduce((latest, { prerequisiteId }) => {
    const entry = progress[prerequisiteId];
    const updatedAt = entry?.status === "mastered" ? Date.parse(entry.updatedAt) : 0;
    return Number.isFinite(updatedAt) ? Math.max(latest, updatedAt) : latest;
  }, 0);
}

export function getPlayPath(taxonomy, progress, age, subject = "") {
  const inScope = taxonomy.topics.filter((topic) =>
    topic.assessmentPrompt && topic.evidence?.length && topic.ageRangeStart <= age && topic.ageRangeEnd >= age && (!subject || topic.subject === subject),
  );
  const available = [];
  const locked = [];
  const completed = [];

  for (const topic of inScope) {
    const entry = progress[topic.id];
    const prerequisites = hardPrerequisites(taxonomy, topic.id);
    const unmet = prerequisites.filter(({ prerequisiteId }) => progress[prerequisiteId]?.status !== "mastered");
    if (entry?.status === "mastered") completed.push(topic);
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
    latestMasteredPrerequisiteAt(taxonomy, progress, topic.id),
  ]));
  available.sort((left, right) =>
    (progress[left.id]?.status === "learning" ? 0 : 1) - (progress[right.id]?.status === "learning" ? 0 : 1) ||
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
    this.reviewing = false;
    this.voiceOn = false;
    try {
      const savedLanguage = globalThis.localStorage.getItem("marble-taxonomy:play-language");
      if (savedLanguage === "ro" || savedLanguage === "en") this.lang = savedLanguage;
      const savedAge = Number(globalThis.localStorage.getItem("marble-taxonomy:play-age"));
      if (Number.isInteger(savedAge) && savedAge >= taxonomy.minAge && savedAge <= taxonomy.maxAge) this.age = savedAge;
    } catch { /* Playing still works when browser storage is unavailable. */ }
    this.profile = null;
    this.progressKey = "";
    this.responses = new Map();
    this.pendingEvidence = null;
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
      this.responses.clear();
      this.pendingEvidence = null;
      this.stars = 0;
      this.selectedTopicId = null;
      this.screen = "path";
      this.reviewing = false;
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
      if (this.voiceOn) this.speak(active ? this.promptFor(active) : c.pathIntro, active ? "en-US" : undefined);
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

  promptFor(topic) { return assessmentPromptFor(topic, this.profile?.name); }

  renderPath() {
    const c = this.copy;
    const filters = node("div", "play-path-filters");
    const ageLabel = node("label", "play-filter-label", c.age);
    const age = node("select", "play-filter");
    age.setAttribute("aria-label", c.age);
    for (let value = this.taxonomy.minAge; value <= this.taxonomy.maxAge; value += 1) age.append(new Option(String(value), String(value)));
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
    const item = node(state === "locked" ? "div" : "button", `path-node path-node-${state}`);
    if (item instanceof HTMLButtonElement) {
      item.type = "button";
      item.addEventListener("click", () => { this.selectedTopicId = topic.id; this.screen = "challenge"; this.reviewing = false; this.scrollToTop(); this.render(); if (this.voiceOn) this.speak(this.promptFor(topic), "en-US"); });
    } else item.setAttribute("aria-disabled", "true");
    this.visiblePathNodes.set(topic.id, item);
    const icon = state === "available" ? "✦" : state === "completed" ? "✓" : "🔒";
    item.append(node("span", "path-node-icon", icon));
    const details = node("span", "path-node-details");
    details.append(node("strong", "", topic.name), node("small", "", `${topic.subject} · ages ${topic.ageRangeStart}–${topic.ageRangeEnd}`));
    if (state === "locked" && unmet.length) details.append(node("small", "path-prerequisite", `${c.prerequisite} ${unmet.slice(0, 2).map(({ topic: prerequisite }) => prerequisite?.name ?? "another challenge").join(", ")}${unmet.length > 2 ? ` +${unmet.length - 2}` : ""}`));
    item.append(details, node("span", "path-node-state", state === "available" ? c.play : state === "completed" ? c.completed : c.lockedLabel));
    return item;
  }

  renderChallenge(topic) {
    const c = this.copy;
    const prompt = this.promptFor(topic);
    const toolbar = node("div", "play-activity-bar");
    toolbar.append(button(`← ${c.back}`, () => { this.screen = "path"; this.scrollToTop(); this.render(); }), button(`🔊 ${c.listen}`, () => this.speak(prompt, "en-US")));
    const heading = node("h2", "play-instruction", c.challenge);
    const topicHeading = node("h3", "assignment-topic", topic.name);
    const metadata = node("p", "assignment-meta", `${topic.subject} · ages ${topic.ageRangeStart}–${topic.ageRangeEnd}`);
    const promptCard = node("section", "assignment-prompt");
    promptCard.append(node("p", "play-eyebrow", "QUICK ASSIGNMENT"), node("p", "assignment-question", prompt));
    promptCard.append(node("p", "assignment-language-note", this.lang === "ro" ? "Textul provocării este din taxonomia originală, scrisă în engleză." : "This challenge comes from the original English taxonomy."));

    const responseLabel = node("label", "assignment-response-label", c.tryIt);
    const response = node("textarea", "assignment-response");
    response.rows = 4;
    response.maxLength = 4000;
    response.placeholder = c.answerPlaceholder;
    response.value = this.responses.get(topic.id) ?? "";
    response.addEventListener("input", () => this.responses.set(topic.id, response.value));
    responseLabel.append(response);

    const nextTopics = (this.taxonomy.unlocks.get(topic.id) ?? [])
      .filter(({ strength, topic: next }) => strength === "hard" && next && (next.ageRangeStart <= this.age && next.ageRangeEnd >= this.age))
      .map(({ topic: next }) => next)
      .filter((next) => hardPrerequisites(this.taxonomy, next.id)
        .every(({ prerequisiteId }) => prerequisiteId === topic.id || this.profile?.progress?.[prerequisiteId]?.status === "mastered"))
      .slice(0, 3);
    const unlockPreview = node("section", "assignment-unlocks");
    unlockPreview.append(node("strong", "", nextTopics.length ? c.unlocks : c.waiting));
    if (nextTopics.length) {
      const list = node("ul");
      for (const next of nextTopics) list.append(node("li", "", next.name));
      unlockPreview.append(list);
    }

    this.checkArea = node("section", "grownup-check");
    if (!this.reviewing) {
      const tryButton = button(`✨ ${c.iTried}`, () => {
        this.reviewing = true;
        this.render();
        if (this.voiceOn) this.speak(c.grownupIntro);
      }, "play-button play-finish");
      this.stage.append(toolbar, heading, topicHeading, metadata, promptCard, responseLabel, unlockPreview, tryButton);
    } else {
      this.checkArea.append(node("h3", "", c.grownup), node("p", "grownup-intro", c.grownupIntro));
      const checklist = node("div", "assignment-evidence");
      const checks = topic.evidence.map((evidence, index) => {
        const label = node("label", "assignment-evidence-item");
        const checkbox = node("input");
        checkbox.type = "checkbox";
        checkbox.checked = this.pendingEvidence?.topicId === topic.id ? this.pendingEvidence.evidence[index] === true : false;
        label.append(checkbox, node("span", "", evidence));
        checklist.append(label);
        return checkbox;
      });
      const complete = button(`⭐ ${c.markKnown}`, () => {
        if (!checks.every(({ checked }) => checked)) return;
        if (!this.profile) {
          this.pendingEvidence = { topicId: topic.id, evidence: checks.map(({ checked }) => checked) };
          return this.onNeedProfile();
        }
        this.stars += 1;
        this.onAssess(topic.id, checks.map((_, index) => index));
        this.onCelebrate();
        this.responses.delete(topic.id);
        this.pendingEvidence = null;
        this.screen = "path";
        this.reviewing = false;
        this.selectedTopicId = null;
        this.scrollToTop();
        this.render();
        if (this.voiceOn) this.speak(c.success);
      }, "play-button play-finish");
      complete.disabled = !checks.every(({ checked }) => checked);
      for (const checkbox of checks) checkbox.addEventListener("change", () => {
        this.pendingEvidence = { topicId: topic.id, evidence: checks.map(({ checked }) => checked) };
        complete.disabled = !checks.every(({ checked }) => checked);
      });
      const learning = button(c.keepLearning, () => {
        if (this.profile) this.onPractice(topic.id);
        this.responses.delete(topic.id);
        this.pendingEvidence = null;
        this.screen = "path";
        this.reviewing = false;
        this.selectedTopicId = null;
        this.scrollToTop();
        this.render();
      }, "play-button play-learning");
      this.checkArea.append(checklist, complete, learning);
      if (!this.profile) {
        this.checkArea.append(node("p", "grownup-intro", c.needProfile));
        this.checkArea.append(button(c.needProfileButton, () => {
          this.pendingEvidence = { topicId: topic.id, evidence: checks.map(({ checked }) => checked) };
          this.onNeedProfile();
        }, "play-button path-more"));
      }
      this.stage.append(toolbar, heading, topicHeading, metadata, promptCard, responseLabel, unlockPreview, this.checkArea);
    }
  }
}
