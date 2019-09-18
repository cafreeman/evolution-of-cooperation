import Game, { GameState } from '../lib/Game';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Strategy from 'eoc/lib/Strategy';

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

interface GameArgs {}

export default class GameComponent extends Component<GameArgs> {
  @tracked strategies = [
    new Strategy('Tit For Tat', titForTat),
    new Strategy('Totally Random', totallyRandom),
  ];

  @tracked game = new Game(this.strategies[0], this.strategies[0]);

  @action
  play() {
    this.game.run();
  }

  @action
  updateP1Strategy(value: string) {
    let selectedStrategy = this.strategies.find(v => v.name === value);
    if (selectedStrategy) {
      this.game.p1.strategy = selectedStrategy;
    }
  }

  @action
  updateP2Strategy(value: string) {
    let selectedStrategy = this.strategies.find(v => v.name === value);
    if (selectedStrategy) {
      this.game.p2.strategy = selectedStrategy;
    }
  }
}
