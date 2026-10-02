// Small, curated activities for early learners. Success here records practice,
// never mastery of the broader taxonomy concept.
export const PLAY_ISLANDS = [
  { key: "count", icon: "🍎", topicId: "mt_WcfaSfVT33", en: "Apple orchard", ro: "Livada cu mere", x: 24, y: 28 },
  { key: "shapes", icon: "🔷", topicId: "mt_KJeEeTutJI", en: "Shape garden", ro: "Grădina formelor", x: 73, y: 27 },
  { key: "compare", icon: "🐟", topicId: "mt__h7hvT4tEb", en: "Fish lagoon", ro: "Lacul cu pești", x: 27, y: 73 },
  { key: "story", icon: "🦊", topicId: "mt_4A7FYmvVhA", en: "Story forest", ro: "Pădurea poveștilor", x: 75, y: 73 },
];

const COPY = {
  en: {
    hello: "Ready to explore", intro: "Pick an island. Let's play!", map: "My islands", listen: "Listen", mute: "Voice off", voice: "Voice on",
    bigger: "Bigger", smaller: "Smaller", home: "Whole map", next: "Play again", done: "I told my story!", retry: "Have another look. You can try again!",
    success: "You did it! A star for your adventure!", count: "Touch each apple. How many apples are there?", counted: "Now choose the number.",
    compare: "Which group has more fish?", story: "Tell a story out loud. Where is the fox going? Who will help? What happens next?",
    storyDone: "Thank you for your story! Every story is different.", stars: "adventure stars this session", guest: "Playing as a guest. A parent can add a profile to keep track of practice.",
    saved: "Practice is shared with your logbook. A grown-up can check what you know.", unavailable: "Voice is unavailable here. A grown-up can read the instructions with you.",
    left: "Left group", right: "Right group", shape: "Find the", circle: "circle", square: "square", triangle: "triangle", star: "star", name: "explorer",
  },
  ro: {
    hello: "Gata de explorat", intro: "Alege o insulă. Hai la joacă!", map: "Insulele mele", listen: "Ascultă", mute: "Fără voce", voice: "Cu voce",
    bigger: "Mai mare", smaller: "Mai mic", home: "Toată harta", next: "Încă o dată", done: "Am spus povestea!", retry: "Privește încă o dată. Mai poți încerca!",
    success: "Ai reușit! O stea pentru aventura ta!", count: "Atinge fiecare măr. Câte mere sunt?", counted: "Acum alege numărul.",
    compare: "În care grup sunt mai mulți pești?", story: "Spune o poveste cu voce tare. Unde merge vulpea? Cine o ajută? Ce se întâmplă apoi?",
    storyDone: "Mulțumesc pentru poveste! Fiecare poveste e diferită.", stars: "stele de aventură în această sesiune", guest: "Te joci ca oaspete. Un părinte poate adăuga un profil pentru a păstra progresul.",
    saved: "Practica apare în jurnal. Un adult poate verifica ce știi.", unavailable: "Vocea nu este disponibilă aici. Un adult îți poate citi instrucțiunile.",
    left: "Grupul din stânga", right: "Grupul din dreapta", shape: "Găsește", circle: "cercul", square: "pătratul", triangle: "triunghiul", star: "steaua", name: "exploratorule",
  },
};

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function button(label, action, className = "play-button") {
  const node = element("button", className, label);
  node.type = "button";
  node.addEventListener("click", action);
  return node;
}

export function makeRound(kind, round) {
  if (kind === "count") return { count: 2 + round % 4 };
  if (kind === "shapes") return { shape: ["circle", "triangle", "square", "star"][round % 4] };
  const smaller = 1 + round % 3;
  return round % 2 ? { left: smaller + 2, right: smaller } : { left: smaller, right: smaller + 2 };
}

export class PlayView {
  constructor(root, { onPractice, onCelebrate }) {
    this.root = root;
    this.onPractice = onPractice;
    this.onCelebrate = onCelebrate;
    this.lang = "en";
    try {
      const savedLanguage = globalThis.localStorage.getItem("marble-taxonomy:play-language");
      if (savedLanguage === "ro" || savedLanguage === "en") this.lang = savedLanguage;
    } catch { /* Guest play remains available when browser storage is blocked. */ }
    this.rounds = { count: 0, shapes: 0, compare: 0, story: 0 };
    this.stars = 0;
    this.visited = new Set();
    this.zoom = 1;
    this.voiceOn = false;
    this.render();
    document.addEventListener("visibilitychange", () => { if (document.hidden) this.stopSpeaking(); });
  }

