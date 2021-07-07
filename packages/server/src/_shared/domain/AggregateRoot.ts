import { Entity } from './Entity';
import { DomainEvent } from './events/implementations/DomainEvent';
import { IDomainEvent } from './events/models/IDomainEvent';
import { UniqueEntityID } from './UniqueEntityID';

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: IDomainEvent[] = [];

  get id(): UniqueEntityID {
    return this._id;
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);

    DomainEvent.markAggregateForDispatch(this);

    this.logDomainEventAdded(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  private logDomainEventAdded(domainEvent: IDomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);

    console.info(
      `
        [Domain Event Created]: 
          ${thisClass?.constructor.name} ==> ${domainEventClass?.constructor.name}
      `
    );
  }
}
