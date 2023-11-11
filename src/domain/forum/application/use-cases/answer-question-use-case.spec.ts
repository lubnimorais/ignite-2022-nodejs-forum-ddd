import { AnswerQuestionUseCase } from './answer-question-use-case';
import { AnswersRepository } from '../repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

const fakeAnswersRepository: AnswersRepository = {
  async create(answer: Answer): Promise<void> {},
};

test('create a answer', async () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase(
    fakeAnswersRepository,
  );

  const answer = await answerQuestionUseCase.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Nova resposta',
  });

  expect(answer.content).toEqual('Nova resposta');
});
