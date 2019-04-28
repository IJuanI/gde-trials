import { Component, ViewChild, ElementRef, AfterContentChecked, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements AfterContentInit, AfterContentChecked {
  @ViewChild('header', { read: ElementRef }) headerView: ElementRef;
  private height: number;
  private dirty: boolean;

  constructor() {}

  ngAfterContentInit() {
    this.height = this.headerView.nativeElement.offsetHeight;
  }

  ngAfterContentChecked() {
    if (this.dirty) {
      this.height = this.headerView.nativeElement.offsetHeight;
      this.dirty = false;
    }
  }

  get headerHeight() {
    this.dirty = true;
    return this.height;
  }
}
