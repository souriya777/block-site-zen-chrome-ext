import { get } from 'svelte/store';
import { isEmpty, isNotEmpty } from '@common/js/string-utils';
import { pin, snackbarMessage } from '@common/js/store';

function isUserInputValid(first, second, third, fourth, fifth, sixth) {
  return (
    isNotEmpty(first) &&
    isNotEmpty(second) &&
    isNotEmpty(third) &&
    isNotEmpty(fourth) &&
    isNotEmpty(fifth) &&
    isNotEmpty(sixth)
  );
}

function isPinValid(first, second, third, fourth, fifth, sixth) {
  if (!isUserInputValid(first, second, third, fourth, fifth, sixth)) {
    return false;
  }

  const ENTERED_PIN = `${first}${second}${third}${fourth}${fifth}${sixth}`;
  /** @type {string} */
  const PIN = get(pin);

  if (isEmpty(PIN) || ENTERED_PIN === PIN) {
    return true;
  }

  return false;
}

function savePin(first, second, third, fourth, fifth, sixth) {
  if (
    isEmpty(first) ||
    isEmpty(second) ||
    isEmpty(third) ||
    isEmpty(fourth) ||
    isEmpty(fifth) ||
    isEmpty(sixth)
  ) {
    return false;
  }

  pin.set(first + second + third + fourth + fifth + sixth);
  snackbarMessage.set('Pin is updated 🎉');

  return true;
}

function removePin() {
  pin.set('');
  snackbarMessage.set('Pin is removed 🎉');
  return true;
}

export { isPinValid, savePin, removePin };
