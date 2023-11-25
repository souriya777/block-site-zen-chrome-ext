import { expect, test } from 'vitest';
import { isBetweenInterval } from '@common/js/interval-utils';

/** @type {import('@common/js/types').Interval} */
const INTERVAL_9h30_20h45 = {
  id: '123',
  start: {
    hours: 9,
    minutes: 30,
  },
  end: {
    hours: 20,
    minutes: 45,
  },
};

/** @type {import('@common/js/types').Interval} */
const INTERVAL_21h00_22h00 = {
  id: '456',
  start: {
    hours: 21,
    minutes: 0,
  },
  end: {
    hours: 22,
    minutes: 0,
  },
};

/** @type {import('@common/js/types').Interval} */
const INTERVAL_17h45_19h00 = {
  id: 'abc',
  start: {
    hours: 17,
    minutes: 45,
  },
  end: {
    hours: 19,
    minutes: 0,
  },
};

/** @type {import('@common/js/types').Interval} */
const INTERVAL_16h00_17h45 = {
  id: 'abc',
  start: {
    hours: 16,
    minutes: 0,
  },
  end: {
    hours: 17,
    minutes: 45,
  },
};

test('17h45 is between 9h30 & 20h45', () => {
  expect(isBetweenInterval(INTERVAL_9h30_20h45, 17, 45)).toBeTruthy();
});

test('17h45 is NOT between 21h00 & 22h00', () => {
  expect(isBetweenInterval(INTERVAL_21h00_22h00, 17, 45)).toBeFalsy();
});

test('17h45 is between 17h45 & 19h00', () => {
  expect(isBetweenInterval(INTERVAL_17h45_19h00, 17, 45)).toBeTruthy();
});

test('17h45 is between 16h00 & 17h45', () => {
  expect(isBetweenInterval(INTERVAL_16h00_17h45, 17, 45)).toBeTruthy();
});
