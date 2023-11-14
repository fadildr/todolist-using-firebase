import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/auth";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/auth";
import TextInput from "../components/textInput";
import Loading from "../components/loading";
import { toast } from "react-toastify";
const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await loginService(formData.email, formData.password);
      console.log(response);
      dispatch(loginSuccess());
      await toast.success("Login successful!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      navigate("/");
    } catch (error) {
      toast.error(`${error}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      console.error("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900 leading-9">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 leading-5"
            >
              Email address
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <TextInput
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 "
              />
            </div>
          </div>
          <div className="mt-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 leading-5"
            >
              Password
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <TextInput
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 "
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm leading-5 flex gap-1">
              Don't Have Account Before ?{" "}
              <p
                onClick={() => {
                  navigate("/register");
                }}
                className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Register Here
              </p>
            </div>
          </div>
          <div className="mt-6">
            <span className="block w-full rounded-md shadow-sm">
              <button
                type="button"
                onClick={handleLogin}
                disabled={isLoading || !formData.email || !formData.password}
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none  focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out disabled:cursor-not-allowed bg-indigo-500"
              >
                {isLoading ? <Loading /> : "Sign in"}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
