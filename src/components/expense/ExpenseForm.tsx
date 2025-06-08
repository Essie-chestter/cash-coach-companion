
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';
import { categories } from '@/data/currencies';

interface ExpenseFormProps {
  expenseAmount: string;
  setExpenseAmount: (amount: string) => void;
  expenseCategory: string;
  setExpenseCategory: (category: string) => void;
  expenseDescription: string;
  setExpenseDescription: (description: string) => void;
  onAddExpense: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  expenseAmount,
  setExpenseAmount,
  expenseCategory,
  setExpenseCategory,
  expenseDescription,
  setExpenseDescription,
  onAddExpense
}) => {
  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          Add New Expense
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={expenseCategory} onValueChange={setExpenseCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="What did you buy?"
              value={expenseDescription}
              onChange={(e) => setExpenseDescription(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={onAddExpense} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          Add Expense
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
