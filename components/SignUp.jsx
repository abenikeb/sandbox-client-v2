/** @format */

import Link from "next/link";
import Button from "./UI/Button/Button";
import withErrorHandler from "@hoc/withErrorHandler/withErrorHandler";

const SignUpForm = ({
  type,
  data,
  setData,
  submitting,
  handleSubmit,
  error,
}) => {
  return (
    <section className="flex-center flex-col">
      <form onSubmit={handleSubmit} className="sign-up-form">
        <label>
          <span className='font-satoshi font-bold text-sm text-gray-700'>
            First Name
          </span>
          <input
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
            type="text"
            placeholder="First Name"
            required
            className="form_input border-2"
          />
        </label>

        <label>
          <span className='font-satoshi font-bold text-sm text-gray-700'>
            Last Name
          </span>
          <input
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
            type="text"
            placeholder="Last Name"
            required
            className="form_input border-2"
          />
        </label>

        <label>
          <span className='font-satoshi font-bold text-sm text-gray-700'>
            Tel
          </span>
          <input
            value={data.tel}
            onChange={(e) => setData({ ...data, tel: e.target.value })}
            type="number"
            placeholder="Phone Number"
            required
            className="form_input border-2"
          />
        </label>

        <label>
          <span className='font-satoshi font-bold text-sm text-gray-700'>
            Email
          </span>
          <input
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            type="email"
            placeholder="email"
            required
            className="form_input border-2"
          />
        </label>

        <label>
          <span className='font-satoshi font-bold text-sm text-gray-700'>
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

        <div className="flex flex-col mb-5 gap-4 mt-2">
          <Button btn_class="btn-filled" label= {submitting ? `${type}ing...` : type} />
        </div>

        {error && (
          <div className="text-base text-center text-red-500">{error}</div>
        )}

        {/* Signup Only */}
        <div className="flex jusify-center self-center my-5 gap-4">
          <div>
            Aleardy have an account ?
            <Link href="/guest/login" className="text-green">
              {" "}
              Login
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default withErrorHandler(SignUpForm);
