import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface IFetchQuestionsAnswerUseCaseRequest {
  questionId: string;
  page: number;
}

interface IFetchQuestionsAnswerUseCaseResponse {
  answers: Answer[];
}

class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: IFetchQuestionsAnswerUseCaseRequest): Promise<IFetchQuestionsAnswerUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    );

    return { answers };
  }
}

export { FetchQuestionAnswersUseCase };
