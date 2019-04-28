import { Component, Input, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Department, _assignatures } from 'client/data/categories';

interface Data {
  name: string;
  category: number;
}

@Component({
  selector: 'rankings',
  templateUrl: './rankings.component.html'
})
export class RankingsComponent implements OnInit {
  @ViewChild('wrapper', { read: ElementRef })
  wrapper: ElementRef;

  @Input()
  target: number;

  @Input()
  department: Department;

  boards: Data[] = [];

  ngOnInit() {
    for (const assignee of this.department.assignatures) {
      let category = -1;
      for (const group of assignee.groups) {
        if (group.links.includes(this.target)) {
          category = group.category;
          break;
        }
      }

      if (category > 0) {
        this.boards.push({
          name: _assignatures[assignee.id].name,
          category
        });
      }
    }
  }

  @HostListener('mousewheel', ['$event'])
  @HostListener('DOMMouseScroll', ['$event'])
  @HostListener('onmousewheel', ['$event'])
  scrollHorizontally($event) {
    if (window.innerWidth > 992) {
      const delta = Math.max(-1, Math.min(1, $event.wheelDelta || -$event.detail));
      this.wrapper.nativeElement.scrollLeft -= delta * 40;
      $event.preventDefault();
    }
  }
}
