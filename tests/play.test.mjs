import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { PLAY_ISLANDS, makeRound } from '../explorer/src/play-view.js';

test('every play activity maps to a real concept appropriate for age five', () => {
  const { topics } = JSON.parse(readFileSync(new URL('../data/topics.json', import.meta.url)));
  for (const island of PLAY_ISLANDS) {
    const topic = topics.find(({ id }) => id === island.topicId);
    assert.ok(topic, island.topicId);
    assert.ok(topic.ageRangeStart <= 5 && topic.ageRangeEnd >= 5, topic.name);
  }
});

test('rounds keep counts small and comparisons unambiguous', () => {
  for (let round = 0; round < 20; round++) {
    const counting = makeRound('count', round);
    assert.ok(counting.count >= 2 && counting.count <= 5);
    const comparison = makeRound('compare', round);
    assert.notEqual(comparison.left, comparison.right);
    assert.ok(Math.max(comparison.left, comparison.right) <= 5);
  }
});
