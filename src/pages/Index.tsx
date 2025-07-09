
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useExpenseTracker } from '@/hooks/useExpenseTracker';
import { useAuth } from '@/hooks/useAuth';
import CurrencySelector from '@/components/expense/CurrencySelector';
import OverviewCards from '@/components/expense/OverviewCards';
import BadgeDisplay from '@/components/expense/BadgeDisplay';
import ExpenseForm from '@/components/expense/ExpenseForm';
import ExpenseList from '@/components/expense/ExpenseList';
import BudgetForm from '@/components/budget/BudgetForm';
import BudgetOverview from '@/components/budget/BudgetOverview';
import SpendingInsights from '@/components/analytics/SpendingInsights';
import FinancialAdvice from '@/components/analytics/FinancialAdvice';
import AIChat from '@/components/chat/AIChat';
import { LogOut } from 'lucide-react';

const ExpenseTracker = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  
  const {
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
    setIncome,
    setCurrency,
    setChatInput,
    setExpenseAmount,
    setExpenseCategory,
    setExpenseDescription,
    setBudgetCategory,
    setBudgetLimit,
    addExpense,
    addBudget,
    sendChatMessage
  } = useExpenseTracker();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">💰 Expense Tracker</h1>
            <p className="text-muted-foreground">
              Track your expenses, manage budgets, and get insights
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CurrencySelector currency={currency} setCurrency={setCurrency} />
            <ThemeToggle />
            <Button variant="outline" size="icon" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <OverviewCards
          income={income}
          setIncome={setIncome}
          totalExpenses={totalExpenses}
          remainingIncome={remainingIncome}
          currentCurrency={currentCurrency}
          expenseCount={expenses.length}
        />

        <BadgeDisplay badges={badges} />

        <Tabs defaultValue="expenses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="chat">AI Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-6">
            <ExpenseForm
              expenseAmount={expenseAmount}
              setExpenseAmount={setExpenseAmount}
              expenseCategory={expenseCategory}
              setExpenseCategory={setExpenseCategory}
              expenseDescription={expenseDescription}
              setExpenseDescription={setExpenseDescription}
              onAddExpense={addExpense}
            />
            <ExpenseList expenses={expenses} currentCurrency={currentCurrency} />
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <BudgetForm
              budgetCategory={budgetCategory}
              setBudgetCategory={setBudgetCategory}
              budgetLimit={budgetLimit}
              setBudgetLimit={setBudgetLimit}
              onAddBudget={addBudget}
            />
            <BudgetOverview budgets={budgets} currentCurrency={currentCurrency} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <SpendingInsights
              expenses={expenses}
              totalExpenses={totalExpenses}
              currentCurrency={currentCurrency}
            />
            <FinancialAdvice />
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <AIChat
              chatMessages={chatMessages}
              chatInput={chatInput}
              setChatInput={setChatInput}
              onSendMessage={sendChatMessage}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ExpenseTracker;
