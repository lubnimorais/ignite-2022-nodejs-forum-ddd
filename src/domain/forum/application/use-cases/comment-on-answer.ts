import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswersRepository } from '../repositories/answers-repository';

interface CommentAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface CommentAnswerUseCaseResponse {
  answerComment: AnswerComment;
}

class CommentAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentAnswerUseCaseRequest): Promise<CommentAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error('Question not found.');
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    });

    await this.answerCommentsRepository.create(answerComment);

    return { answerComment };
  }
}

export { CommentAnswerUseCase };
