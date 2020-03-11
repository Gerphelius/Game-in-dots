import { 
  Directive,
  HostBinding,
  OnInit,
  Input
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appFieldResizing]'
})
export class FieldResizingDirective implements OnInit {

  @Input() colls: number;

  constructor(private sanitizer: DomSanitizer) {}

  @HostBinding('style.grid-template-columns') columns;

  ngOnInit() {
    this.columns = this.sanitizer.bypassSecurityTrustStyle(`repeat(${this.colls}, auto)`);
  }
}
