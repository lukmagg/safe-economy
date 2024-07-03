import { gql } from "@apollo/client";

export type ItemProps = { id: string; description: string; amount: number };

// QUERIES AND MUTATIONS
export const MONTH_EXPENSES = gql`
  query GetMonthExpenses {
    monthExpenses {
      id
      description
      amount
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation DeleteExpense($id: String!) {
    deleteExpense(id: $id)
  }
`;

export const TOTAL_SPENT = gql`
  query TotalSpentThisMonth {
    totalSpent
  }
`;

export const ADD_EXPENSE = gql`
  mutation CreateExpense($createExpenseDto: CreateExpenseDto!) {
    createExpense(createExpenseDto: $createExpenseDto) {
      id
      description
      amount
    }
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation UpdateExpense($updateExpenseDto: UpdateExpenseDto!) {
    updateExpense(updateExpenseDto: $updateExpenseDto) {
      id
      description
      amount
    }
  }
`;
