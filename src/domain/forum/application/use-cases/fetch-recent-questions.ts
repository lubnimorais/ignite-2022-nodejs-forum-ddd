import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface IFetchRecentQuestionsUseCaseRequest {
  page: number;
}

interface IFetchRecentQuestionsUseCaseResponse {
  questions: Question[];
}

class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: IFetchRecentQuestionsUseCaseRequest): Promise<IFetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page });

    return { questions };
  }
}

export { FetchRecentQuestionsUseCase };
