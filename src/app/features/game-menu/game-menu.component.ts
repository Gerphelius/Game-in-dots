import { 
  Component, 
  OnInit, 
  OnDestroy 
} from '@angular/core';
import { Subscription } from 'rxjs';

import { GameLogicService } from 'src/app/shared/services/game-logic.service';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.scss']
})
export class GameMenuComponent implements OnInit, OnDestroy {
  isGameStarted = false;
  isFirstGame = true;
  subjSubscr: Subscription;

  constructor(private gameLogicService: GameLogicService) { }

  ngOnInit() {
    this.subjSubscr = this.gameLogicService.winnerSubject.subscribe(() => {
      this.isGameStarted = false;
      this.isFirstGame = false;
    })
  }

  startGame(): void {
    if (!this.isFirstGame) {
      this.gameLogicService.resetGameParams.emit();
    }

    this.isGameStarted = true;
    this.gameLogicService.startGame.emit();
  }

  ngOnDestroy() {
    this.subjSubscr.unsubscribe();
  }
}
