import { Question } from '@/domain/forum/enterprise/entities/question';

interface QuestionsRepository {
  create(question: Question): Promise<void>;
}

export { QuestionsRepository };
