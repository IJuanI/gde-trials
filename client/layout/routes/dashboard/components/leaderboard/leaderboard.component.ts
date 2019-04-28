import { Component, Input, OnInit } from '@angular/core';
import { RankingsService } from 'client/services/rankings.service';
import { Ranked } from 'client/models/ranked';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'leaderboard',
  templateUrl: './leaderboard.component.html'
})
export class LeaderboardComponent implements OnInit {
  @Input()
  name: string;

  @Input()
  category: number;

  loading = true;
  ranks: Ranked[] = [];

  constructor(private rankings: RankingsService) {}

  ngOnInit() {
    this.rankings
      .getLeaderboard(this.category)
      .pipe(tap(_ => (this.loading = false)))
      .subscribe(ranks => (this.ranks = ranks));
  }
}
