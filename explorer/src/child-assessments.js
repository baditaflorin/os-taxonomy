// Child-ready answer keys live outside the canonical taxonomy. Each authored
// task maps to exactly one source evidence item before it can record mastery.
const ASSESSMENTS = {
  mt_SsS7GptD_o: {
    icon: "💰",
    tasks: [
      {
        evidenceIndex: 0,
        prompt: {
          en: "What can people use money to pay for? Choose both!",
          ro: "Ce pot plăti oamenii cu bani? Alege ambele imagini!",
        },
        select: "multiple",
        requiredCount: 2,
        choices: [
          { icon: "🥪", label: { en: "Food people need", ro: "Mâncare de care au nevoie" }, correct: true },
          { icon: "🧸", label: { en: "A toy someone wants", ro: "O jucărie pe care și-o doresc" }, correct: true },
          { icon: "🪙🎩", label: { en: "Make a coin into a hat", ro: "Să facem o pălărie dintr-o monedă" } },
          { icon: "🧱", label: { en: "Build a wall from coins", ro: "Să construim un zid din monede" } },
        ],
      },
      {
        evidenceIndex: 1,
        prompt: {
          en: "Before money, how could a baker get some eggs?",
          ro: "Înainte să existe banii, cum putea brutarul să primească ouă?",
        },
        select: "single",
        choices: [
          { icon: "🍞 ↔️ 🥚", label: { en: "Swap bread for eggs", ro: "Schimbă pâine pe ouă" }, correct: true },
          { icon: "💳 ➡️ 🥚", label: { en: "Tap a bank card", ro: "Atinge un card bancar" } },
          { icon: "🪄", label: { en: "Use a magic wand", ro: "Folosește o baghetă magică" } },
        ],
      },
      {
        evidenceIndex: 2,
        prompt: {
          en: "Tap at least two ways people can pay today!",
          ro: "Atinge cel puțin două feluri în care putem plăti azi!",
        },
        select: "multiple",
        requiredCount: 2,
        choices: [
          { icon: "🪙", label: { en: "Coins", ro: "Monede" }, correct: true },
          { icon: "💵", label: { en: "Notes", ro: "Bancnote" }, correct: true },
          { icon: "💳", label: { en: "Bank card", ro: "Card bancar" }, correct: true },
          { icon: "📱", label: { en: "Pay by phone", ro: "Plată cu telefonul" }, correct: true },
          { icon: "🍌", label: { en: "Banana", ro: "Banană" } },
          { icon: "🧸", label: { en: "Teddy bear", ro: "Ursuleț" } },
        ],
      },
    ],
  },
};

export function childAssessmentFor(topic) {
  const assessment = ASSESSMENTS[topic.id];
  if (!assessment || assessment.tasks.length !== topic.evidence?.length) return null;

  const evidenceIndexes = assessment.tasks.map(({ evidenceIndex }) => evidenceIndex);
  if (evidenceIndexes.some((index, position) => index !== position)) return null;
  return assessment;
}
