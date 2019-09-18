import Game from '../lib/Game';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

interface GameArgs {}

export default class GameComponent extends Component<GameArgs> {
  @tracked game = new Game();

  @action
  play() {
    this.game.run();
  }
}
