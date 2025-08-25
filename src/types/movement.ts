export interface Movement {
  id: string;
  concept: string;
  amount: string;
  type: "INCOME" | "EXPENSE";
  date: string;
  user: {
    name: string;
  };
}