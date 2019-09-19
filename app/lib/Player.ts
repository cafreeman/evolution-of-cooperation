import { tracked } from '@glimmer/tracking';
import { GameState } from './Game';
import Strategy, { StrategyOutcome } from './Strategy';

type PlayerName = 'p1' | 'p2';

export interface PlayerSpecificGameState {
  iteration: number;
  yourLastMove: boolean;
  theirLastMove: boolean;
  notes: Dict<any>;
}

export default class Player {
  @tracked name: PlayerName;
  @tracked score: number = 0;
  @tracked strategy: Strategy;
  @tracked notes: Dict<any> = {};

  constructor(name: PlayerName, strategy: Strategy) {
    this.name = name;
    this.strategy = strategy;
  }

  cooperates(state?: GameState): boolean {
    let response: boolean;
    let outcome: StrategyOutcome;

    if (state) {
      let gameState: PlayerSpecificGameState = {
        iteration: state.iteration,
        yourLastMove: this.name === 'p1' ? state.p1Cooperated : state.p2Cooperated,
        theirLastMove: this.name === 'p1' ? state.p2Cooperated : state.p1Cooperated,
        notes: this.notes,
      };

      outcome = this.strategy.impl(gameState);
    } else {
      outcome = this.strategy.impl();
    }

    if (Array.isArray(outcome)) {
      const [cooperated, notes] = outcome;
      response = cooperated;
      this.notes = notes;
    } else {
      response = outcome;
    }

    return response;
  }

  reset() {
    this.score = 0;
    this.notes = {};
  }
}
