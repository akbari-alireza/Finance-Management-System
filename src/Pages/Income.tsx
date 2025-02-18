import axios from "axios";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

type IncomesProps = {
    id: number;
    title: string;
    amount: number;
    date: string;
}

type Props = {
    incomes: IncomesProps[];
    setIncomes: (incomes: IncomesProps[]) => void;
    currency: string;
}

const Income = ({ incomes = [], setIncomes, currency }: Props) => {
    const [incomeList, setIncomeList] = useState<IncomesProps[]>([]);
    const [input, setInput] = useState(true);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState("");
    const [editId, setEditId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editAmount, setEditAmount] = useState(0);
    const [editDate, setEditDate] = useState('');

    const usenavigate = useNavigate();
    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (user === '' || user === null) {
            usenavigate('/login');
        }
    }, [])

    // Update incomeList when incomes prop changes
    useEffect(() => {
        setIncomeList(incomes);
    }, [incomes]);
    
    const totalAmount = incomeList.reduce((acc, item) => acc + item.amount, 0);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newIncome = {
            id: `${Date.now()}`,
            title,
            amount,
            date
        };
    
        try {
            const user = JSON.parse(sessionStorage.getItem('user') || '{}');
            if (!user.id) {
                console.error("User not found!");
                return;
            }
            const res = await axios.get(`http://localhost:3000/users/${user.id}`);
            const userData = res.data;
            const updatedIncome = [...userData.userIncome, newIncome];
            await axios.put(`http://localhost:3000/users/${user.id}`, {
                ...userData,
                userIncome: updatedIncome
            });
            setIncomeList(updatedIncome);
            setIncomes(updatedIncome);
            resetForm();
        } catch (error) {
            console.error("Error adding income:", error);
        }
    }
    
    const deleteIncomeHandler = async (id: number) => {
        const confirmDelete = window.confirm('Do you want to delete?');
        if (confirmDelete) {
            try {
                const user = JSON.parse(sessionStorage.getItem('user') || '{}');
                if (!user.id) {
                    console.error("User not found!");
                    return;
                }
                const res = await axios.get(`http://localhost:3000/users/${user.id}`);
                const userData = res.data;
    
                const updatedIncomes = userData.userIncome.filter((item: IncomesProps) => item.id !== id);
    
                await axios.put(`http://localhost:3000/users/${user.id}`, {
                    ...userData,
                    userIncome: updatedIncomes
                });
    
                setIncomeList(updatedIncomes);
                setIncomes(updatedIncomes);
            } catch (error) {
                console.error("Error deleting income:", error);
            }
        }
    }
    
    const editIncomeHandler = (income: IncomesProps) => {
        setEditId(income.id);
        setEditTitle(income.title);
        setEditAmount(income.amount);
        setEditDate(income.date);
        setInput(false);
    }
    
    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedIncome = {
            id: editId!,
            title: editTitle,
            amount: editAmount,
            date: editDate
        };
    
        try {
            const user = JSON.parse(sessionStorage.getItem('user') || '{}');
            if (!user.id) {
                console.error("User not found!");
                return;
            }
            const res = await axios.get(`http://localhost:3000/users/${user.id}`);
            const userData = res.data;
    
            const updatedList = userData.userIncome.map((item: IncomesProps) =>
                item.id === editId ? updatedIncome : item
            );
    
            await axios.put(`http://localhost:3000/users/${user.id}`, {
                ...userData,
                userIncome: updatedList
            });
    
            setIncomeList(updatedList);
            setIncomes(updatedList);
            resetEditFields();
        } catch (error) {
            console.error("Error updating income:", error);
        }
    }
   

    const resetForm = () => {
        setTitle("");
        setAmount(0);
        setDate("");
        setInput(true);
    }

    const resetEditFields = () => {
        setEditId(null);
        setEditTitle('');
        setEditAmount(0);
        setEditDate('');
        setInput(true);
    }
    interface user {
        email: string;
    }
    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            axios.get('http://localhost:3000/users')
                .then(res => {
                    const currentUser = res.data.find((u: user) => u.email === userData.email);
                    setIncomeList(currentUser?.userIncome || []);
                })
                .catch(error => console.error("Error fetching expenses:", error));
        }
    }, [incomes]);

    return (
        <div className='bg-[#f7f8fa] flex flex-col items-center'>
            <Navbar />
            {input ? (
                <div className='h-[40%] w-[90%] max-w-[1300px] rounded-lg flex flex-col items-center p-4'>
                    <h1 className='font-semibold mb-4'>Income Transaction</h1>
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
                            {incomeList.map((item) => (
                                <tr className="text-center" key={item.id}>
                                    <td className='border border-[#767cff] px-4 py-2'>{item.title}</td>
                                    <td className='border border-[#767cff] px-4 py-2'>{item.amount} {currency}</td>
                                    <td className='border border-[#767cff] px-4 py-2'>{item.date}</td>
                                    <td className='border border-[#767cff] px-6 py-2 justify-center'>
                                        <div className="flex flex-row justify-between p-0">
                                            <div
                                                onClick={() => editIncomeHandler(item)}
                                                className="hover:bg-[#767cff] cursor-pointer text-[#767cff] hover:text-white p-1 rounded-sm">
                                                <FaRegEdit />
                                            </div>
                                            <div
                                                onClick={() => deleteIncomeHandler(item.id)}
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
                                <th className="border border-[#767cff] px-4 py-2" colSpan={2}>Total Income</th>
                                <th className="border border-[#767cff] px-4 py-2" colSpan={2}>{totalAmount} {currency}</th>
                            </tr>
                        </thead>
                    </table>
                    <button onClick={() => setInput(!input)} className="bg-[#767cff] text-white my-3 w-[40%] py-1 rounded-md">Input Transaction</button>
                </div>
            ) : (
                <div className="bg-[#f7f8fa] flex flex-col mt-5 items-center justify-center w-full">
                    <div className='bg-white h-[40%] w-[80%] rounded-lg shadow-sm border flex flex-col items-center p-4'>
                        <h1 className='font-semibold'>Income Transaction</h1>
                        <form onSubmit={editId ? handleEditSubmit : handleSubmit} className="flex flex-col w-full items-center gap-5">
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
                                <button type="button" onClick={resetEditFields} className="text-white bg-[#6a6a6b] w-[90%] py-2 font-semibold rounded-md">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Income;