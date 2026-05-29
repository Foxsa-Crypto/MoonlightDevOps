export let logoutFn: (() => void) | null = null;
export const setLogoutFn = (fn: () => void) => { logoutFn = fn; };