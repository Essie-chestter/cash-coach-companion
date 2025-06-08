
import { useState } from 'react';
import { Expense, Budget, ChatMessage } from '@/types/expense';
import { currencies } from '@/data/currencies';
import { toast } from '@/hooks/use-toast';

export const useExpenseTracker = () => {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [currency, setCurrency] = useState<string>('USD');
  const [badges, setBadges] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');

  // Form states
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [budgetCategory, setBudgetCategory] = useState('');
  const [budgetLimit, setBudgetLimit] = useState('');

  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingIncome = income - totalExpenses;

  const updateBudgetSpent = (category: string, amount: number) => {
    setBudgets(prevBudgets => 
      prevBudgets.map(budget => 
        budget.category === category 
          ? { ...budget, spent: budget.spent + amount }
          : budget
      )
    );
  };

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

      if (percentage <= 90 && !badges.includes(`${category}-saver`)) {
        setBadges([...badges, `${category}-saver`]);
        toast({
          title: "Badge Earned!",
          description: `🏆 ${category} Budget Saver - You're staying within your budget!`,
        });
      }
    }
  };

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

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = { text: chatInput, isUser: true };
    setChatMessages(prev => [...prev, userMessage]);

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

  return {
    // State
    income,
    expenses,
    budgets,
    currency,
    badges,
    chatMessages,
    chatInput,
    expenseAmount,
    expenseCategory,
    expenseDescription,
    budgetCategory,
    budgetLimit,
    currentCurrency,
    totalExpenses,
    remainingIncome,
    
    // Setters
    setIncome,
    setCurrency,
    setChatInput,
    setExpenseAmount,
    setExpenseCategory,
    setExpenseDescription,
    setBudgetCategory,
    setBudgetLimit,
    
    // Actions
    addExpense,
    addBudget,
    sendChatMessage
  };
};
