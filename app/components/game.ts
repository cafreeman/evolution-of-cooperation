import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import {
  MassiveRetaliation,
  Pollyanna,
  TitForTat,
  TotalAnnihilation,
  TotallyRandom,
} from 'eoc/lib/strategies';
import Game from '../lib/Game';

interface GameArgs {}

const wait = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

export default class GameComponent extends Component<GameArgs> {
  @tracked strategies = [
    TitForTat,
    TotallyRandom,
    TotalAnnihilation,
    Pollyanna,
    MassiveRetaliation,
  ];

  @tracked game = new Game(this.strategies[0], this.strategies[0]);

  @action
  async play() {
    console.log('play');
    this.game.run();

    for (let i = 0; i < 20; i++) {
      console.log('on iteration ', i);
      await wait(500);
      this.game.run();
    }
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
