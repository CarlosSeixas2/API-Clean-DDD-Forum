import { AnswerRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private questionRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const question = await this.questionRepository.findById(answerId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId) {
      throw new Error('You are not the author of this question')
    }

    await this.questionRepository.delete(question)

    return {}
  }
}
