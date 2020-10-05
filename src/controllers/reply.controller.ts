import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {Comment, Reply} from '../models';
import {ReplyRepository} from '../repositories';

export class ReplyController {
  constructor(
    @repository(ReplyRepository)
    public replyRepository: ReplyRepository,
  ) {}

  @post('/replies', {
    responses: {
      '200': {
        description: 'Reply model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reply)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reply, {
            title: 'NewReply',
            exclude: ['id'],
          }),
        },
      },
    })
    reply: Omit<Reply, 'id'>,
  ): Promise<Reply> {
    return this.replyRepository.create(reply);
  }

  @get('/replies/count', {
    responses: {
      '200': {
        description: 'Reply model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Reply) where?: Where<Reply>): Promise<Count> {
    return this.replyRepository.count(where);
  }

  @get('/replies', {
    responses: {
      '200': {
        description: 'Array of Reply model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Reply, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Reply) filter?: Filter<Reply>): Promise<Reply[]> {
    return this.replyRepository.find(filter);
  }

  @patch('/replies', {
    responses: {
      '200': {
        description: 'Reply PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reply, {partial: true}),
        },
      },
    })
    reply: Reply,
    @param.where(Reply) where?: Where<Reply>,
  ): Promise<Count> {
    return this.replyRepository.updateAll(reply, where);
  }

  @get('/replies/{id}', {
    responses: {
      '200': {
        description: 'Reply model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Reply, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Reply, {exclude: 'where'})
    filter?: FilterExcludingWhere<Reply>,
  ): Promise<Reply> {
    return this.replyRepository.findById(id, filter);
  }

  @patch('/replies/{id}', {
    responses: {
      '204': {
        description: 'Reply PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reply, {partial: true}),
        },
      },
    })
    reply: Reply,
  ): Promise<void> {
    await this.replyRepository.updateById(id, reply);
  }

  @put('/replies/{id}', {
    responses: {
      '204': {
        description: 'Reply PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() reply: Reply,
  ): Promise<void> {
    await this.replyRepository.replaceById(id, reply);
  }

  @del('/replies/{id}', {
    responses: {
      '204': {
        description: 'Reply DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.replyRepository.deleteById(id);
  }

  @get('/replies/{id}/comment', {
    responses: {
      '200': {
        description: 'Comment belonging to Reply',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comment)},
          },
        },
      },
    },
  })
  async getComment(
    @param.path.number('id') id: typeof Reply.prototype.id,
  ): Promise<Comment> {
    return this.replyRepository.comment(id);
  }
}
