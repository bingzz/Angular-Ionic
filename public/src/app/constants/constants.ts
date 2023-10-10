export const apiURL = 'http://localhost:3000';
export const emailRegex = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$';

export function randomizer(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
