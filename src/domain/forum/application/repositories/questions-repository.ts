import { Question } from '../../enterprise/entities/question'
import { PaginationParams } from '../../../../core/repositories/pagination-params'

export interface QuestionsRepository {
  create(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  delete(question: Question): Promise<void>
  findById(id: string): Promise<Question | null>
  save(question: Question): Promise<void>
  findManyRecent(params: PaginationParams): Promise<Question[]>
}
