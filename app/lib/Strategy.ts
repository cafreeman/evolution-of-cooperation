import { PlayerSpecificGameState } from './Player';

export type StrategyOutcome = boolean | [boolean, Dict<any>];
type StrategyImpl = (state?: PlayerSpecificGameState) => StrategyOutcome;

export default class Strategy {
  name: string;
  impl: StrategyImpl;

  constructor(name: string, impl: StrategyImpl) {
    this.name = name;
    this.impl = impl;
  }
}
