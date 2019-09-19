import { PlayerSpecificGameState } from './Player';
import Strategy, { StrategyOutcome } from './Strategy';

const titForTat = (state?: PlayerSpecificGameState) => {
  if (!state) {
    return true;
  }

  if (state.theirLastMove) {
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

const massiveRetaliation = (state?: PlayerSpecificGameState): StrategyOutcome => {
  if (!state) {
    return true;
  }

  if (state.notes.theyEverDefected) {
    // NO QUARTER
    return false;
  }

  // If they defected, we make a note of it and defect ourselves
  if (!state.theirLastMove) {
    return [
      false,
      {
        theyEverDefected: true,
      },
    ];
  }

  return true;
};

export const TitForTat = new Strategy('Tit For Tat', titForTat);
export const TotallyRandom = new Strategy('Totally Random', totallyRandom);
export const TotalAnnihilation = new Strategy('Total Annihilation', () => false);
export const Pollyanna = new Strategy('Pollyanna', () => true);
export const MassiveRetaliation = new Strategy('Massive Retaliation', massiveRetaliation);
