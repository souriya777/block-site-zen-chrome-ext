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
 * @param {import('@common/js/types').Interval[]} intervals
 * @returns {import('@common/js/types').Interval}
 */
function createInterval(intervals = null) {
  let latest = null;

  if (intervals) {
    latest = intervals.sort(sortIntervalsByAscendingStart).at(-1);
  }

  let hours = START_HOURS;
  let minutes = START_MINUTES;
  let endHours = END_HOURS;
  let endMinutes = END_MINUTES;

  if (latest) {
    hours = latest.end?.hours;
    minutes = latest.end?.minutes;

    endHours = hours <= 22 ? hours + 1 : 23;
    endMinutes = minutes;
  }

  const item = {
    id: crypto.randomUUID(),
    start: {
      hours,
      minutes,
    },
    end: {
      hours: endHours,
      minutes: endMinutes,
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

  const START_IN_MINUTES = start.hours * 60 + start.minutes;
  const END_IN_MINUTES = end.hours * 60 + end.minutes;
  const CURRENT_IN_MINUTES = hours * 60 + minutes;

  if (CURRENT_IN_MINUTES >= START_IN_MINUTES && CURRENT_IN_MINUTES <= END_IN_MINUTES) {
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

  let timeValid = false;

  intervals.some((interval) => {
    if (isBetweenInterval(interval, hours, minutes)) {
      timeValid = true;
    }

    return false;
  });

  return dayValid && timeValid;
}

/**
 * @param {import('@common/js/types').Interval} a
 * @param {import('@common/js/types').Interval} b
 * @returns {number}
 */
function sortIntervalsByAscendingStart(a, b) {
  if (!a || !b) {
    return 0;
  }

  const aMinutes = a.start.hours * 60 + a.start.minutes;
  const bMinutes = b.start.hours * 60 + b.start.minutes;

  return aMinutes < bMinutes ? -1 : 1;
}

export {
  START_HOURS,
  START_MINUTES,
  END_HOURS,
  END_MINUTES,
  createInterval,
  isInBlockedPeriod,
  isBetweenInterval,
  sortIntervalsByAscendingStart,
};
