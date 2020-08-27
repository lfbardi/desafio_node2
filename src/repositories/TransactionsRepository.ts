import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let totalIncome = 0;
    let totalOutcome = 0;

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.value;
      } else if (transaction.type === 'outcome') {
        totalOutcome += transaction.value;
      }
    });

    const total = totalIncome - totalOutcome;

    return { income: totalIncome, outcome: totalOutcome, total };
  }

  public create({ value, title, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
