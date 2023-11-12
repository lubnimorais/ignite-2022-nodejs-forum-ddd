import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer';

import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ChooseQuestionBestAnswerUseCase;

// sut => system under test

describe('Choose question best answer', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository();

    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    );
  });

  it('should be able to choose the question best answer', async () => {
    const question = makeQuestion();

    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionsRepository.create(question);

    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      authorId: question.authorId.toString(),
      answerId: answer.id.toString(),
    });

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
      answer.id,
    );
  });

  it('should not be able to choose another author question best answer', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    });

    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionsRepository.create(question);

    await inMemoryAnswersRepository.create(answer);

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerId: answer.id.toString(),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});