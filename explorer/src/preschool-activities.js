const ACTIVITIES = {
  mt_N8CpN1EJrP: {
    icon: "🐶",
    prompt: { en: "Which one is a whole sentence?", ro: "Care variantă este o propoziție întreagă?" },
    choices: [
      { icon: "🐶", label: { en: "The dog", ro: "Câinele" } },
      { icon: "🐶💨", label: { en: "The dog ran fast!", ro: "Câinele a alergat repede!" }, correct: true },
    ],
  },
  mt_of2GggtxFl: {
    icon: "🔤",
    prompt: { en: "Which note has a space between every word?", ro: "Unde este câte un spațiu între cuvinte?" },
    choices: [
      { icon: "🐱📖", label: { en: "Thecatran", ro: "Pisicafuge" } },
      { icon: "🐱　📖", label: { en: "The cat ran", ro: "Pisica fuge" }, correct: true },
    ],
  },
  mt_4GiE83rJF_: {
    icon: "🎵",
    prompt: { en: "Cat rhymes with…", ro: "Ce cuvânt rimează cu „mac”?" },
    choices: [
      { icon: "🎒", label: { en: "hat", ro: "sac" }, correct: true },
      { icon: "☁️", label: { en: "dog", ro: "nor" } },
    ],
  },
  mt_WcfaSfVT33: {
    icon: "🍎",
    prompt: { en: "How many apples are there?", ro: "Câte mere sunt?" },
    interaction: {
      kind: "tap-each",
      objectIcon: "🍎",
      objectLabel: { en: "apple", ro: "măr" },
      destinationIcon: "🧺",
      destination: { en: "Basket", ro: "Coș" },
      count: 4,
      groups: [4],
      instruction: { en: "Tap each apple to put it in the basket. Count as you go!", ro: "Atinge fiecare măr ca să-l pui în coș. Numără-le pe rând!" },
    },
    choices: [
      { icon: "3", label: { en: "3 apples", ro: "3 mere" }, value: 3 },
      { icon: "4", label: { en: "4 apples", ro: "4 mere" }, value: 4, correct: true },
      { icon: "5", label: { en: "5 apples", ro: "5 mere" }, value: 5 },
    ],
  },
  mt_dmNvjroCPT: {
    icon: "🚗",
    prompt: { en: "How many toy cars are there?", ro: "Câte mașinuțe sunt?" },
    interaction: {
      kind: "tap-each",
      objectIcon: "🚗",
      objectLabel: { en: "car", ro: "mașinuță" },
      destinationIcon: "🅿️",
      destination: { en: "Garage", ro: "Garaj" },
      count: 7,
      groups: [7],
      instruction: { en: "Tap each car to drive it into the garage. Count as you go!", ro: "Atinge fiecare mașinuță ca s-o duci în garaj. Numără-le pe rând!" },
    },
    choices: [
      { icon: "6", label: { en: "6 cars", ro: "6 mașinuțe" }, value: 6 },
      { icon: "7", label: { en: "7 cars", ro: "7 mașinuțe" }, value: 7, correct: true },
      { icon: "8", label: { en: "8 cars", ro: "8 mașinuțe" }, value: 8 },
    ],
  },
  mt__h7hvT4tEb: {
    icon: "🫐",
    prompt: { en: "Which plate has more berries?", ro: "Care farfurie are mai multe fructe?" },
    choices: [
      { icon: "🫐 🫐 🫐 🫐 🫐 🫐", label: { en: "6 berries", ro: "6 fructe" }, correct: true },
      { icon: "🫐 🫐 🫐 🫐", label: { en: "4 berries", ro: "4 fructe" } },
    ],
  },
  mt_KJeEeTutJI: {
    icon: "🔷",
    prompt: { en: "Tap the shape with three corners.", ro: "Atinge forma cu trei colțuri." },
    choices: [
      { icon: "🔺", label: { en: "Triangle", ro: "Triunghi" }, correct: true },
      { icon: "⚪", label: { en: "Circle", ro: "Cerc" } },
      { icon: "🟦", label: { en: "Square", ro: "Pătrat" } },
    ],
  },
  mt_Qcp2d_kuta: {
    icon: "🎲",
    prompt: { en: "Which one is shaped like a ball?", ro: "Care obiect are formă de minge?" },
    choices: [
      { icon: "🥫", label: { en: "A can", ro: "O conservă" } },
      { icon: "⚽", label: { en: "A ball", ro: "O minge" }, correct: true },
      { icon: "🎲", label: { en: "A dice", ro: "Un zar" } },
    ],
  },
  mt_frDIaXzWbx: {
    icon: "🔠",
    prompt: { en: "Tap the little letter that matches big A.", ro: "Atinge litera mică pereche cu A." },
    choices: [
      { icon: "a", label: { en: "little a", ro: "a mic" }, correct: true },
      { icon: "o", label: { en: "little o", ro: "o mic" } },
      { icon: "e", label: { en: "little e", ro: "e mic" } },
    ],
  },
  mt__KHQttMde3: {
    icon: "🔊",
    prompt: { en: "Listen: /sh/ ... /o/ ... /p/. Which word?", ro: "Ascultă: /ș/ ... /o/ ... /p/. Ce cuvânt auzi?" },
    choices: [
      { icon: "🛍️", label: { en: "shop", ro: "shop" }, correct: true },
      { icon: "🚢", label: { en: "ship", ro: "ship" } },
      { icon: "🚪", label: { en: "shut", ro: "shut" } },
    ],
  },
  mt_PvU3eoikev: {
    icon: "🐕",
    prompt: { en: "Join the sounds: /d/ + /og/. Which word?", ro: "Unește sunetele: /d/ + /og/. Ce cuvânt auzi?" },
    choices: [
      { icon: "🐕", label: { en: "dog", ro: "dog" }, correct: true },
      { icon: "🐈", label: { en: "cat", ro: "cat" } },
      { icon: "🪵", label: { en: "log", ro: "log" } },
    ],
  },
  mt_F978c32kDr: {
    icon: "🔤",
    prompt: { en: "Which letter starts with the /s/ sound?", ro: "Ce literă începe cu sunetul /s/?" },
    choices: [
      { icon: "M", label: { en: "M", ro: "M" } },
      { icon: "S", label: { en: "S", ro: "S" }, correct: true },
      { icon: "T", label: { en: "T", ro: "T" } },
    ],
  },
  "mt_OvyoRo47K-": {
    icon: "🚙",
    prompt: { en: "4 toy cars and 3 more. How many altogether?", ro: "4 mașinuțe și încă 3. Câte sunt în total?" },
    interaction: {
      kind: "tap-each",
      objectIcon: "🚗",
      objectLabel: { en: "car", ro: "mașinuță" },
      destinationIcon: "🅿️",
      destination: { en: "Garage", ro: "Garaj" },
      count: 7,
      groups: [4, 3],
      instruction: { en: "Four cars are here. Three more arrive! Tap each car into the garage and count them all.", ro: "Sunt patru mașinuțe. Mai vin încă trei! Du-le pe toate în garaj și numără-le." },
    },
    choices: [
      { icon: "6", label: { en: "6 cars", ro: "6 mașinuțe" }, value: 6 },
      { icon: "7", label: { en: "7 cars", ro: "7 mașinuțe" }, value: 7, correct: true },
      { icon: "8", label: { en: "8 cars", ro: "8 mașinuțe" }, value: 8 },
    ],
  },
  mt_sYpKWbq5ra: {
    icon: "⭐",
    prompt: { en: "You have 5 stickers and get one more. How many now?", ro: "Ai 5 abțibilduri și mai primești unul. Câte ai acum?" },
    choices: [
      { icon: "5️⃣", label: { en: "5", ro: "5" } },
      { icon: "6️⃣", label: { en: "6 stickers", ro: "6 abțibilduri" }, correct: true },
      { icon: "7️⃣", label: { en: "7", ro: "7" } },
    ],
  },
  "mt_PgsHGYJMH-": {
    icon: "🍎",
    prompt: { en: "3 apples and 2 more. How many altogether?", ro: "3 mere și încă 2. Câte sunt în total?" },
    choices: [
      { icon: "4️⃣", label: { en: "4", ro: "4" } },
      { icon: "5️⃣", label: { en: "5 apples", ro: "5 mere" }, correct: true },
      { icon: "6️⃣", label: { en: "6", ro: "6" } },
    ],
  },
};

const SUBJECT_ICONS = {
  Computing: "🤖",
  English: "🔤",
  History: "🏺",
  "Learning to Learn": "🧠",
  "Life Skills": "🧰",
  Mathematics: "🔢",
  "Personal & Social Development": "💛",
  Science: "🔍",
};

const TOPIC_ICONS = {
  mt_SsS7GptD_o: "💰",
  mt_FNSeo9_T2Z: "👛",
  mt_zrCyqhngYm: "🐷",
};

export function preschoolActivityFor(topic) {
  return ACTIVITIES[topic.id] ?? null;
}

export function preschoolIconFor(topic) {
  return preschoolActivityFor(topic)?.icon ?? TOPIC_ICONS[topic.id] ?? SUBJECT_ICONS[topic.subject] ?? "✨";
}
