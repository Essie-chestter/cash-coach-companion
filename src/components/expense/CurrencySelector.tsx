
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { currencies } from '@/data/currencies';

interface CurrencySelectorProps {
  currency: string;
  setCurrency: (currency: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ currency, setCurrency }) => {
  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Label htmlFor="currency">Currency:</Label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-64 overflow-y-auto bg-white">
              {currencies.map(curr => (
                <SelectItem key={curr.code} value={curr.code}>
                  {curr.symbol} {curr.name} ({curr.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencySelector;
