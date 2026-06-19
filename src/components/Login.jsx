import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-xs p-4 bg-gray-200 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          signin to your account
        </h2>
        <p className="text-black-500">
          don't have an account?
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email : "
              placeholder="Enter your email"
              type="email"
              {...register("email")}
              required
            />
            <Input
              label="Password : "
              placeholder="Enter your password"
              type="password"
              {...register("password")}
              required
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
