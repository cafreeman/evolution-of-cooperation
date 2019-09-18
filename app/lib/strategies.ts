import Strategy from './Strategy';
import { GameState } from './Game';

const titForTat = (state: GameState) => {
  if (state.iteration === 0) {
    return true;
  }

  if (state.p2Cooperated) {
    return true;
  }

  return false;
};

const totallyRandom = () => {
  let v = Math.floor(Math.random() * Math.floor(100));

  if (v % 2 === 0) {
    return true;
  }

  return false;
};

export const TitForTat = new Strategy('Tit For Tat', titForTat);
export const TotallyRandom = new Strategy('Totally Random', totallyRandom);
export const TotalAnnihilation = new Strategy('Total Annihilation', () => false);
export const Pollyanna = new Strategy('Pollyanna', () => true);
