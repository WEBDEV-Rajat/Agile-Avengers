import { Link } from "react-router-dom";
import { WiDirectionLeft } from "react-icons/wi";

function AboutUs() {
  return (
    <section id="about-us" className="scroll-mt-24">
      <div className="flex flex-col ml-10 mr-10 bg-slate-100 p-5">
        <Link
          to="/"
          className="absolute left-10 top-0 p-2 flex bg-black text-white mt-4 ml-4"
        >
          <WiDirectionLeft size={25} />
          <p className="font-semibold">Back To Home Page</p>
        </Link>
        <h1 className="mt-10 font-bold text-center text-4xl">
          About ExpenseGuru
        </h1>
        <p className="mt-5 text-center font-semibold">
          Welcome to ExpenseGuru, your trusted partner in financial management.
          We believe that managing money should be simple, intuitive, and
          stress-free. Our goal is to provide you with powerful tools to track
          your expenses, set budgets, and achieve your financial goals—all in
          one seamless platform.
        </p>

        <hr className="mt-10 border" />

        <h1 className="mt-5 font-bold text-center text-4xl">Why Choose Us?</h1>
        <ul className="mt-10 flex flex-col gap-10">
          <li className="p-5 bg-blue-100 rounded-md w-1/2 self-start">
            <b>User-Friendly Interface</b>
            <p>
              Our clean and intuitive design ensures a smooth experience for
              users of all backgrounds.
            </p>
          </li>
          <li className="p-5 bg-green-100 rounded-md w-1/2 self-end">
            <b>Smart Insights</b>
            <p>
              Get detailed analytics and spending trends with interactive
              visualizations.
            </p>
          </li>
          <li className="p-5 bg-blue-100 rounded-md w-1/2 self-start">
            <b>Secure & Reliable</b>
            <p>
              Your data security is our priority. We use advanced encryption to
              keep your information safe.
            </p>
          </li>
          <li className="p-5 bg-green-100 rounded-md w-1/2 self-end">
            <b>Custom Categories</b>
            <p>
              Organize your expenses effortlessly by adding personalized
              spending categories.
            </p>
          </li>
          <li className="p-5 bg-blue-100 rounded-md w-1/2 self-start">
            <b>Multi-Device Access</b>
            <p>
              Track your finances anytime, anywhere—whether on desktop or
              mobile.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutUs;
