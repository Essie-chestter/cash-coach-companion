
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useExpenseTracker } from '@/hooks/useExpenseTracker';
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

const ExpenseTracker = () => {
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

        <CurrencySelector currency={currency} setCurrency={setCurrency} />

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
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
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
