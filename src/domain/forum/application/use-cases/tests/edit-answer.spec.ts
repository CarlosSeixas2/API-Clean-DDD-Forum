import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditAnswerUseCase } from '../edit-answer'
import { makeAnswer } from 'tests/factories/make-answer'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeAnswer(
      {
        authorId: new UniqueEntityID('1'),
      },
      new UniqueEntityID('1'),
    )

    await inMemoryAnswerRepository.create(newQuestion)

    await sut.execute({
      answerId: '1',
      authorId: '1',
      content: 'New content',
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'New content',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeAnswer(
      {
        authorId: new UniqueEntityID('1'),
      },
      new UniqueEntityID('1'),
    )

    await inMemoryAnswerRepository.create(newQuestion)

    await expect(async () => {
      return sut.execute({
        answerId: '1',
        authorId: '2',
        content: 'New title',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
