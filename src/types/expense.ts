
export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface Budget {
  category: string;
  limit: number;
  spent: number;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export interface ChatMessage {
  text: string;
  isUser: boolean;
}
