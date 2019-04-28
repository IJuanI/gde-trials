import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';

import { FAQComponent } from './components/faq/faq.component';
import { ItemComponent } from './components/item/item.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { RankingsComponent } from './components/rankings/rankings.component';
import { RankingsService } from 'client/services/rankings.service';

import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { RecentComponent } from './components/recent/recent.component';

@NgModule({
    declarations: [
        DashboardComponent,
        RankingsComponent,
        LeaderboardComponent,
        ItemComponent,
        FAQComponent,
        RecentComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        HttpClientModule,

        MatTabsModule,
        MatToolbarModule,
        MatListModule,
        MatProgressBarModule,
        MatBadgeModule,
        MatButtonModule,
        MatDividerModule,

        PerfectScrollbarModule
    ],
    entryComponents: [DashboardComponent],
    providers: [RankingsService]
})
export class DashboardModule {}
