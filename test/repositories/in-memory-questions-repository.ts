import { Question } from '@/domain/forum/enterprise/entities/question';

import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { IPaginationParams } from '@/core/repositories/pagination-params';
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository';

class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  constructor(
    private questionAttachmentRepository: QuestionAttachmentsRepository,
  ) {}

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

  async findManyRecent({ page }: IPaginationParams): Promise<Question[]> {
    const questions = this.items
      .sort(
        (itemA, itemB) => itemB.createdAt.getTime() - itemA.createdAt.getTime(),
      )
      .slice((page - 1) * 20, page * 20);

    return questions;
  }

  async save(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id);

    this.items[itemIndex] = question;
  }

  async delete(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id);

    // remove elemento do array
    this.items.splice(itemIndex, 1);

    this.questionAttachmentRepository.deleteManyByQuestionId(
      question.id.toString(),
    );
  }
}

export { InMemoryQuestionsRepository };
