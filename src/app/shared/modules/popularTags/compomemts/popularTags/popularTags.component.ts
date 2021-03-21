import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getPopularTagsAction } from '../../store/actions/getPopularTags';
import { Observable } from 'rxjs';
import { PopularTagType } from '../../../../types/popularTag.type';
import {
  errorSelector,
  isLoadingSelector,
  popularTagsSelector,
} from '../../store/selectors';
@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popularTags.component.html',
  styleUrls: ['./popularTags.component.scss'],
})
export class PopularTagsComponent implements OnInit {
  popularTags$: Observable<PopularTagType[] | null>;
  error$: Observable<string | null>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store) {}

  initValues(): void {
    this.popularTags$ = this.store.pipe(select(popularTagsSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }

  fetchData(): void {
    this.store.dispatch(getPopularTagsAction());
  }

  ngOnInit(): void {
    this.initValues();
    this.fetchData();
  }
}
