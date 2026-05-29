import type { NavigateFunction } from "react-router-dom";

//permite que o navigate do react-routes-dom funcione fora do react.

export let navigate: NavigateFunction | null = null;
export const setNavigate = (fn: NavigateFunction) => { navigate = fn; };