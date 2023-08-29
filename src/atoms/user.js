import {atom} from 'jotai';

export const userAtom = atom({
    username: '',
    isLogged: false,
    token: null
});