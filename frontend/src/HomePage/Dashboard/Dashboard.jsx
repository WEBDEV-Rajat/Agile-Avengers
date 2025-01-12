// import React, { useEffect, useState } from "react";
// import Navigationbar from "../Navigationbar";
// import Overview from "./Components/Overview";
// import History from "./Components/History";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom";
// import AddCategory from "./Components/AddCategory";
// import { login } from "../../redux/Slices/user.slices.js";
// const Dashboard = () => {
//   const [amount, setAmount] = useState(null);
//   const [category, setCategory] = useState(null);
//   const [note, setNote] = useState(null);
//   const [date, setDate] = useState(null);
//   const [isIncomeOpen, setIsIncomeOpen] = useState(false);
//   const [isExpenseOpen, setIsExpenseOpen] = useState(false);
//   const [incomecategories, setIncomeCategories] = useState([]);
//   const [expensecategories, setExpenseCategories] = useState([]);
//   const dispatch = useDispatch();

//   const { isAuthenticated, user } = useSelector((state) => state.user);

//   const openIncomePopup = () => setIsIncomeOpen(true);
//   const closeIncomePopup = () => setIsIncomeOpen(false);
//   const openExpensePopup = () => setIsExpenseOpen(true);
//   const closeExpensePopup = () => setIsExpenseOpen(false);
//   // test for google auth


//   const [userData, setUserData] = useState({});

//   const getUser = async () => {
//     try {
//       console.log("wehjhjfj");
//       const response = await axios.get("http://localhost:5000/login/success", {
//         withCredentials: true,
//         headers: { "Content-Type": "application/json" },
//       });

//       console.log("Full response:", response);
//       // isAuthenticated = true;
//       // user = response.data.user
//       console.log("User data received:", response.data.user);
//       setGoogleId(response.data.user.googleId);
//       if (response.data.user) {
//         setGoogleId(response.data.user.googleId);
//         dispatch(login({ googleId: response.data.user.googleId })); // Dispatch Google ID directly
//       }
//     } catch (error) {}
//   };
//   const logout = () => {
//     window.open("http://localhost:6005/logout", "_self");
//   };

//   // useE
//   const incomeHandler = async () => {
//     const form = new FormData();
//     form.append("amount", amount);
//     form.append("category", category);
//     form.append("note", note);
//     form.append("date", date);
//     form.append("type", "income");

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/v1/transaction/add-transaction",
//         form,
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       toast.success(response.data.message);
//       setAmount(null);
//       setCategory(null);
//       setNote(null);
//       setDate(null);

//       closeIncomePopup();
//     } catch (error) {
//       toast.warning(error?.response?.data?.message);
//     }
//   };

//   const expenseHandler = async () => {
//     const form = new FormData();
//     form.append("amount", amount);
//     form.append("category", category);
//     form.append("note", note);
//     form.append("date", date);
//     form.append("type", "expense");

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/v1/transaction/add-transaction",
//         form,
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       toast.success(response.data.message);
//       setAmount(null);
//       setCategory(null);
//       setNote(null);
//       setDate(null);

//       closeExpensePopup();
//     } catch (error) {
//       toast.warning(error?.response?.data?.message);
//     }
//   };
//   const [x, setX] = useState(null);
//   useEffect(() => {
//     getUser();
//     const fetchIncomeCategories = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/v1/category/get-all-income",
//           {
//             withCredentials: true,
//             headers: { "Content-Type": "application/json" },
//           }
//         );
//         setIncomeCategories(response.data.data);
//       } catch (error) {
//         console.error("Error fetching income categories:", error);
//       }
//     };

//     const fetchExpenseCategories = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/v1/category/get-all-expense",
//           {
//             withCredentials: true,
//             headers: { "Content-Type": "application/json" },
//           }
//         );
//         console.log("Fetched Expense Categories:", response.data.data);
//         setExpenseCategories(response.data.data);
//       } catch (error) {
//         console.error("Error fetching expense categories:", error);
//       }
//     };

//     fetchIncomeCategories();
//     fetchExpenseCategories();
//   }, []);

//   console.log("Income Categories:", incomecategories);
//   console.log("Expense Categories:", expensecategories);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/v1/users/get-user",
//           {
//             withCredentials: true,
//             headers: { "Content-Type": "application/json" },
//           }
//         );
//         console.log("Fetched Expense Categores:", response.data.data);
//         setX(response.data.data);
//       } catch (error) {
//         console.error(
//           "Error fetching data:",
//           error.response ? error.response.data.message : error.message
//         );
//       }
//     };

