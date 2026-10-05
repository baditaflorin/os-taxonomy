// Answer-bearing quizzes live outside the canonical taxonomy. Authored tasks map
// to source evidence; generated guided missions stay practice-only, not mastery.
import { assessmentPromptFor } from "./taxonomy.js";

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

const SOURCE_REFERENCE = /\b(research|studies|study|framework|theory|view of|et al\.|effect size|evidence base|assessment research|journal)\b/i;
const ACTION_START = /^(identify|name|list|point|describe|explain|give|use|solve|match|sort|compare|distinguish|recognise|recognize|show|create|make|build|draw|model|act|record|write|understand)\b/i;

function isSourceReference(value) {
  return value.length <= 120 && SOURCE_REFERENCE.test(value) && !ACTION_START.test(value);
}

function makeImperative(value) {
  const rewrites = [
    [/^Names\b/i, "Name"], [/^Explains\b/i, "Explain"], [/^Describes\b/i, "Describe"],
    [/^Identifies\b/i, "Identify"], [/^Gives\b/i, "Give"], [/^Uses\b/i, "Use"],
    [/^Solves\b/i, "Solve"], [/^Matches\b/i, "Match"], [/^Sorts\b/i, "Sort"],
    [/^Distinguishes\b/i, "Distinguish"], [/^Recognises\b/i, "Recognise"], [/^Recognizes\b/i, "Recognize"],
    [/^Compares\b/i, "Compare"], [/^Creates\b/i, "Create"], [/^Builds\b/i, "Build"],
    [/^Draws\b/i, "Draw"], [/^Writes\b/i, "Write"], [/^Records\b/i, "Record"],
    [/^Counts\b/i, "Count"], [/^Labels\b/i, "Label"], [/^Points\b/i, "Point"],
    [/^Says\b/i, "Say"], [/^States\b/i, "State"], [/^Acts\b/i, "Act"],
    [/^Reads\b/i, "Read"], [/^Asks\b/i, "Ask"], [/^Keeps\b/i, "Keep"],
  ];
  for (const [pattern, replacement] of rewrites) {
    if (pattern.test(value)) return value.replace(pattern, replacement);
  }
  return value;
}

function topicPrompt(topic, childName) {
  if (topic.assessmentPrompt) return assessmentPromptFor(topic, childName || "you");
  const description = topic.description?.trim();
  return `${childName ? `${childName}, ` : ""}show what you know about ${topic.name}${description ? `: ${description}` : "."}`;
}

function guidedAssessment(topic, childName) {
  const evidence = Array.isArray(topic.evidence) ? topic.evidence : [];
  const referenceOnly = evidence.length > 0 && evidence.every(isSourceReference);

  if (!evidence.length || referenceOnly) {
    return {
      kind: "guided",
      tasks: [{
        evidenceIndexes: referenceOnly ? [] : evidence.map((_, index) => index),
        prompt: { en: topicPrompt(topic, childName) },
        language: "en-US",
      }],
    };
  }

  return {
    kind: "guided",
    tasks: evidence.map((criterion, index) => ({
      evidenceIndexes: [index],
      prompt: { en: `${childName ? `${childName}, ` : ""}Show what you know: ${makeImperative(criterion)}` },
      language: "en-US",
    })),
  };
}

export function childAssessmentFor(topic, childName) {
  const assessment = ASSESSMENTS[topic.id];
  if (!assessment || assessment.tasks.length !== topic.evidence?.length) return guidedAssessment(topic, childName);

  const evidenceIndexes = assessment.tasks.map(({ evidenceIndex }) => evidenceIndex);
  if (evidenceIndexes.some((index, position) => index !== position)) return guidedAssessment(topic, childName);
  return { ...assessment, kind: "choice" };
}
