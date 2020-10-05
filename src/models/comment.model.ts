import {Entity, hasMany, model, property} from '@loopback/repository';
import {Reply, ReplyWithRelations} from './reply.model';

@model()
export class Comment extends Entity {
  @property({
    id: true,
    type: 'number',
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  cuser: string;

  @property({
    type: 'date',
    generated: true,
    defaultFn: 'now',
  })
  ctime: string;

  @property({
    type: 'string',
    required: true,
  })
  ctext: string;

  @hasMany(() => Reply)
  replies: Reply[];

  constructor(data?: Partial<Comment>) {
    super(data);
  }
}

export interface CommentRelations {
  // describe navigational properties here
  replies?: ReplyWithRelations[];
}

export type CommentWithRelations = Comment & CommentRelations;
