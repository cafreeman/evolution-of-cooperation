import { tracked } from '@glimmer/tracking';
import { GameState } from './Game';
import Strategy from './Strategy';

export default class Player {
  @tracked name: string;
  @tracked score: number = 0;
  @tracked strategy: Strategy;

  constructor(name: string, strategy: Strategy) {
    this.name = name;
    this.strategy = strategy;
  }

  cooperates(state: GameState) {
    return this.strategy.impl(state);
  }
}
