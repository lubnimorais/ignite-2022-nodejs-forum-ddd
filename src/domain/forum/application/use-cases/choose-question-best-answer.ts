import { AnswersRepository } from '../repositories/answers-repository';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface IChooseQuestionBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

interface IChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}

class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    authorId,
    answerId,
  }: IChooseQuestionBestAnswerUseCaseRequest): Promise<IChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error('Answer not found.');
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    );

    if (!question) {
      throw new Error('Question not found.');
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.');
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.save(question);

    return { question };
  }
}

export { ChooseQuestionBestAnswerUseCase };
