import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Ranked } from '../models/ranked';
import { retry, tap } from 'rxjs/operators';
import api from 'client/data/api';

@Injectable()
export class RankingsService {
  cache: { [category: number]: Ranked[] } = {};

  constructor(private http: HttpClient) {}

  getLeaderboard(category: number): Observable<Ranked[]> {
    if (this.cache[category]) {
      return of(this.cache[category]);
    }
    return this.http.get<Ranked[]>(api.rankings, { params: { category: '' + category } }).pipe(
      retry(2),
      tap(ranks => (this.cache[category] = ranks))
    );
  }
}
