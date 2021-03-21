import { AuthStateInterface } from '../../auth/types/authState.interface';
import { FeedStateInterface } from '../modules/feed/types/feedState.interface';
import { PopularTagsService } from '../modules/popularTags/services/popularTags.service';
import { ArticleStateInterface } from '../../article/types/articleState.interface';

export interface AppStateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
  popularTags: PopularTagsService;
  article: ArticleStateInterface;
}
