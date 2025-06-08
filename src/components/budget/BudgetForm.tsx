
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Target } from 'lucide-react';
import { categories } from '@/data/currencies';

interface BudgetFormProps {
  budgetCategory: string;
  setBudgetCategory: (category: string) => void;
  budgetLimit: string;
  setBudgetLimit: (limit: string) => void;
  onAddBudget: () => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({
  budgetCategory,
  setBudgetCategory,
  budgetLimit,
  setBudgetLimit,
  onAddBudget
}) => {
  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Set Budget Limits
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="budget-category">Category</Label>
            <Select value={budgetCategory} onValueChange={setBudgetCategory}>
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
            <Label htmlFor="budget-limit">Monthly Limit</Label>
            <Input
              id="budget-limit"
              type="number"
              placeholder="0.00"
              value={budgetLimit}
              onChange={(e) => setBudgetLimit(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={onAddBudget} className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700">
          Set Budget
        </Button>
      </CardContent>
    </Card>
  );
};

export default BudgetForm;
