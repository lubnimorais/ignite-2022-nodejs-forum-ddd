import { Slug } from "./values-objects/slug";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";

interface QuestionProps {
  authorId: UniqueEntityId
  bestAnswerId?: UniqueEntityId
  title: string,
  content: string,
  slug: Slug,
  createdAt: Date
  updatedAt?: Date
}

class Question extends Entity<QuestionProps> {}

export { Question }