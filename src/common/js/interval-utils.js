const START_HOURS = 9;
const START_MINUTES = 0;
const END_HOURS = 12;
const END_MINUTES = 0;

const UTC_DAY_POSITION_LABEL = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
};

/**
 * @returns {import('@common/js/types').Interval}
 */
function createInterval() {
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

/**
 *
 * @param {import('@common/js/types').Interval} interval
 * @param {number} hours
 * @param {number} minutes
 * @returns {boolean}
 */
function isBetweenInterval(interval, hours, minutes) {
  const { start, end } = interval;

  if (
    hours > start.hours ||
    (hours === start.hours &&
      minutes >= start.minutes &&
      (hours < end.hours || (hours === end.hours && minutes <= end.minutes)))
  ) {
    return true;
  }

  return false;
}

/**
 * @param {import('@common/js/types').Week} week
 * @param {import('@common/js/types').Interval[]} intervals
 * @returns
 */
function isInBlockedPeriod(week, intervals) {
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const dayLabel = UTC_DAY_POSITION_LABEL[today.getUTCDay()];
  const dayValid = week[dayLabel];

  console.log(week, dayLabel, 'dayValid?', dayValid);

  let timeValid = false;

  intervals.some((interval) => {
    if (isBetweenInterval(interval, hours, minutes)) {
      timeValid = true;
      console.log('timeValid?', timeValid);
    }

    return false;
  });

  return dayValid && timeValid;
}

export {
  START_HOURS,
  START_MINUTES,
  END_HOURS,
  END_MINUTES,
  createInterval,
  isInBlockedPeriod,
  isBetweenInterval,
};
