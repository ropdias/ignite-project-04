import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

let ineMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    ineMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new DeleteAnswerCommentUseCase(ineMemoryAnswerCommentsRepository)
  })

  it('should be able to delete a answer comment', async () => {
    const answerComment = makeAnswerComment()

    await ineMemoryAnswerCommentsRepository.create(answerComment)

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })

    expect(ineMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user answer comment', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID('author-1'),
    })

    await ineMemoryAnswerCommentsRepository.create(answerComment)

    const result = await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)

    // The code below was being used when we were handling errors with throw:
    // expect(async () => {
    //   return await sut.execute({
    //     answerCommentId: answerComment.id.toString(),
    //     authorId: 'author-2',
    //   })
    // }).rejects.toBeInstanceOf(Error)
  })
})
