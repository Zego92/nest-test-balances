interface IUserTransactionCreateEvent {
  amount: number;
  type: string;
  userId: number;
}

export class UserTransactionCreateEvent {
  payload: IUserTransactionCreateEvent;
}
