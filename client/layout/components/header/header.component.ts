import { Component, Input, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input()
  sidenav: MatSidenav;

  @HostListener('window:resize', ['$event'])
  onresize(_) {
    if (this.sidenav.opened && window.innerWidth > 992) { this.sidenav.close(); }
  }
}
