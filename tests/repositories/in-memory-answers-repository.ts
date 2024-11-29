import { AnswerRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswerRepository {
  public items: Answer[] = []

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    )

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string) {
    return this.items.find((item) => item.id.toString() === id) ?? null
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === answer.id,
    )

    this.items[itemIndex] = answer
  }
}
