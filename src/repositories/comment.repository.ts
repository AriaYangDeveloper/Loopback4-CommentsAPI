import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Comment, CommentRelations, Reply} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ReplyRepository} from './reply.repository';

export class CommentRepository extends DefaultCrudRepository<
  Comment,
  typeof Comment.prototype.id,
  CommentRelations
> {

  public readonly replies: HasManyRepositoryFactory<Reply, typeof Comment.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ReplyRepository') protected replyRepositoryGetter: Getter<ReplyRepository>,
  ) {
    super(Comment, dataSource);
    this.replies = this.createHasManyRepositoryFactoryFor('replies', replyRepositoryGetter,);
    this.registerInclusionResolver('replies', this.replies.inclusionResolver);
  }
}
