import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { CrawlDataModule } from './crawl-data/crawl-data.module';
import { DonationModule } from './donations/donation.module';
import { NewDraftModule } from './new-draft/new-draft.module';
import { UserModule } from './user/user.module';

export const MODULES = [CrawlDataModule, UserModule, AuthModule, NewDraftModule, DonationModule, CommentModule];
