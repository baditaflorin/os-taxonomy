import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { getPlayPath } from '../explorer/src/play-view.js';
import { buildTaxonomy } from '../explorer/src/taxonomy.js';

const { topics } = JSON.parse(readFileSync(new URL('../data/topics.json', import.meta.url)));
const { dependencies } = JSON.parse(readFileSync(new URL('../data/dependencies.json', import.meta.url)));
const taxonomy = buildTaxonomy(topics, dependencies);

test('Play assignments come from the taxonomy quick assessments for the selected age', () => {
  const path = getPlayPath(taxonomy, {}, 5);
  assert.ok(path.available.length > 0);
  for (const topic of path.available) {
    assert.ok(topic.ageRangeStart <= 5 && topic.ageRangeEnd >= 5, topic.name);
    assert.ok(topic.assessmentPrompt, topic.name);
    assert.equal(taxonomy.prerequisites.get(topic.id).filter(({ strength }) => strength === 'hard').length, 0, topic.name);
  }
});

test('finishing a hard prerequisite unlocks its next quick assignment', () => {
  const dependency = dependencies.find(({ topicId, prerequisiteId, strength }) => {
    if (strength !== 'hard') return false;
    const topic = taxonomy.byId.get(topicId);
    const prerequisite = taxonomy.byId.get(prerequisiteId);
    return topic && prerequisite && topic.assessmentPrompt && topic.ageRangeStart <= 5 && topic.ageRangeEnd >= 5 &&
      prerequisite.ageRangeStart <= 5 && prerequisite.ageRangeEnd >= 5 &&
      taxonomy.prerequisites.get(topicId).filter(({ strength: edgeStrength }) => edgeStrength === 'hard').length === 1;
  });
  assert.ok(dependency, 'expected a single-prerequisite assignment in the age-five path');

  const lockedPath = getPlayPath(taxonomy, {}, 5);
  assert.ok(lockedPath.locked.some(({ topic }) => topic.id === dependency.topicId));

  const nextPath = getPlayPath(taxonomy, {
    [dependency.prerequisiteId]: { status: 'mastered' },
  }, 5);
  assert.ok(nextPath.available.some(({ id }) => id === dependency.topicId));
});

test('topics without evidence lists still receive a playable path assignment', () => {
  const topic = topics.find(({ evidence }) => !evidence?.length);
  assert.ok(topic, 'expected at least one topic without evidence entries');

  const path = getPlayPath(taxonomy, {}, topic.ageRangeStart);
  const includedIds = new Set([
    ...path.available.map(({ id }) => id),
    ...path.locked.map(({ topic: lockedTopic }) => lockedTopic.id),
  ]);
  assert.ok(includedIds.has(topic.id), topic.name);
});
