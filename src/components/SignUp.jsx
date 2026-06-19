import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { Button, Input } from "./index";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const [error, setError] = useState("");

  const create = async (data) => {
    
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto">
      <div className="text-2xl font-bold text-center">
        <h2 className="leading-tight text-2xl font-bold text-center">
          Sign Up to create an account
        </h2>
        <p className="text-sm text-gray-700 mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Sign in
          </Link>
        </p>
        {error && <p className="text-red-500">{error}</p>}

        <form
          onSubmit={handleSubmit(create)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="space-y-5">
            <Input
              label="Name:"
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
            <Input
              label="Email:"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            <Input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <Button type="submit"  className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
