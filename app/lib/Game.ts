import { tracked } from '@glimmer/tracking';
import Player from './Player';

export interface GameState {
  iteration: number;
  p1Cooperated: boolean;
  p2Cooperated: boolean;
}

export interface InitialGameState {
  iteration: number;
}

const p1Strategy = (state: GameState) => {
  if (state.p2Cooperated) {
    return true;
  }

  return false;
};

const p2Strategy = (state: GameState) => {
  console.log('iteration', state.iteration);
  if (state.iteration % 2 === 0) {
    return true;
  }

  return false;
};

export default class Game {
  p1: Player;
  p2: Player;
  @tracked iteration = 0;
  @tracked gameStateHistory: Array<GameState> = [];

  constructor() {
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
  //     -1 / -1
  //   player 2 defects
  //     -3 / 0
  // player 2 cooperates
  //   player 1 cooperates
  //     -1 / -1
  //   player 1 defects
  //     0 / -3
  calculatePayoff(p1Cooperated: boolean, p2Cooperated: boolean) {
    if (p1Cooperated && p2Cooperated) {
      this.p1.score = this.p1.score + 1;
      this.p2.score = this.p2.score + 1;
    }

    if (p1Cooperated && !p2Cooperated) {
      this.p2.score = this.p2.score + 3;
    }

    if (!p1Cooperated && p2Cooperated) {
      this.p1.score = this.p1.score + 3;
    }
  }

  run() {
    let p1Cooperated;
    let p2Cooperated;

    if (this.previousRound) {
      p1Cooperated = this.p1.cooperates(this.previousRound);
      p2Cooperated = this.p2.cooperates(this.previousRound);
    } else {
      p1Cooperated = this.p1.cooperates({ iteration: this.iteration });
      p2Cooperated = this.p2.cooperates({ iteration: this.iteration });
    }

    let gameState = {
      iteration: this.iteration,
      p1Cooperated,
      p2Cooperated,
    };

    console.log(gameState);

    this.gameStateHistory = [...this.gameStateHistory, gameState];

    // this.gameStateHistory.push(gameState);

    // this.gameStateHistory = this.gameStateHistory;

    this.calculatePayoff(p1Cooperated, p2Cooperated);

    this.iteration++;
  }
}
