import { getLocalStorage } from './storageUtil';

export let isAuthenticated = () => {
  return getLocalStorage('user')==='reiyaz';
};
