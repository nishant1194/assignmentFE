import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import BaseUrl from "../util/BaseUrl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post(BaseUrl + "api/login", {
        email,
        password,
      });
      console.log(resp.data);
      const token = resp.data.token;
      localStorage.setItem("APtoken", token);
      toast.success("Login Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Invalid Credentials");
      console.log(error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("APtoken");
    if (token) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              placeholder="Enter you Email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex justify-between w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <input
                placeholder="Enter you Password"
                type={showPassword ? "text" : "password"}
                className="w-full  focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );

  // return (
  //     <div className="min-h-screen bg-[#075e54] flex items-center justify-center">
  //       <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
  //         <h2 className="text-3xl font-bold text-center text-[#075e54] mb-6">
  //           Login
  //         </h2>

  //         <form onSubmit={handleSubmit} className="space-y-4">

  //           {/* Email Field */}
  //           <div className="flex items-center border-2 border-[#075e54] rounded-full px-4 py-3">
  //             <Mail size={20} color="#075e54" />
  //             <input
  //               type="email"
  //               name="email"

  //               placeholder="Enter your email"
  //               className="ml-3 w-full focus:outline-none text-lg"
  //             />
  //           </div>

  //           {/* Password Field */}
  //           <div className="flex items-center border-2 border-[#075e54] rounded-full px-4 py-3">
  //             <Lock size={20} color="#075e54" />
  //             <input
  //               type={showPassword ? "text" : "password"}
  //               name="password"

  //               placeholder="Enter your password"
  //               className="ml-3 w-full focus:outline-none text-lg"
  //             />
  //             <button
  //               type="button"
  //               onClick={() => setShowPassword(!showPassword)}
  //             >
  //               {showPassword ? (
  //                 <EyeOff className="size-5 text-base-content/40" />
  //               ) : (
  //                 <Eye className="size-5 text-base-content/40" />
  //               )}
  //             </button>
  //           </div>

  //           <button
  //             type="submit"
  //             className="w-full bg-[#25d366] text-white py-3 rounded-full text-xl font-semibold hover:bg-[#128C7E] transition"
  //           >
  //             Login
  //           </button>
  //         </form>

  //         <div className="text-center mt-4 text-sm text-gray-500">
  //           Create a new account?{" "}
  //           <a href="/signup" className="text-[#128C7E]">
  //             SignUp
  //           </a>
  //         </div>
  //       </div>
  //     </div>
  //   );
};

export default Login;
