import { AnswerQuestionUseCase } from '../answer-question'
import { AnswerRepository } from '../../repositories/answers-repository'
import { Answer } from '../../../enterprise/entities/answer'

const fakeAnswersRepository: AnswerRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (answer: Answer) => {},
}

test('create answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toBe('Nova resposta')
})
