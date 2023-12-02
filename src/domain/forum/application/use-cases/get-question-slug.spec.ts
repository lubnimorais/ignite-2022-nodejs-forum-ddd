import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';

import { GetQuestionBySlug } from './get-question-by-slug';

import { makeQuestion } from 'test/factories/make-question';
import { Slug } from '../../enterprise/entities/values-objects/slug';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlug;

// sut => system under test

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();

    sut = new GetQuestionBySlug(inMemoryQuestionsRepository);
  });

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      slug: 'example-question',
    });

    expect(result.value?.question.id).toBeTruthy();
    expect(result.value?.question.title).toEqual(newQuestion.title);
  });
});
