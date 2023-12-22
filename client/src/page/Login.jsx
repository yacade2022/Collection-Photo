import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login Successful");
    return redirect("/collection");
  } catch (error) {
    toast.error(error?.response?.data);
    return error;
  }
};
const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="container mx-auto  w-full h-screen py-24  ">
      <div className=" mx-auto  max-sm:w-2/3 md:w-2/4 lg:w-1/3 xl:w-1/4   border-solid border-2 border-violet-500 rounded-lg p-5 ">
        <h2 className="text-center capitalize  text-indigo-500 font-semibold text-xl mb-4">
          Login
        </h2>
        <Form method="post">
          <div className=" my-2 ">
            <span>
              <AiOutlineMail />
            </span>

            <input
              type="email"
              placeholder="email"
              name="email"
              className=" max-sm:w-full w-full bg-slate-200  p-1 rounded-md outline-none"
            />
          </div>
          <div className=" my-2 ">
            <span>
              <AiFillLock />
            </span>

            <input
              type="password"
              placeholder="password"
              name="password"
              className=" max-sm:w-full w-full  bg-slate-200 p-1 rounded-md outline-none"
            />
          </div>
          <button
            disabled={isSubmitting}
            className="w-full mt-3 bg-indigo-500 p-1 rounded-md text-slate-50 hover:bg-indigo-700 duration-300 "
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>

        <div className="mt-4">
          <p className="inline-block mb-2 ">Not a member yet?</p>
          <Link
            to="/"
            className=" ml-1 bg-indigo-500 p-1 rounded-md text-slate-50 hover:bg-indigo-700 duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
