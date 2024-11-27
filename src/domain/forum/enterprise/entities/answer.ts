import { Opcional } from '@/core/@types/opcional'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface AnswerProps {
  content: string
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  createAt: Date
  updateAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  static create(props: Opcional<AnswerProps, 'createAt'>, id?: UniqueEntityID) {
    const answer = new Answer(
      {
        ...props,
        createAt: new Date(),
      },
      id,
    )

    return answer
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get createAt() {
    return this.props.createAt
  }

  get updateAt() {
    return this.props.updateAt
  }

  private touch() {
    this.props.updateAt = new Date()
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }
}
