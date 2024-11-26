import { Answer } from "../entities/answer";
import { AnswerRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
    instructorId: string;
    questionId: string;
    content: string;
}

export class AnswerQuestion {
    constructor(
        private answersRepository: AnswerRepository,
    ){}

    async execute({instructorId, questionId, content}: AnswerQuestionUseCaseRequest){
        const answer = new Answer({
            authorId: instructorId,
            content,
            questionId
        }, instructorId)

        await this.answersRepository.create(answer)

        return answer
    }
}