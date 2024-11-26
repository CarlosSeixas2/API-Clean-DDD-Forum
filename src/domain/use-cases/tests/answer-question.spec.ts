import { expect, test } from "vitest"
import { AnswerQuestion } from "../answer-question"
import { AnswerRepository } from "../../repositories/answers-repository"
import { Answer } from "../../entities/answer"

const fakeAnswersRepository: AnswerRepository = {
    create: async (answer: Answer) => {
        return
    }
}

test('create answer', async () => {
    const answerQuestion = new AnswerQuestion(fakeAnswersRepository)

    const answer = await answerQuestion.execute({
        questionId: '1',
        instructorId: '1',
        content: 'Nova resposta'
    })

    expect(answer.content).toBe('Nova resposta')
})