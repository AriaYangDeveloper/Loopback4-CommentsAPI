import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Comment, CommentWithRelations} from './comment.model';

@model({
  settings: {
    foreignKeys: {
      fk_reply_comment: {
        name: 'fk_reply_commentId',
        entity: 'Comment',
        entityKey: 'id',
        foreignKey: 'commentId',
      },
    },
  },
})
export class Reply extends Entity {
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
  ruser: string;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  rtime: string;

  @property({
    type: 'string',
    generated: true,
    defaultFn: 'now',
  })
  rtext: string;

  @belongsTo(() => Comment)
  commentId: number;

  constructor(data?: Partial<Reply>) {
    super(data);
  }
}

export interface ReplyRelations {
  // describe navigational properties here
  comment?: CommentWithRelations;
}

export type ReplyWithRelations = Reply & ReplyRelations;
