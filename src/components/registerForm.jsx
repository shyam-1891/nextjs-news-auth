"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Handle input changes
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    onSignUp(formData);
  };

  useEffect(() => {
    if (formData.email.length > 0 && formData.name.length > 0 && formData.password.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [formData]);

  const onSignUp = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'}/api/users/signup`,
        data
      );
      if (response.status === 201) {
        toast.success("Registration successful");
        router.push("/login");
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center py-6 px-4 my-10">
        <div className="max-w-[480px] w-full">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <h1 className="text-center text-gray-900 sm:text-5xl font-semibold">
              Register
            </h1>
            <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  className="text-slate-900 text-sm font-medium mb-2 block"
                  htmlFor="email"
                >
                  User Email<sup>*</sup>
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full text-black text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-red-800"
                    placeholder="Enter email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
              </div>
              <div>
                <label
                  className="text-slate-900 text-sm font-medium mb-2 block"
                  htmlFor="name"
                >
                  User name<sup>*</sup>
                </label>
                <div className="relative flex items-center">
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full text-black text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-red-800"
                    placeholder="Enter user name"
                    onChange={handleChange}
                    value={formData.name}
                  />
                </div>
              </div>
              <div>
                <label
                  className="text-slate-900 text-sm font-medium mb-2 block"
                  htmlFor="password"
                >
                  Password<sup>*</sup>
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full text-black text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-red-800"
                    placeholder="Enter password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>
              </div>

              <div className="!mt-12">
                <button
                  type="submit"
                  disabled={isButtonDisabled}
                  className={`w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white focus:outline-none ${
                    isButtonDisabled 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-red-800 hover:bg-red-900 cursor-pointer'
                  }`}
                >
                  {isButtonDisabled ? "Please fill all fields" : "Sign up"}
                  {isLoading && <span>Loading...</span>}
                </button>
              </div>
              <p className="text-slate-900 text-sm !mt-6 text-center">
                <a
                  href="/login"
                  className="text-red-800 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
