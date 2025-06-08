
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { PlusCircle, TrendingUp, TrendingDown, Award, MessageCircle, DollarSign, Target, AlertTriangle } from 'lucide-react';

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface Budget {
  category: string;
  limit: number;
  spent: number;
}

const ExpenseTracker = () => {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [currency, setCurrency] = useState<string>('USD');
  const [badges, setBadges] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<{text: string, isUser: boolean}[]>([]);
  const [chatInput, setChatInput] = useState('');

  // Form states
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [budgetCategory, setBudgetCategory] = useState('');
  const [budgetLimit, setBudgetLimit] = useState('');

  const categories = ['Food', 'Transportation', 'Entertainment', 'Healthcare', 'Shopping', 'Bills', 'Education', 'Other'];
  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  ];

  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingIncome = income - totalExpenses;

  // Add expense
  const addExpense = () => {
    if (!expenseAmount || !expenseCategory) {
      toast({ title: "Error", description: "Please fill in all required fields" });
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(expenseAmount),
      category: expenseCategory,
      description: expenseDescription,
      date: new Date().toISOString().split('T')[0]
    };

    setExpenses([...expenses, newExpense]);
    updateBudgetSpent(expenseCategory, parseFloat(expenseAmount));
    checkBudgetLimits(expenseCategory, parseFloat(expenseAmount));
    
    setExpenseAmount('');
    setExpenseCategory('');
    setExpenseDescription('');
    
    toast({ title: "Success", description: "Expense added successfully!" });
  };

  // Add budget
  const addBudget = () => {
    if (!budgetCategory || !budgetLimit) {
      toast({ title: "Error", description: "Please fill in all fields" });
      return;
    }

    const existingBudgetIndex = budgets.findIndex(b => b.category === budgetCategory);
    if (existingBudgetIndex >= 0) {
      const updatedBudgets = [...budgets];
      updatedBudgets[existingBudgetIndex].limit = parseFloat(budgetLimit);
      setBudgets(updatedBudgets);
    } else {
      const newBudget: Budget = {
        category: budgetCategory,
        limit: parseFloat(budgetLimit),
        spent: 0
      };
      setBudgets([...budgets, newBudget]);
    }

    setBudgetCategory('');
    setBudgetLimit('');
    toast({ title: "Success", description: "Budget updated successfully!" });
  };

  // Update budget spent amount
  const updateBudgetSpent = (category: string, amount: number) => {
    setBudgets(prevBudgets => 
      prevBudgets.map(budget => 
        budget.category === category 
          ? { ...budget, spent: budget.spent + amount }
          : budget
      )
    );
  };

  // Check budget limits and award badges
  const checkBudgetLimits = (category: string, amount: number) => {
    const budget = budgets.find(b => b.category === category);
    if (budget) {
      const newSpent = budget.spent + amount;
      const percentage = (newSpent / budget.limit) * 100;

      if (percentage > 100) {
        toast({
          title: "Budget Exceeded!",
          description: `You've exceeded your ${category} budget by ${currentCurrency.symbol}${(newSpent - budget.limit).toFixed(2)}`,
          variant: "destructive"
        });
      } else if (percentage > 80) {
        toast({
          title: "Budget Warning",
          description: `You're approaching your ${category} budget limit (${percentage.toFixed(1)}% used)`,
        });
      }

      // Award badges for staying within budget
      if (percentage <= 90 && !badges.includes(`${category}-saver`)) {
        setBadges([...badges, `${category}-saver`]);
        toast({
          title: "Badge Earned!",
          description: `🏆 ${category} Budget Saver - You're staying within your budget!`,
        });
      }
    }
  };

  // AI Chat functionality
  const sendChatMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = { text: chatInput, isUser: true };
    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your spending pattern, I recommend allocating 50% of income to needs, 30% to wants, and 20% to savings.",
        "Consider reducing your entertainment expenses by 20% to meet your savings goals.",
        "You're doing great with your food budget! Try to maintain this pattern.",
        "I notice you spend more on weekends. Try planning ahead to stick to your budget.",
        "Your healthcare expenses are well managed. Consider increasing your emergency fund.",
      ];
      
      const aiResponse = { 
        text: responses[Math.floor(Math.random() * responses.length)], 
        isUser: false 
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Smart Expense Tracker
          </h1>
          <p className="text-gray-600">Take control of your finances with intelligent budgeting</p>
        </div>

        {/* Currency Selector */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="currency">Currency:</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(curr => (
                    <SelectItem key={curr.code} value={curr.code}>
                      {curr.symbol} {curr.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Overview Cards */}
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
                {expenses.length} transactions
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

        {/* Badges */}
        {badges.length > 0 && (
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Your Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800">
                    🏆 {badge.replace('-', ' ').toUpperCase()}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="expenses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="chat">AI Chat</TabsTrigger>
          </TabsList>

          {/* Expenses Tab */}
          <TabsContent value="expenses" className="space-y-6">
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
                <Button onClick={addExpense} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Add Expense
                </Button>
              </CardContent>
            </Card>

            {/* Expenses List */}
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
          </TabsContent>

          {/* Budget Tab */}
          <TabsContent value="budget" className="space-y-6">
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
                <Button onClick={addBudget} className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700">
                  Set Budget
                </Button>
              </CardContent>
            </Card>

            {/* Budget Progress */}
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
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
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
          </TabsContent>

          {/* AI Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Financial Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-64 overflow-y-auto space-y-3 p-3 bg-gray-50 rounded-lg">
                    {chatMessages.length === 0 ? (
                      <div className="text-center text-gray-500 py-8">
                        <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>Ask me anything about budgeting and expenses!</p>
                      </div>
                    ) : (
                      chatMessages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs p-3 rounded-lg ${
                              message.isUser
                                ? 'bg-blue-500 text-white'
                                : 'bg-white border border-gray-200'
                            }`}
                          >
                            {message.text}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask about budgeting, savings, or expenses..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    />
                    <Button onClick={sendChatMessage} className="bg-gradient-to-r from-blue-500 to-purple-600">
                      Send
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ExpenseTracker;
