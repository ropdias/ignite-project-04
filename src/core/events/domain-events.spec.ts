import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'
import { vi } from 'vitest'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate //eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('domain events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn() // empty function to check if the callback was called

    // Subscriber registered (listening the event 'CustomAggregateCreated')
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Creating a CustomAggregate but not saving to the DB
    const aggregate = CustomAggregate.create()

    // Checking if the event was created but not dispatched
    expect(aggregate.domainEvents).toHaveLength(1)

    // Saving the CustomAggregate in the DB and dispatching the event
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // Subscriber listen the event and make what should be done with the information
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
