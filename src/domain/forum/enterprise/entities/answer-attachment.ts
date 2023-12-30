import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

interface IAnswerAttachment {
  answerId: UniqueEntityId;
  attachmentId: UniqueEntityId;
}

class AnswerAttachment extends Entity<IAnswerAttachment> {
  get answerId() {
    return this.props.answerId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  static create(props: AnswerAttachment, id?: UniqueEntityId) {
    const attachment = new AnswerAttachment(props, id);

    return attachment;
  }
}

export { AnswerAttachment };
