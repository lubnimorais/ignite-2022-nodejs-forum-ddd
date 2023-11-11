import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

import { AnswerQuestionUseCase } from './answer-question-use-case';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Create answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();

    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Nova resposta',
    });

    expect(answer.content).toEqual('Nova resposta');
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id);
  });
});
