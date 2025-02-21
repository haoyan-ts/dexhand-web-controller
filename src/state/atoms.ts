import { atom } from 'jotai';

export const currentPageAtom = atom<string>('home'); // Default to 'home' page


export const robotIdAtom = atom<string>('empty');
export const robotConnectionStatusAtom = atom<string>('disconnected');
export const availibleRobotsAtom = atom<string[]>([]);
