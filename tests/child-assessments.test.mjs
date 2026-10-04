import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { childAssessmentFor } from '../explorer/src/child-assessments.js';

const { topics } = JSON.parse(readFileSync(new URL('../data/topics.json', import.meta.url)));

test('every taxonomy topic has at least one playable child mission', () => {
  assert.ok(topics.length > 1000, 'expected the full taxonomy dataset');
  for (const topic of topics) {
    const assessment = childAssessmentFor(topic, 'Alex');
    assert.ok(assessment, topic.name);
    assert.ok(['choice', 'observe'].includes(assessment.kind), topic.name);
    assert.ok(assessment.tasks.length > 0, topic.name);
    for (const task of assessment.tasks) {
      assert.ok(task.prompt?.en?.trim(), `${topic.name} has an empty mission prompt`);
      for (const index of task.evidenceIndexes ?? [task.evidenceIndex]) {
        assert.ok(Number.isInteger(index) && index >= 0 && index < topic.evidence.length, `${topic.name} maps outside its evidence list`);
      }
    }
    const mappedEvidence = [...new Set(assessment.tasks.flatMap(({ evidenceIndexes, evidenceIndex }) =>
      evidenceIndexes ?? (Number.isInteger(evidenceIndex) ? [evidenceIndex] : []),
    ))].sort((left, right) => left - right);
    if (mappedEvidence.length) assert.deepEqual(mappedEvidence, topic.evidence.map((_, index) => index), topic.name);
  }
});

test('authored quizzes are only used when every evidence item has an answer-bearing task', () => {
  for (const topic of topics) {
    const assessment = childAssessmentFor(topic);
    if (assessment.kind !== 'choice') continue;

    const mappedEvidence = assessment.tasks.map(({ evidenceIndex }) => evidenceIndex);
    assert.deepEqual(mappedEvidence, topic.evidence.map((_, index) => index), topic.name);
    for (const task of assessment.tasks) {
      assert.ok(task.choices.length >= 2, topic.name);
      assert.ok(task.choices.some(({ correct }) => correct === true), topic.name);
    }
  }
});

test('topics with no rubric get a single observed challenge without fabricated evidence', () => {
  const topic = topics.find(({ evidence }) => evidence.length === 0);
  assert.ok(topic);
  const assessment = childAssessmentFor(topic, 'Alex');
  assert.equal(assessment.kind, 'observe');
  assert.equal(assessment.tasks.length, 1);
  assert.deepEqual(assessment.tasks[0].evidenceIndexes, []);
  assert.match(assessment.tasks[0].prompt.en, /Alex/);
});

test('research-reference-only evidence uses the observable topic prompt instead of asking a child to repeat citations', () => {
  const topic = topics.find(({ name }) => name === 'Reading for Meaning');
  assert.ok(topic);
  const assessment = childAssessmentFor(topic, 'Alex');
  assert.equal(assessment.kind, 'observe');
  assert.equal(assessment.tasks.length, 1);
  assert.deepEqual(assessment.tasks[0].evidenceIndexes, []);
  assert.match(assessment.tasks[0].prompt.en, /Alex/);
});