//     fetchData();
//   }, []);
//   return (
//     <div>
//       <Navigationbar />
//       <div className="relative top-[110px] flex flex-row justify-between font-semibold border-b border-b-slate-400 max-[530px]:flex-col max-[530px]:w-full">
//         <h1 className="text-green-700 text-2xl ml-5 mb-4">
//           Welcome, {x?.name || "A"}!
//         </h1>
//         <div className="flex gap-14 mr-7 max-[530px]:gap-5 mt-3">
//           <button
//             className="bg-[#0f664f] text-white rounded-lg pt-2 pb-2 pl-3 pr-3 shadow-md border-2 border-green-500 mb-1 -translate-y-4 max-[530px]:ml-5"
//             onClick={openIncomePopup}
//           >
//             New Income
//           </button>
//           {isIncomeOpen && (
//             <div className="popup-overlay" onClick={closeIncomePopup}>
//               <div className="popup" onClick={(e) => e.stopPropagation()}>
//                 <h2>
//                   Create a new <span className="s1">income</span> transaction
//                 </h2>
//                 <form>
//                   <label>
//                     Description
//                     <input
//                       type="text"
//                       value={note}
//                       onChange={(e) => setNote(e.target.value)}
//                     />
//                   </label>
//                   <br />
//                   <label>
//                     Amount
//                     <input
//                       type="number"
//                       required
//                       value={amount}
//                       onChange={(e) => setAmount(e.target.value)}
//                     />
//                   </label>
//                   <br />
//                   <label>Category</label>
//                   <div className="catselect">
//                     <select onChange={(e) => setCategory(e.target.value)}>
//                       <option value="">Select income Categories</option>
//                       {incomecategories.map((cat) => (
//                         <option key={cat._id} value={cat.name}>
//                           {cat.name}
//                         </option>
//                       ))}
//                     </select>
//                     <AddCategory type={"income"} />
//                   </div>
//                   <label>
//                     Transaction Date
//                     <input
//                       type="date"
//                       required
//                       onChange={(e) => setDate(e.target.value)}
//                     />
//                   </label>
//                   <button
//                     type="button"
//                     className="button2"
//                     onClick={closeIncomePopup}
//                   >
//                     Close
//                   </button>
//                   <button
//                     type="button"
//                     className="button1"
//                     onClick={incomeHandler}
//                   >
//                     Submit
//                   </button>
//                 </form>
//               </div>
//             </div>
//           )}

//           <button
//             className="bg-[#4b0519] text-white rounded-lg pt-1 pb-1 pl-3 pr-3 shadow-md border-2 border-[#de164f] mb-1 -translate-y-4"
//             onClick={openExpensePopup}
//           >
//             New Expense
//           </button>
//           {isExpenseOpen && (
//             <div className="popup-overlay" onClick={closeExpensePopup}>
//               <div className="popup" onClick={(e) => e.stopPropagation()}>
//                 <h2>
//                   Create a new <span className="s2">expense</span> transaction
//                 </h2>
//                 <form>
//                   <label>
//                     Description
//                     <input
//                       type="text"
//                       value={note}
//                       onChange={(e) => setNote(e.target.value)}
//                     />
//                   </label>
//                   <br />
//                   <label>
//                     Amount
//                     <input
//                       type="number"
//                       required
//                       value={amount}
//                       onChange={(e) => setAmount(e.target.value)}
//                     />
//                   </label>
//                   <br />
//                   <label>Category</label>
//                   <div className="catselect">
//                     <select
//                       value={category || ""}
//                       onChange={(e) => setCategory(e.target.value)}
//                     >
//                       <option value="">Select expense Categories</option>
//                       {expensecategories.map((cat) => (
//                         <option key={cat._id} value={cat.name}>
//                           {cat.name}
//                         </option>
//                       ))}
//                     </select>
//                     <AddCategory type={"expense"} />
//                   </div>
//                   <label>
//                     Transaction Date
//                     <input
//                       type="date"
//                       required
//                       onChange={(e) => setDate(e.target.value)}
//                     />
//                   </label>
//                   <button
//                     className="button2"
//                     type="button"
//                     onClick={closeExpensePopup}
//                   >
//                     Close
//                   </button>
//                   <button
//                     type="button"
//                     className="button1"
//                     onClick={expenseHandler}
//                   >
//                     Submit
//                   </button>
//                 </form>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Overview incomeHandler={incomeHandler} expenseHandler={expenseHandler} />
//       <History />
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import Navigationbar from "../Navigationbar";
import Overview from "./Components/Overview";
import History from "./Components/History";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import AddCategory from "./Components/AddCategory";
import { login } from "../../redux/Slices/user.slices.js";

