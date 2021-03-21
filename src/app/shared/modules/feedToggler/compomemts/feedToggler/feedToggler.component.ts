import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { isLoggedInSelector } from '../../../../../auth/store/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feedToggler.component.html',
  styleUrls: ['./feedToggler.component.scss'],
})
export class FeedTogglerComponent implements OnInit, OnDestroy {
  @Input('tagName') tagNameProps: string | null;

  isLoggedIn$: Observable<boolean>;
  constructor(private store: Store) {}

  initValues(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }

  ngOnInit(): void {
    this.initValues();
  }
  ngOnDestroy(): void {}
}