  get copy() { return COPY[this.lang]; }
  setProfile(profile) {
    if (this.profile?.id !== profile?.id) {
      this.stars = 0;
      this.visited.clear();
      this.active = null;
      this.stopSpeaking();
    }
    const changed = this.profile?.id !== profile?.id || this.profile?.name !== profile?.name;
    this.profile = profile;
    if (changed) this.render();
  }
  stopSpeaking() { globalThis.speechSynthesis?.cancel(); }
  speak(text) {
    if (!globalThis.speechSynthesis || !globalThis.SpeechSynthesisUtterance) return;
    this.stopSpeaking();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.lang === "ro" ? "ro-RO" : "en-US";
    utterance.rate = 0.82;
    globalThis.speechSynthesis.speak(utterance);
  }

  render() {
    const c = this.copy;
    this.root.replaceChildren();
    this.root.lang = this.lang;
    const shell = element("div", "play-shell");
    const header = element("header", "play-header");
    const greeting = element("div");
    greeting.append(element("p", "play-eyebrow", "✦ LITTLE EXPLORERS"), element("h1", "", `${c.hello}, ${this.profile?.name || c.name}!`));
    const settings = element("div", "play-settings");
    const language = element("select");
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
    const voice = button(`🔊 ${this.voiceOn ? c.voice : c.mute}`, () => {
      this.voiceOn = !this.voiceOn;
      voice.textContent = `🔊 ${this.voiceOn ? c.voice : c.mute}`;
      voice.setAttribute("aria-pressed", String(this.voiceOn));
      if (this.voiceOn) this.speak(this.prompt);
      else this.stopSpeaking();
    });
    voice.disabled = !voiceAvailable;
    voice.setAttribute("aria-pressed", String(this.voiceOn));
    settings.append(language, voice);
    header.append(greeting, settings);
    const score = element("p", "play-score", `⭐ ${this.stars} ${c.stars}`);
    score.setAttribute("aria-live", "polite");
    shell.append(header, score);
    this.stage = element("div", "play-stage");
    shell.append(this.stage, element("p", "play-parent-note", this.profile ? c.saved : c.guest));
    if (!voiceAvailable) shell.append(element("p", "play-parent-note", c.unavailable));
    this.root.append(shell);
    if (this.active) this.renderActivity();
    else this.renderMap();
  }

  renderMap() {
    this.prompt = this.copy.intro;
    const heading = element("h2", "play-instruction", this.prompt);
    const controls = element("div", "play-map-controls");
    controls.append(
      button(`＋ ${this.copy.bigger}`, () => this.setZoom(this.zoom + 0.2)),
      button(`− ${this.copy.smaller}`, () => this.setZoom(this.zoom - 0.2)),
      button(`⌂ ${this.copy.home}`, () => this.setZoom(1)),
      button(`🔊 ${this.copy.listen}`, () => this.speak(this.prompt)),
    );
    const viewport = element("div", "island-viewport");
    viewport.tabIndex = 0;
    viewport.setAttribute("aria-label", this.copy.map);
    this.map = element("div", "island-map");
    this.map.style.width = `${this.zoom * 100}%`;
    this.map.style.height = `${this.zoom * 100}%`;
    const trail = element("div", "island-trail");
    trail.setAttribute("aria-hidden", "true");
    this.map.append(trail);
    for (const island of PLAY_ISLANDS) {
      const node = button("", () => {
        this.active = island;
        this.render();
        if (this.voiceOn) this.speak(this.prompt);
      }, `island island-${island.key}`);
      node.style.left = `${island.x}%`;
      node.style.top = `${island.y}%`;
      node.append(element("span", "island-art", island.icon), element("strong", "", island[this.lang]));
      if (this.visited.has(island.key)) node.append(element("span", "island-earned", "⭐"));
      this.map.append(node);
    }
    viewport.append(this.map);
    this.stage.append(heading, controls, viewport);
  }

  setZoom(value) {
    this.zoom = Math.min(2, Math.max(1, value));
    this.map.style.width = `${this.zoom * 100}%`;
    this.map.style.height = `${this.zoom * 100}%`;
  }

