import { tracked } from '@glimmer/tracking';
import Player from './Player';
import Strategy from './Strategy';

export interface GameState {
  iteration: number;
  p1Cooperated: boolean;
  p2Cooperated: boolean;
}

export default class Game {
  @tracked p1: Player;
  @tracked p2: Player;
  @tracked iteration = 0;
  @tracked gameStateHistory: Array<GameState> = [];

  constructor(p1Strategy: Strategy, p2Strategy: Strategy) {
    this.p1 = new Player('p1', p1Strategy);
    this.p2 = new Player('p2', p2Strategy);
  }

  get score() {
    return {
      p1: this.p1.score,
      p2: this.p2.score,
    };
  }

  get previousRound() {
    return this.gameStateHistory[this.gameStateHistory.length - 1];
  }

  // player 1 cooperates
  //   player 2 cooperates
  //     +2 / +2
  //   player 2 defects
  //     0 / +5
  // player 2 cooperates
  //   player 1 cooperates
  //     +2 / +2
  //   player 1 defects
  //     +5 / 0
  // player 1 defects
  //   player 2 defects
  //     +1 / +1
  calculatePayoff(p1Cooperated: boolean, p2Cooperated: boolean) {
    if (p1Cooperated && p2Cooperated) {
      this.p1.score = this.p1.score + 2;
      this.p2.score = this.p2.score + 2;
    }

    // p1 cooperates but p2 defects
    if (p1Cooperated && !p2Cooperated) {
      this.p2.score = this.p2.score + 5;
    }

    // p1 defects but p2 cooperates
    if (!p1Cooperated && p2Cooperated) {
      this.p1.score = this.p1.score + 5;
    }

    if (!p1Cooperated && !p2Cooperated) {
      this.p1.score = this.p1.score + 1;
      this.p2.score = this.p2.score + 1;
    }
  }

  run() {
    let p1Cooperated;
    let p2Cooperated;

    if (this.previousRound) {
      p1Cooperated = this.p1.cooperates(this.previousRound);
      p2Cooperated = this.p2.cooperates(this.previousRound);
    } else {
      p1Cooperated = this.p1.cooperates();
      p2Cooperated = this.p2.cooperates();
    }

    let gameState = {
      iteration: this.iteration,
      p1Cooperated,
      p2Cooperated,
    };

    console.log(gameState);

    this.gameStateHistory = [...this.gameStateHistory, gameState];

    this.calculatePayoff(p1Cooperated, p2Cooperated);

    this.iteration++;
  }
}
