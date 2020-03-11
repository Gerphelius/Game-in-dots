import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { DefaultSettings, Colors } from '../../app-game-config';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {
  gameSettings = Object.assign(DefaultSettings);
  winnerSubject = new Subject();
  resetGameParams = new EventEmitter();
  startGame = new EventEmitter();
  gameField = new Array(this.gameSettings.numOfColls ** 2);

  constructor(private httpService: HttpService) {}

  changeScore(color: string): void {
    if (color === Colors.Green) {
      this.gameSettings.playerScore++;
    } else {
      this.gameSettings.computerScore++;
    }
  }

  checkWinner(): void {
    const winCond = Math.floor(this.gameField.length / 2) + 1;
   
    if (this.gameSettings.playerScore === winCond || this.gameSettings.computerScore === winCond) {
      const winner = this.gameSettings.playerScore === winCond ? 'player' : 'computer';
      this.winnerSubject.next(winner);
    } else if (this.gameSettings.playerScore + this.gameSettings.computerScore === this.gameField.length) {
      this.winnerSubject.next('draw');
    }
  }

  resetGame() {
    this.gameSettings = Object.assign(DefaultSettings);
    this.winnerSubject.next('');
  }
}
