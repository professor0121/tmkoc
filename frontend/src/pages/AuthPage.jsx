// src/pages/AuthPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
            <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    {isLogin ? 'Welcome Back 👋' : 'Join Us 🎉'}
                </h1>

                {/* 🚧 Replace these with actual forms later */}
                {isLogin ? (
                    <div className="h-80 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center text-blue-600 font-medium">
                        <LoginForm />
                    </div>
                ) : (
                    <div className="h-80 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center text-green-600 font-medium">
                        <RegisterForm />
                    </div>
                )}

                {/* Toggle Login/Register */}
                <div className="mt-6 text-center">
                    {isLogin ? (
                        <p className="text-sm text-gray-600">
                            Don’t have an account?{' '}
                            <button
                                onClick={() => setIsLogin(false)}
                                className="text-blue-500 underline font-medium"
                            >
                                Register
                            </button>
                        </p>
                    ) : (
                        <p className="text-sm text-gray-600">
                            Already registered?{' '}
                            <button
                                onClick={() => setIsLogin(true)}
                                className="text-green-500 underline font-medium"
                            >
                                Login
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