const Dashboard = () => {
  const [amount, setAmount] = useState(null);
  const [category, setCategory] = useState(null);
  const [note, setNote] = useState(null);
  const [date, setDate] = useState(null);
  const [isIncomeOpen, setIsIncomeOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [incomecategories, setIncomeCategories] = useState([]);
  const [expensecategories, setExpenseCategories] = useState([]);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [userData, setUserData] = useState({});

  const openIncomePopup = () => setIsIncomeOpen(true);
  const closeIncomePopup = () => setIsIncomeOpen(false);
  const openExpensePopup = () => setIsExpenseOpen(true);
  const closeExpensePopup = () => setIsExpenseOpen(false);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/login/success", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.user) {
        console.log("User data received:", response.data.user);
 
        setUserData(response.data.user);
        dispatch(login({ googleId: response.data.user.googleId })); 
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  };

  const logout = () => {
    window.open("http://localhost:6005/logout", "_self");
  };

  const incomeHandler = async () => {
    const form = new FormData();
    form.append("amount", amount);
    form.append("category", category);
    form.append("note", note);
    form.append("date", date);
    form.append("type", "income");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/transaction/add-transaction",
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message);
      setAmount(null);
      setCategory(null);
      setNote(null);
      setDate(null);
      closeIncomePopup();
    } catch (error) {
      toast.warning(error?.response?.data?.message);
    }
  };

  const expenseHandler = async () => {
    const form = new FormData();
    form.append("amount", amount);
    form.append("category", category);
    form.append("note", note);
    form.append("date", date);
    form.append("type", "expense");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/transaction/add-transaction",
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message);
      setAmount(null);
      setCategory(null);
      setNote(null);
      setDate(null);
      closeExpensePopup();
    } catch (error) {
      toast.warning(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getUser(); 
    const fetchIncomeCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/category/get-all-income",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setIncomeCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching income categories:", error);
      }
    };

    const fetchExpenseCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/category/get-all-expense",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setExpenseCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching expense categories:", error);
      }
    };

    fetchIncomeCategories();
    fetchExpenseCategories();
  }, []); 

  return (
    <div>
      <Navigationbar />
      <div className="relative top-[110px] flex flex-row justify-between font-semibold border-b border-b-slate-400 max-[530px]:flex-col max-[530px]:w-full">
        <h1 className="text-green-700 text-2xl ml-5 mb-4">
          Welcome, {userData?.name || "A"}!
        </h1>
        <div className="flex gap-14 mr-7 max-[530px]:gap-5 mt-3">
          <button
            className="bg-[#0f664f] text-white rounded-lg pt-2 pb-2 pl-3 pr-3 shadow-md border-2 border-green-500 mb-1 -translate-y-4 max-[530px]:ml-5"
            onClick={openIncomePopup}
          >
            New Income
          </button>
          {isIncomeOpen && (
            <div className="popup-overlay" onClick={closeIncomePopup}>
              <div className="popup" onClick={(e) => e.stopPropagation()}>
                <h2>
                  Create a new <span className="s1">income</span> transaction
                </h2>
                <form>
                  <label>
                    Description
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </label>
                  <br />
                  <label>
                    Amount
                    <input
                      type="number"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </label>
                  <br />
                  <label>Category</label>
                  <div className="catselect">
                    <select onChange={(e) => setCategory(e.target.value)}>
                      <option value="">Select income Categories</option>
                      {incomecategories.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <AddCategory type={"income"} />
                  </div>
                  <label>
                    Transaction Date
                    <input
                      type="date"
                      required
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </label>
                  <button
                    type="button"
                    className="button2"
                    onClick={closeIncomePopup}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="button1"
                    onClick={incomeHandler}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}

          <button
            className="bg-[#4b0519] text-white rounded-lg pt-1 pb-1 pl-3 pr-3 shadow-md border-2 border-[#de164f] mb-1 -translate-y-4"
            onClick={openExpensePopup}
          >
            New Expense
          </button>
          {isExpenseOpen && (
            <div className="popup-overlay" onClick={closeExpensePopup}>
              <div className="popup" onClick={(e) => e.stopPropagation()}>
                <h2>
                  Create a new <span className="s2">expense</span> transaction
                </h2>
                <form>
                  <label>
                    Description
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </label>
                  <br />
                  <label>
                    Amount
                    <input
                      type="number"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </label>
                  <br />
                  <label>Category</label>
                  <div className="catselect">
                    <select
                      value={category || ""}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select expense Categories</option>
                      {expensecategories.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <AddCategory type={"expense"} />
                  </div>
                  <label>
                    Transaction Date
                    <input
                      type="date"
                      required
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </label>
                  <button
                    className="button2"
                    type="button"
                    onClick={closeExpensePopup}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="button1"
                    onClick={expenseHandler}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Overview getUser={getUser} incomeHandler={incomeHandler} expenseHandler={expenseHandler} />
      <History getUser={getUser} />
    </div>
  );
};

export default Dashboard;