  renderActivity() {
    const c = this.copy;
    const island = this.active;
    const round = makeRound(island.key, this.rounds[island.key]);
    this.finished = false;
    const bar = element("div", "play-activity-bar");
    bar.append(button(`← ${c.map}`, () => { this.active = null; this.stopSpeaking(); this.render(); }), button(`🔊 ${c.listen}`, () => this.speak(this.prompt)));
    this.prompt = island.key === "shapes" ? `${c.shape} ${c[round.shape]}!` : c[island.key];
    this.stage.append(bar, element("h2", "play-instruction", this.prompt));
    const game = element("div", "play-game");
    this.feedback = element("p", "play-feedback", "");
    this.feedback.setAttribute("role", "status");
    this.feedback.setAttribute("aria-live", "polite");
    this.stage.append(game, this.feedback);

    const answer = (correct) => {
      if (this.finished) return;
      if (!correct) {
        this.feedback.textContent = c.retry;
        if (this.voiceOn) this.speak(c.retry);
        return;
      }
      this.finish(island);
    };
    if (island.key === "count") {
      const apples = element("div", "play-apples");
      const picked = new Set();
      const choices = element("div", "play-choices");
      for (let index = 0; index < round.count; index++) {
        const apple = button("🍎", () => {
          if (picked.has(index) || this.finished) return;
          picked.add(index);
          apple.textContent = `🍎 ${picked.size}`;
          apple.classList.add("picked");
          apple.setAttribute("aria-pressed", "true");
          if (this.voiceOn) this.speak(String(picked.size));
          if (picked.size === round.count) {
            this.feedback.textContent = c.counted;
            for (const choice of choices.children) choice.disabled = false;
          }
        }, "apple-target");
        apple.setAttribute("aria-label", `${this.lang === "ro" ? "Măr" : "Apple"} ${index + 1}`);
        apple.setAttribute("aria-pressed", "false");
        apples.append(apple);
      }
      for (const value of [round.count - 1, round.count, round.count + 1].sort((a, b) => (a * 7 % 5) - (b * 7 % 5))) {
        const choice = button(String(value), () => answer(value === round.count), "play-answer");
        choice.disabled = true;
        choices.append(choice);
      }
      game.append(apples, choices);
    } else if (island.key === "shapes") {
      const choices = element("div", "play-choices");
      for (const shape of ["square", "circle", "star", "triangle"]) {
        const choice = button("", () => answer(shape === round.shape), "play-answer shape-answer");
        choice.setAttribute("aria-label", c[shape]);
        choice.append(element("span", `play-shape ${shape}`));
        choices.append(choice);
      }
      game.append(choices);
    } else if (island.key === "compare") {
      const choices = element("div", "play-choices fish-choices");
      for (const side of ["left", "right"]) {
        const choice = button("", () => answer(round[side] > round[side === "left" ? "right" : "left"]), "fish-group");
        choice.setAttribute("aria-label", c[side]);
        for (let index = 0; index < round[side]; index++) choice.append(element("span", "", "🐟"));
        choices.append(choice);
      }
      game.append(choices);
    } else {
      const scene = element("div", "story-scene");
      for (const [icon, en, ro] of [["🦊", "A fox", "O vulpe"], ["🌳", "A forest", "O pădure"], ["🏠", "A little house", "O căsuță"], ["🌧️", "Rain", "Ploaie"]]) {
        const actor = button(icon, () => { actor.classList.toggle("story-picked"); if (this.voiceOn) this.speak(this.lang === "ro" ? ro : en); }, "story-actor");
        actor.setAttribute("aria-label", this.lang === "ro" ? ro : en);
        scene.append(actor);
      }
      game.append(scene, element("p", "story-note", this.lang === "ro" ? "Tu ești povestitorul. Atinge imaginile și spune povestea cu voce tare. Nu înregistrăm vocea." : "You are the storyteller. Touch the pictures and tell your story out loud. Your voice is not recorded."), button(`✨ ${c.done}`, () => answer(true)));
    }
  }

  finish(island) {
    this.finished = true;
    this.stars++;
    this.visited.add(island.key);
    this.root.querySelector(".play-score").textContent = `⭐ ${this.stars} ${this.copy.stars}`;
    this.feedback.textContent = island.key === "story" ? this.copy.storyDone : this.copy.success;
    if (this.voiceOn) this.speak(this.feedback.textContent);
    this.onCelebrate();
    try { this.onPractice(island.topicId); }
    catch { this.feedback.textContent += this.lang === "ro" ? " Progresul nu a putut fi salvat." : " Progress could not be saved."; }
    this.stage.append(button(`🚀 ${this.copy.next}`, () => { this.rounds[island.key]++; this.render(); if (this.voiceOn) this.speak(this.prompt); }, "play-button play-next"));
  }
}
