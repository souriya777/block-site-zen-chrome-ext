import { writableLocalStorage } from '@options/js/store-utils';

const blacklist = writableLocalStorage('blacklist', []);

export { blacklist };
