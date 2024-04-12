import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment'

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const answerAttachment = AnswerAttachment.create(
    {
      answerId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override, // we will override any props that have been passed to make a answer
    },
    id,
  )

  return answerAttachment
}
