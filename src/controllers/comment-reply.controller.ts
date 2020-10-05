import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Comment,
  Reply,
} from '../models';
import {CommentRepository} from '../repositories';

export class CommentReplyController {
  constructor(
    @repository(CommentRepository) protected commentRepository: CommentRepository,
  ) { }

  @get('/comments/{id}/replies', {
    responses: {
      '200': {
        description: 'Array of Comment has many Reply',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reply)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Reply>,
  ): Promise<Reply[]> {
    return this.commentRepository.replies(id).find(filter);
  }

  @post('/comments/{id}/replies', {
    responses: {
      '200': {
        description: 'Comment model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reply)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Comment.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reply, {
            title: 'NewReplyInComment',
            exclude: ['id'],
            optional: ['commentId']
          }),
        },
      },
    }) reply: Omit<Reply, 'id'>,
  ): Promise<Reply> {
    return this.commentRepository.replies(id).create(reply);
  }

  @patch('/comments/{id}/replies', {
    responses: {
      '200': {
        description: 'Comment.Reply PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reply, {partial: true}),
        },
      },
    })
    reply: Partial<Reply>,
    @param.query.object('where', getWhereSchemaFor(Reply)) where?: Where<Reply>,
  ): Promise<Count> {
    return this.commentRepository.replies(id).patch(reply, where);
  }

  @del('/comments/{id}/replies', {
    responses: {
      '200': {
        description: 'Comment.Reply DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Reply)) where?: Where<Reply>,
  ): Promise<Count> {
    return this.commentRepository.replies(id).delete(where);
  }
}
