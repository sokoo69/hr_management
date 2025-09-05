import { ErrorPopup } from "./error-popup"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react"

export const SignIn = ({ image, handlesigninform, handlesigninsubmit, targetedstate, statevalue, redirectpath, formId = "signin-form" }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        setIsLoading(true)
        await handlesigninsubmit(e)
        setIsLoading(false)
    }

    return (
        <>
            {targetedstate.error.status ? <ErrorPopup error={targetedstate.error.message} /> : null}
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
                <div className="max-w-6xl w-full">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
                        <div className="flex min-h-[600px] flex-col lg:flex-row">
                            {/* Left Side - Image */}
                            <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 lg:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/10"></div>
                                <div className="relative z-10 text-center">
                                    <div className="mb-8">
                                        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                                            <Sparkles className="w-10 h-10 text-white" />
                                        </div>
                                        <h1 className="text-3xl lg:text-4xl font-bold mb-2">Welcome Back!</h1>
                                        <p className="text-blue-100 text-lg">Sign in to continue your journey</p>
                                    </div>
                                    <img
                                        alt="Company Logo"
                                        src={image}
                                        className="mx-auto h-48 w-auto object-contain rounded-2xl shadow-lg"
                                    />
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                                <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                            </div>

                            {/* Right Side - Form */}
                            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                                <div className="max-w-md mx-auto w-full">
                                    <div className="text-center mb-8">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                                        <p className="text-gray-600">Enter your credentials to access your account</p>
                                    </div>

                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        {/* Email Field */}
                                        <div className="space-y-2">
                                            <label htmlFor={`${formId}-email`} className="block text-sm font-semibold text-gray-700">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Mail className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    id={`${formId}-email`}
                                                    name="email"
                                                    type="email"
                                                    required
                                                    autoComplete="email"
                                                    value={statevalue.email}
                                                    onChange={handlesigninform}
                                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                        </div>

                                        {/* Password Field */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label htmlFor={`${formId}-password`} className="block text-sm font-semibold text-gray-700">
                                                    Password
                                                </label>
                                                <Link to={redirectpath} className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors">
                                                    Forgot password?
                                                </Link>
                                            </div>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Lock className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    id={`${formId}-password`}
                                                    name="password"
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    autoComplete="current-password"
                                                    value={statevalue.password}
                                                    onChange={handlesigninform}
                                                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                                    placeholder="Enter your password"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                                            >
                                                {isLoading ? (
                                                    <div className="flex items-center">
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                        Signing in...
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center">
                                                        Sign In
                                                        <ArrowRight className="ml-2 h-5 w-5" />
                                                    </div>
                                                )}
                                            </button>
                                        </div>
                                    </form>

                                    {/* Additional Info */}
                                    <div className="mt-8 text-center">
                                        <p className="text-sm text-gray-600">
                                            Don't have an account?{" "}
                                            <Link to="/signup" className="text-blue-600 hover:text-blue-500 font-semibold transition-colors">
                                                Contact Administrator
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}