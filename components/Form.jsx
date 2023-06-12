/** @format */

import Link from "next/link";
import Button from "./UI/Button/Button";

const Form = ({ type, data, setData, submitting, handleSubmit, error }) => {
  return (
    <section className="w-11/12 md:w-2/5 h-full md:h-2/6 flex flex-col justify-center mt-24 md:mt-48 border border-lime-500 bg-gray-50 rounded-md shadow-lg md:shadow">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-7 px-6 md:px-12 pt-10 pb-52 mb:pb-3 md:py-10"
      >
        <label>
           <span className='font-satoshi font-bold text-sm text-gray-700'>
            Email
          </span>
          <input
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            type="text"
            placeholder="user@gmail.co"
            required
            className="form_input border-2"
          />
        </label>

        <label>
          <span className="font-satoshi font-bold text-sm text-gray-700">
            Password
          </span>
          <input
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type="password"
            placeholder="Password"
            required
            className="form_input border-2"
          />
        </label>

        <div className="flex flex-col mb-5 gap-4">

          <Button btn_class="btn-filled" label= {submitting ? `${type}ing...` : type} />

          {error && (
            <div className="text-base text-center text-red-500">{error}</div>
          )}

          <Link href="/" className="text-green self-end">
            forget password?
          </Link>
        </div>

        {/* Login Only */}
        <div className="flex jusify-center mb-5 pl-6 md:pl-32 gap-4">
          <div>
            dont't have an account?
            <Link href="/guest/sign-up" className="text-green">
              {" "}
              Signup
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Form;
