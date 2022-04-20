import { IDomainEvent } from '@shared/domain/events/models/IDomainEvent';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';

import { User } from '../../User';

export class UserSession implements IDomainEvent {
  public dateTimeOccured: Date;

  public user: User;

  constructor(user: User) {
    this.dateTimeOccured = new Date();
    this.user = user;
  }

  public getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
