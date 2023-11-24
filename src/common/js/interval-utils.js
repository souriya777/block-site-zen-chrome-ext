const START_HOURS = 9;
const START_MINUTES = 0;
const END_HOURS = 12;
const END_MINUTES = 0;

/**
 * @returns {import('@common/js/types').Interval}
 */
function initInterval() {
  const item = {
    id: crypto.randomUUID(),
    start: {
      hours: START_HOURS,
      minutes: START_MINUTES,
    },
    end: {
      hours: END_HOURS,
      minutes: END_MINUTES,
    },
  };

  return { ...item };
}

export { START_HOURS, START_MINUTES, END_HOURS, END_MINUTES, initInterval };
