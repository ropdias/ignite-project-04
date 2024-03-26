import { Entity } from '../../core/entities/entity';
import { UniqueEntityID } from '../../core/entities/unique-entity-id';

interface AnswerProps {
  authorId: UniqueEntityID;
  questionId: UniqueEntityID;
  content: string;
  createdAt: Date;
  updatedAt?: Date; // it's optional to show when the answer is edited
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content;
  }
}
