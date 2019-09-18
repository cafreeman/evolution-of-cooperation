import { GameState } from './Game';

type StrategyImpl = (state: GameState) => boolean;

export default class Strategy {
  name: string;
  impl: (state: GameState) => boolean;

  constructor(name: string, impl: StrategyImpl) {
    this.name = name;
    this.impl = impl;
  }
}
