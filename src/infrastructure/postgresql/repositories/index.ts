import { PostRepository } from './post.repository';
import { AccountRepository } from './account.repository';

export default [AccountRepository, PostRepository];

export { AccountRepository as UserRepository, PostRepository };
