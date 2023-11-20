const REGEX_VALID_URL = /^(https?:\/\/)?(www\.)?([a-z0-9-~_.]+)\.([a-z]{2,})/i;

export function isValidUrl(url) {
  return REGEX_VALID_URL.test(url);
}

/**
 * eg. https://www.facebook.com/events => facebook.com
 * @param {string} url
 */
export function extractDomain(url) {
  const result = url.match(REGEX_VALID_URL);
  return `${result?.[3]}.${result?.[4]}`;
}

export function isNotEmpty(str) {
  return str !== null && str !== undefined && typeof str === 'string' && str.trim().length > 0;
}

/**
 * @param {string} str
 * @returns {boolean}
 */
export function checkInterval(str) {
  return /^(?:[0-9]|[01]\d|2[0-3])[:h-]([0-5]\d|[0-9])$/i.test(str);
}
