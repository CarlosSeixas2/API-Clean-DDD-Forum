import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Comment, CommentProps } from './comment'
import { Opcional } from '@/core/@types/opcional'

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityID
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  static create(
    props: Opcional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    return new QuestionComment(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )
  }

  get questionId() {
    return this.props.questionId
  }
}
