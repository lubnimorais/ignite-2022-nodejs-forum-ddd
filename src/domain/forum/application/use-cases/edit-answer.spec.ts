import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

import { EditAnswerUseCase } from './edit-answer';

import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

// sut => system under test

describe('Edit answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();

    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should be able to edit a answer', async () => {
    const answerAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    );

    await inMemoryAnswersRepository.create(answerAnswer);

    await sut.execute({
      authorId: 'author-1',
      answerId: answerAnswer.id.toValue(),
      content: 'Conteúdo teste',
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Conteúdo teste',
    });
  });

  it('should not be able to edit a answer from another author', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    );

    await inMemoryAnswersRepository.create(newAnswer);

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerId: newAnswer.id.toValue(),
        content: 'Conteúdo teste',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
