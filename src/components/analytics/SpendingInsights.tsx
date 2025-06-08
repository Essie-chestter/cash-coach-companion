
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Expense, Currency } from '@/types/expense';
import { categories } from '@/data/currencies';

interface SpendingInsightsProps {
  expenses: Expense[];
  totalExpenses: number;
  currentCurrency: Currency;
}

const SpendingInsights: React.FC<SpendingInsightsProps> = ({ expenses, totalExpenses, currentCurrency }) => {
  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Spending Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map(category => {
            const categoryExpenses = expenses.filter(e => e.category === category);
            const total = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);
            const percentage = totalExpenses > 0 ? (total / totalExpenses) * 100 : 0;
            
            if (total === 0) return null;
            
            return (
              <div key={category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{category}</span>
                  <span className="text-sm text-gray-600">
                    {currentCurrency.symbol}{total.toFixed(2)} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingInsights;
