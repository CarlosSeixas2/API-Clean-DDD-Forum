import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Comment, CommentProps } from './comment'

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityID
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  static create(props: AnswerCommentProps, id?: UniqueEntityID) {
    return new AnswerComment(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )
  }

  get answerId() {
    return this.props.answerId
  }
}
