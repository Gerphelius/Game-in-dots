import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameFieldComponent } from './game-field/game-field.component';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { FieldResizingDirective } from './game-field/field-resizing-directive/field-resizing.directive';

@NgModule({
  declarations: [
    GameFieldComponent, 
    GameMenuComponent, 
    LeaderBoardComponent, 
    FieldResizingDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GameFieldComponent, 
    GameMenuComponent, 
    LeaderBoardComponent,
  ]
})
export class FeaturesModule { }
