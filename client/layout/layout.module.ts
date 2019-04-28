import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, LayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutRoutingModule,

    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule
  ],
  bootstrap: [LayoutComponent]
})
export class LayoutModule {}
