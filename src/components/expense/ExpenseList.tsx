
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Expense, Currency } from '@/types/expense';

interface ExpenseListProps {
  expenses: Expense[];
  currentCurrency: Currency;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, currentCurrency }) => {
  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {expenses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No expenses recorded yet</p>
          ) : (
            expenses.slice(-10).reverse().map(expense => (
              <div key={expense.id} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                <div>
                  <div className="font-medium">{expense.description || expense.category}</div>
                  <div className="text-sm text-gray-500">{expense.category} • {expense.date}</div>
                </div>
                <div className="text-lg font-semibold text-red-600">
                  -{currentCurrency.symbol}{expense.amount.toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseList;
