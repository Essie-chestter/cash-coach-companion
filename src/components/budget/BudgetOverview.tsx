
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle } from 'lucide-react';
import { Budget, Currency } from '@/types/expense';

interface BudgetOverviewProps {
  budgets: Budget[];
  currentCurrency: Currency;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({ budgets, currentCurrency }) => {
  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {budgets.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No budgets set yet</p>
          ) : (
            budgets.map(budget => {
              const percentage = (budget.spent / budget.limit) * 100;
              const isOverBudget = percentage > 100;
              return (
                <div key={budget.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{budget.category}</span>
                    <div className="flex items-center gap-2">
                      {isOverBudget && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      <span className={`text-sm ${isOverBudget ? 'text-red-600' : 'text-gray-600'}`}>
                        {currentCurrency.symbol}{budget.spent.toFixed(2)} / {currentCurrency.symbol}{budget.limit.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className={`h-2 ${isOverBudget ? 'bg-red-100' : 'bg-gray-200'}`}
                  />
                  <div className="text-xs text-gray-500">
                    {percentage.toFixed(1)}% used
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetOverview;
