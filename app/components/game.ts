import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Game from '../lib/Game';
import { TotalAnnihilation, Pollyanna, TitForTat, TotallyRandom } from 'eoc/lib/strategies';

interface GameArgs {}

export default class GameComponent extends Component<GameArgs> {
  @tracked strategies = [TitForTat, TotallyRandom, TotalAnnihilation, Pollyanna];

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
