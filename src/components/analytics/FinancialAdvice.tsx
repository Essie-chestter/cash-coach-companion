
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FinancialAdvice: React.FC = () => {
  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Financial Advice</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Try to keep your housing costs below 30% of your income.
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              📈 <strong>Goal:</strong> Aim to save at least 20% of your income each month.
            </p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ <strong>Warning:</strong> Emergency fund should cover 3-6 months of expenses.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialAdvice;
