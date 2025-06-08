
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Currency } from '@/types/expense';

interface OverviewCardsProps {
  income: number;
  setIncome: (income: number) => void;
  totalExpenses: number;
  remainingIncome: number;
  currentCurrency: Currency;
  expenseCount: number;
}

const OverviewCards: React.FC<OverviewCardsProps> = ({
  income,
  setIncome,
  totalExpenses,
  remainingIncome,
  currentCurrency,
  expenseCount
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="shadow-lg border-0 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5" />
            Total Income
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{currentCurrency.symbol}{income.toFixed(2)}</div>
          <div className="mt-2">
            <Input
              type="number"
              placeholder="Set your income"
              value={income || ''}
              onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0 bg-gradient-to-br from-red-500 to-pink-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingDown className="h-5 w-5" />
            Total Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{currentCurrency.symbol}{totalExpenses.toFixed(2)}</div>
          <div className="text-sm opacity-90 mt-1">
            {expenseCount} transactions
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5" />
            Remaining
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{currentCurrency.symbol}{remainingIncome.toFixed(2)}</div>
          <div className={`text-sm mt-1 ${remainingIncome >= 0 ? 'text-green-200' : 'text-red-200'}`}>
            {remainingIncome >= 0 ? 'Within budget' : 'Over budget'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewCards;
