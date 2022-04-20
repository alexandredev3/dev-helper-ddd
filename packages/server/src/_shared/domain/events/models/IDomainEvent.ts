import { UniqueEntityID } from '../../UniqueEntityID';

export interface IDomainEvent {
  dateTimeOccured: Date;
  getAggregateId(): UniqueEntityID;
}
