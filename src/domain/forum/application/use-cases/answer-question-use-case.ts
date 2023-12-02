import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';
import { Either, right } from '@/core/either';

interface IAnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

type IAnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer;
  }
>;

class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: IAnswerQuestionUseCaseRequest): Promise<IAnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    });

    await this.answersRepository.create(answer);

    return right({ answer });
  }
}

export { AnswerQuestionUseCase };
