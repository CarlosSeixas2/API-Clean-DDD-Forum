import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'
import { makeAnswer } from 'tests/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from '../choose-question-best-answer'
import { makeQuestion } from 'tests/factories/make-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should be able to choose question best answer', async () => {
    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose another user question best answer', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID('1'),
    })

    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await expect(async () => {
      return sut.execute({
        authorId: answer.authorId.toString(),
        answerId: '2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
