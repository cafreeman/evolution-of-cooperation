import { tracked } from '@glimmer/tracking';
import { GameState, InitialGameState } from './Game';

type Strategy = (state: GameState | InitialGameState) => boolean;

export default class Player {
  @tracked name: string;
  @tracked score: number = 0;
  strategy: Strategy;

  constructor(name: string, strategy: Strategy) {
    this.name = name;
    this.strategy = strategy;
  }

  cooperates(state: GameState | InitialGameState) {
    return this.strategy(state);
  }
}
