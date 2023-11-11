import { Question } from '@/domain/forum/enterprise/entities/question';

import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';

class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  async create(question: Question): Promise<void> {
    this.items.push(question);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug);

    if (!question) {
      return null;
    }

    return question;
  }

  async findById(questionId: string): Promise<Question | null> {
    const question = this.items.find(
      (item) => item.id.toString() === questionId,
    );

    if (!question) {
      return null;
    }

    return question;
  }

  async delete(question: Question): Promise<void> {
    const index = this.items.findIndex((item) => item.id === question.id);

    // remove elemento do array
    this.items.splice(index, 1);
  }
}

export { InMemoryQuestionsRepository };
