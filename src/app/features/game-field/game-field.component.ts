import {
  Component,
  ViewChildren,
  ElementRef,
  QueryList,
  AfterViewInit,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Colors } from '../../app-game-config';
import { GameLogicService } from '../../shared/services/game-logic.service';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent implements OnInit, AfterViewInit, OnDestroy {
  field: null[];
  numOfColls: number;
  arrayOfCells: ElementRef[];
  randPaintedCell: ElementRef;
  timerId: ReturnType<typeof setTimeout>;
  winner: string;
  subjSubscr: Subscription;
  colors = Colors;

  constructor(private gameLogicService: GameLogicService) {
    this.field = this.gameLogicService.gameField;
  }

  @ViewChildren('cell') cellsList: QueryList<ElementRef>;

  ngOnInit() {
    this.subjSubscr = this.gameLogicService.winnerSubject.subscribe((winner: string) => {
      this.winner = winner;
    });
    this.gameLogicService.startGame.subscribe(() => {
      this.paintRandCell();
    });
    this.gameLogicService.resetGameParams.subscribe(() => {
      this.resetGame();
    });
  }

  ngAfterViewInit() {
    this.arrayOfCells = this.cellsList.toArray();
  }

  changeCellColor(targetElem: HTMLElement, color: string): void {
    const elemBackground = this.getElemBackground(targetElem);

    if (elemBackground === Colors.Cyan) {
      clearTimeout(this.timerId);
      this.gameLogicService.changeScore(color);
      this.setElemBackground(targetElem, color);
      this.deleteElemFromCellsArr(this.randPaintedCell.nativeElement);
      this.paintRandCell();
    }
  }

  private paintRandCell(): void {
    this.gameLogicService.checkWinner();
    
    if (!this.winner) {
      const max = this.arrayOfCells.length - 1;
      const randNum = Math.floor(Math.random() * (max + 1));

      this.randPaintedCell = this.arrayOfCells[randNum];
      this.setElemBackground(this.arrayOfCells[randNum].nativeElement, Colors.Cyan);
      this.timerId = setTimeout(() => {
        this.changeCellColor(this.randPaintedCell.nativeElement, Colors.Red);
      }, this.gameLogicService.gameSettings.delayMs);
    }
  }

  private resetGame(): void {
    this.arrayOfCells = this.cellsList.toArray();
    this.gameLogicService.resetGame();

    this.arrayOfCells.forEach((elem: ElementRef) => {
      elem.nativeElement.style.backgroundColor = 'transparent';
    });
  }

  private deleteElemFromCellsArr(elem: HTMLElement): void {  // TODO: refactor this method
    const index = this.arrayOfCells.findIndex((elemRef: ElementRef) => {
      return elemRef.nativeElement.id === elem.id
    });

    this.arrayOfCells.splice(index, 1);
  }

  private setElemBackground(elem: HTMLElement, color: string): void {
    elem.style.backgroundColor = color;
  }

  private getElemBackground(elem: HTMLElement): string {
    return elem.style.backgroundColor;
  }

  ngOnDestroy() {
    clearTimeout(this.timerId);
    this.subjSubscr.unsubscribe();
  }
}
