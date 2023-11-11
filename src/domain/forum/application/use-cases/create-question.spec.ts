import { QuestionsRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';
import { CreateQuestionUseCase } from './create-question';

const fakeQuestionsRepository: QuestionsRepository = {
  async create(question: Question): Promise<void> {},
};

test('create a question', async () => {
  const createQuestionUseCase = new CreateQuestionUseCase(
    fakeQuestionsRepository,
  );

  const { question } = await createQuestionUseCase.execute({
    authorId: '1',
    title: 'Nova pergunta',
    content: 'Conteúdo da pergunta',
  });

  expect(question.id).toBeTruthy();
});