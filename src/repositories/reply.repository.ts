import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Reply, ReplyRelations, Comment} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CommentRepository} from './comment.repository';

export class ReplyRepository extends DefaultCrudRepository<
  Reply,
  typeof Reply.prototype.id,
  ReplyRelations
> {

  public readonly comment: BelongsToAccessor<Comment, typeof Reply.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CommentRepository') protected commentRepositoryGetter: Getter<CommentRepository>,
  ) {
    super(Reply, dataSource);
    this.comment = this.createBelongsToAccessorFor('comment', commentRepositoryGetter,);
    this.registerInclusionResolver('comment', this.comment.inclusionResolver);
  }
}
