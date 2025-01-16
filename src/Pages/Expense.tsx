import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type ExpenseProps = {
  id: number;
  title: string;
  amount: number;
  date: string;
};

type Props = {
  expenses: ExpenseProps[];
  setExpenses: (expenses: ExpenseProps[]) => void;
  currency: string;
};

const Expense = ({ expenses = [], setExpenses, currency }: Props) => {
  const [expenseList, setExpenseList] = useState(expenses);
  
  const [input, setInput] = useState(true);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAmount, setEditAmount] = useState(0);
  const [editDate, setEditDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense = {
      id: Date.now(),
      title,
      amount,
      date,
    };
    setExpenseList([...expenseList, newExpense]);
    setExpenses([...expenseList, newExpense]);
    resetForm();
  };

  const totalAmount = expenseList.reduce((acc, item) => acc + item.amount, 0);

  const deleteExpenseHandler = (id: number) => {
    const confirmDelete = window.confirm('Do you want to delete?');
    if (confirmDelete) {
      const updatedList = expenseList.filter(item => item.id !== id);
      setExpenseList(updatedList);
      setExpenses(updatedList);
    }
  };

  const editExpenseHandler = (expense: ExpenseProps) => {
    setEditId(expense.id);
    setEditTitle(expense.title);
    setEditAmount(expense.amount);
    setEditDate(expense.date);
    setInput(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedExpense = {
      id: editId!,
      title: editTitle,
      amount: editAmount,
      date: editDate,
    };
    const updatedList = expenseList.map(item =>
      item.id === editId ? updatedExpense : item
    );
    setExpenseList(updatedList);
    setExpenses(updatedList);
    resetEditFields();

  };

  const resetForm = () => {
    setTitle("");
    setAmount(0);
    setDate("");
    setInput(true);
  };
  const resetEditFields = () => {
    setEditId(null);
    setEditTitle('');
    setEditAmount(0);
    setEditDate('');
    setInput(true);
  };


  // console.log('hi',input);
  
  return (
    <div className='bg-[#f7f8fa] flex flex-col items-center'>
      {input ? (
        <div className='h-[40%] w-[80%] rounded-lg flex flex-col items-center p-4'>
          <h1 className='font-semibold mb-4'>Expense Transactions</h1>
          <table className='min-w-full border-collapse border border-[#767cff] text-[12px]'>
            <thead>
              <tr className='bg-[#767cff] text-[12px] text-white'>
                <th className='border border-[#767cff] px-4 py-2'>Transaction Name</th>
                <th className='border border-[#767cff] px-4 py-2'>Amount</th>
                <th className='border border-[#767cff] px-4 py-2'>Date</th>
                <th className='border border-[#767cff] px-4 py-2'>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {expenseList.map((item) => (
                <tr className="text-center" key={item.id}>
                  <td className='border border-[#767cff] px-4 py-2'>{item.title}</td>
                  <td className='border border-[#767cff] px-4 py-2'>{item.amount} {currency}</td>
                  <td className='border border-[#767cff] px-4 py-2'>{item.date}</td>
                  <td className='border border-[#767cff] px-6 py-2 justify-center'>
                    <div className="flex flex-row justify-between p-0">
                      <div
                        onClick={() => editExpenseHandler(item)}
                        className="hover:bg-[#767cff] cursor-pointer text-[#767cff] hover:text-white p-1 rounded-sm">
                        <FaRegEdit />
                      </div>
                      <div
                        onClick={() => deleteExpenseHandler(item.id)}
                        className="hover:bg-[#636364] cursor-pointer hover:text-white p-1 rounded-sm">
                        <MdDelete />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <thead>
              <tr>
                <th className="border border-[#767cff] px-4 py-2" colSpan={2}>Total Expenses</th>
                <th className="border border-[#767cff] px-4 py-2" colSpan={2}>
                  {totalAmount} {currency}
                </th>
              </tr>
            </thead>
          </table>
          <button onClick={() => setInput(!input)} className="bg-[#767cff] text-white my-3 w-[40%] py-1 rounded-md">Input Transaction</button>
        </div>
      ) : (
        <div className="bg-[#f7f8fa] flex flex-col mt-5 items-center justify-center w-full">
          <div className='bg-white h-[40%] w-[80%] rounded-lg shadow-sm border flex flex-col items-center p-4'>
            <h1 className='font-semibold'>Expense Transaction</h1>
            <form onSubmit={editId ? (handleEditSubmit) : handleSubmit} className="flex flex-col w-full items-center gap-5">
              <div className="w-[90%] flex flex-col text-[#959595] gap-2">
                <h1>Transaction Title</h1>
                <input
                  type="text"
                  placeholder="Title"
                  value={editId ? editTitle : title}
                  onChange={(e) => editId ? setEditTitle(e.target.value) : setTitle(e.target.value)}
                  className="border rounded-md h-10 p-2"
                  required />
              </div>
              <div className="w-[90%] flex flex-row text-[#959595] gap-2 justify-between">
                <div className="flex flex-col text-[#959595] gap-2 w-full">
                  <h1>Amount</h1>
                  <input
                    type="number"
                    value={editId ? editAmount : amount}
                    onChange={(e) => editId ? setEditAmount(Number(e.target.value)) : setAmount(Number(e.target.value))}
                    className="border rounded-md h-10 p-2 w-full"
                    min={0}
                    placeholder="Amount"
                    required />
                </div>
                <div className="flex flex-col text-[#959595] gap-2 w-full">
                  <h1>Date</h1>
                  <input
                    type="date"
                    value={editId ? editDate : date}
                    onChange={(e) => editId ? setEditDate(e.target.value) : setDate(e.target.value)}
                    className="border rounded-md h-10 p-2 w-full"
                    required />
                </div>
              </div>
              <div className="flex flex-row w-[90%] gap-2">
                <button type="submit" className="text-white bg-[#767cff] w-[90%] py-2 font-semibold rounded-md">
                  {editId ? 'UPDATE' : 'SUBMIT'}
                </button>
                <button onClick={resetEditFields} className="text-white bg-[#6a6a6b] w-[90%] py-2 font-semibold rounded-md">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expense;