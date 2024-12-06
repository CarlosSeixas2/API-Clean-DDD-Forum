import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Comment, CommentProps } from './comment'
import { Opcional } from '@/core/@types/opcional'

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityID
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  static create(
    props: Opcional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    return new AnswerComment(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )
  }

  get answerId() {
    return this.props.answerId
  }
}
