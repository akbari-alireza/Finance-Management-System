import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type IncomesProps = {
    id: number;
    title: string;
    amount: number;
    date: string;
}

type Props = {
    incomes: IncomesProps[];
    setIncomes: (incomes: IncomesProps[]) => void;
    curency : string
}

const Income = ({ incomes = [], setIncomes, curency }: Props) => {

    const [incomeList, setIncomeList] = useState(incomes)
    const [input, setInput] = useState(true)
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newIncome = {
            id: Date.now(),
            title,
            amount,
            date
        };
        setIncomeList([...incomeList, newIncome]);
        setIncomes([...incomeList, newIncome]);
        setTitle("");
        setAmount(0);
        setDate("");
        setInput(true)

    }

    const totalAmount = incomeList.reduce((acc, item) => acc + item.amount, 0)

    const deleteIncomeHandler = (id: number) => {
        const confirmDelet = window.confirm('Do you want to delete?');
        if (confirmDelet) {
            const updatedList = incomeList.filter(item => item.id !== id);
            setIncomeList(updatedList);
            setIncomes(updatedList);
        }
    }
    return (
        <div className='bg-[#f7f8fa] flex flex-col items-center '>

            {
                input ? <div className='h-[40%] w-[80%] rounded-lg flex flex-col items-center p-4'>
                    <h1 className='font-semibold mb-4'>Income Transaction</h1>
                    <table className='min-w-full border-collapse border border-[#767cff]  text-[12px] '>
                        <thead>
                            <tr className='bg-[#767cff] text-[12px] text-white '>
                                <th className='border border-[#767cff] px-4 py-2'>Transaction Name</th>
                                <th className='border border-[#767cff] px-4 py-2'>Amount</th>
                                <th className='border border-[#767cff] px-4 py-2'>Date</th>
                                <th className='border border-[#767cff] px-4 py-2'>Edit/Delete</th>
                            </tr>
                        </thead>


                        <tbody>
                            {incomeList.map((item) => (
                                <tr className=" text-center" key={item.id}>
                                    <td className='border border-[#767cff] px-4 py-2'>{item.title}</td>
                                    <td className='border border-[#767cff] px-4 py-2'>{item.amount} {curency}</td>
                                    <td className='border border-[#767cff] px-4 py-2'>{item.date}</td>
                                    <td className='border border-[#767cff] px-6 py-2 justify-center'>
                                        <div className="flex flex-row justify-between p-0">
                                            <div className="hover:bg-[#767cff] cursor-pointer text-[#767cff] hover:text-white p-1 rounded-sm">
                                                <FaRegEdit />
                                            </div>
                                            <div onClick={() => { deleteIncomeHandler(item.id) }} className="hover:bg-[#636364] cursor-pointer hover:text-white p-1 rounded-sm">
                                                <MdDelete />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>


                        <thead>
                            <tr className="">
                                <th className="border border-[#767cff] px-4 py-2" colSpan={2}>Total Income</th>
                                <th className="border border-[#767cff] px-4 py-2" colSpan={2}>{totalAmount} {curency}</th>
                            </tr>
                        </thead>
                    </table>
                    <button onClick={() => setInput(!input)} className="bg-[#767cff] text-white my-3 w-[40%] py-1 rounded-md">Input Transaction</button>
                </div> : <div className="bg-[#f7f8fa] flex flex-col  mt-5 items-center justify-center w-full">
                    <div className='bg-white h-[40%] w-[80%] rounded-lg shadow-sm border flex flex-col items-center p-4'>
                        <h1 className='font-semibold'>Income Transaction</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col w-full items-center gap-5" >
                            <div className="w-[90%] flex flex-col text-[#959595] gap-2">
                                <h1>Transaction Title</h1>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="border rounded-md h-10 p-2 "
                                    required />
                            </div>
                            <div className="w-[90%] flex flex-row text-[#959595] gap-2 justify-between">
                                <div className="flex flex-col text-[#959595] gap-2 w-full">
                                    <h1>Amount</h1>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        className="border rounded-md h-10 p-2 w-full"
                                        min={0}
                                        placeholder="Amount"
                                        required />
                                </div>
                                <div className="flex flex-col text-[#959595] gap-2 w-full">
                                    <h1>Date</h1>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="border rounded-md h-10 p-2 w-full"
                                        required />
                                </div>
                            </div>
                            {/* <button type="submit" onClick={() => setInput(!input)} className="text-white bg-[#767cff] w-[90%] py-2 font-semibold rounded-md">SUBMIT</button> */}
                            <button type="submit" className="text-white bg-[#767cff] w-[90%] py-2 font-semibold rounded-md">SUBMIT</button>
                        </form>
                    </div>
                </div>
            }

        </div>
    )
}

export default Income;