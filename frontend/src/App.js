import "./App.css";
import SignUppage from "./pages/SignUppage";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Landingpage/LandingPage";
import Login from "./pages/Login";
import Features from "./pages/Features";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Testimonials from "./pages/Testimonials";
import "react-toastify/dist/ReactToastify.css";
import ForgotPass from "./pages/ForgotPass";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import Manage from "./HomePage/Manage/Manage";
import { ToastContainer } from "react-toastify";
import Dashboard from "./HomePage/Dashboard/Dashboard";
import BudgetPlan from "./HomePage/BudgetPlan/BudgetPlan";
import Savings from "./HomePage/Savings/Savings";
import TransactionDetails from "./HomePage/Dashboard/Components/TransactionDetails";
import Analysis from "./HomePage/Transactions/Transactions";
import RecurringTransaction from "./HomePage/RecurringTransaction/RecurringTransaction";
import Recard from "./HomePage/RecurringTransaction/Recard";

import IncomeCategories from "./HomePage/IncomeCategories/IncomeCategories";
import ExpenseCategories from "./HomePage/ExpenseCategories/ExpenseCategories";
import UpdatePage from "./HomePage/BudgetPlan/UpdatePage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<SignUppage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/budget-plan" element={<BudgetPlan />} />
        <Route path="/recurring-transactions" element={<RecurringTransaction />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/income-categories" element={<IncomeCategories/>}/>
        <Route path="/expense-categories" element={<ExpenseCategories/>}/>
        <Route path="/transaction/:id" element={<TransactionDetails />} />
        <Route path="/card/:id" element={<Recard />} />
        <Route path="/budget/:id" element={<UpdatePage/>} />
      </Routes>
      <ToastContainer position="top-right" theme="dark" />
    </div>
  );
}

export default App;
