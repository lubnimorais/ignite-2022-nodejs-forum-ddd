import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface IGetQuestionBySlugUseCaseRequest {
  slug: string;
}

interface IGetQuestionBySlugUseCaseResponse {
  question: Question;
}

class GetQuestionBySlug {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: IGetQuestionBySlugUseCaseRequest): Promise<IGetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug);

    if (!question) {
      throw new Error('Question not found.');
    }

    return { question };
  }
}

export { GetQuestionBySlug };
