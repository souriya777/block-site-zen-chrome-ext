export function isValidUrl(url) {
  return /^(https?:\/\/)?(www\.)?([a-z0-9-~_.]+)\.([a-z]{2,})/i.test(url);
}

/**
 * eg. https://www.facebook.com/events => facebook.com/events
 * @param {string} url
 */
export function cleanUrl(url) {
  const result = url.match(/^(https?:\/\/)?(www\.)?(.*)/i);
  return result?.[3];
}
