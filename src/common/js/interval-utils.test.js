import { expect, test } from 'vitest';
import { isBetweenInterval } from '@common/js/interval-utils';

test('17h45 is between 9h30 & 20h45', () => {
  expect(
    isBetweenInterval(
      {
        id: '123',
        start: {
          hours: 9,
          minutes: 30,
        },
        end: {
          hours: 20,
          minutes: 45,
        },
      },
      17,
      45,
    ),
  ).toBeTruthy();
});

test('17h45 is NOT between 21h00 & 22h00', () => {
  expect(
    isBetweenInterval(
      {
        id: '456',
        start: {
          hours: 21,
          minutes: 0,
        },
        end: {
          hours: 22,
          minutes: 0,
        },
      },
      17,
      45,
    ),
  ).toBeFalsy();
});

test('17h45 is between 17h45 & 19h00', () => {
  expect(
    isBetweenInterval(
      {
        id: 'abc',
        start: {
          hours: 17,
          minutes: 45,
        },
        end: {
          hours: 19,
          minutes: 0,
        },
      },
      17,
      45,
    ),
  ).toBeTruthy();
});

test('17h45 is between 16h00 & 17h45', () => {
  expect(
    isBetweenInterval(
      {
        id: 'abc',
        start: {
          hours: 16,
          minutes: 0,
        },
        end: {
          hours: 17,
          minutes: 45,
        },
      },
      17,
      45,
    ),
  ).toBeTruthy();
});

test('22h29 is between 18h10 & 18h30', () => {
  expect(
    isBetweenInterval(
      {
        id: 'abc',
        start: {
          hours: 18,
          minutes: 10,
        },
        end: {
          hours: 18,
          minutes: 30,
        },
      },
      22,
      29,
    ),
  ).toBeFalsy();
});
