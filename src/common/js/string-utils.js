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
