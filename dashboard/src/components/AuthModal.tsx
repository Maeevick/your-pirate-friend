"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "../store";

type Handler = () => void;

const AuthModal = ({ onClose }: { onClose: Handler }) => {
  const dispatch = useDispatch<Dispatch>();
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validateSignup = () => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return (
      usernameRegex.test(username) &&
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === confirmPassword
    );
  };

  const validateSignin = () => {
    return username.trim() !== "" && password.trim() !== "";
  };

  useEffect(() => {
    setIsValid(isSignUp ? validateSignup() : validateSignin());
  }, [isSignUp, username, email, password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await dispatch.auth.signup({ username, email, password });
      } else {
        await dispatch.auth.signin({ username, password });
      }
      onClose();
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          {isSignUp && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600 text-white"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-4 text-blue-500 hover:underline"
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:underline block ml-auto"
          disabled={!isValid}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
