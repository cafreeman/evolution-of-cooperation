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
