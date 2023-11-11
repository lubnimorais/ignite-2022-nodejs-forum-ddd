import { Answer } from '@/domain/forum/enterprise/entities/answer';

interface AnswersRepository {
  create(answer: Answer): Promise<void>;
}

export { AnswersRepository };
