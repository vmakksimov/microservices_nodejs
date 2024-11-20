"use client";

import { useForm } from "@refinedev/react-hook-form";
import { useState, useEffect } from "react";
import { useNotification } from "@refinedev/core";
import { useRouter } from "next/navigation"; // for Next.js 13+ (App Router)
import { axiosInstance } from "@refinedev/simple-rest";
export default function Signup() {
    const [apiError, setApiError] = useState<string>("");
    const [logged, setLoggedUser] = useState<string>('')
    const { open } = useNotification();
    const router = useRouter();
    const {
        refineCore: { onFinish, mutationResult },
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        refineCoreProps: {
            resource: "signup",
            action: "create",
            successNotification: {
                message: "Successfully registered!",
                type: "success",
            },
            errorNotification: {
                message: "Something went wrong",
                type: "error",
            },
            redirect: false,
        }
    });

    useEffect(() => {

        const fetchLogedUser = async () => {
            try {
                const response = await axiosInstance.get('/api/users/currentuser');
                console.log("in the signup form", response)
                if (response.data.currentUser.iat){
                    const currentUser = response.data.currentUser
                    setLoggedUser(currentUser.email)
                }
            } catch (error) {
                console.log('error in fetch loged user', error)
            }

        }
        fetchLogedUser()
    }, [])

    const onSubmit = async (data: any) => {
        try {
            setApiError(""); // Clear any previous errors
            console.log("Submitting data:", data);

            const result = await onFinish(data);
            console.log("Submission result:", result);

            if (result?.data) {
                console.log("Navigation attempting to /home");
                // Try both methods of navigation
                await router.push('/');
                // Alternative method:
                // window.location.href = '/home';

                // Show success notification
                open?.({
                    type: "success",
                    message: "Successfully registered! Redirecting.....",
                });
            } else {
                console.log("Submission didn't return expected data:", result);
                setApiError("Registration completed but encountered an issue");
            }
        } catch (error: any) {
            console.log("Caught error:", error);

            // Handle API error
            if (error.response?.data?.errors) {
                const errorMessage = error.response.data.errors[0]?.message;
                setApiError(errorMessage || "An error occurred");

                // Set field-specific error if it's related to email
                if (errorMessage?.toLowerCase().includes('email')) {
                    setError('email', {
                        type: 'manual',
                        message: errorMessage
                    });
                }
            } else {
                setApiError("An unexpected error occurred");
            }

            // Show error notification
            // open?.({
            //     message: "Error",
            //     description: error.message || "An error occurred",
            //     type: "error",
            // });
        }
    };



    return (
        <>  
            {logged !== '' 
            ? <div>This user is already signed in!</div>
             :  <> <div>Register Form</div>

            {/* Display API errors */}
            {/* {apiError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{apiError}</span>
                </div>
            )}
             */}
            {/* Display mutation error */}
            {/* {mutationResult?.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">
                        {mutationResult.error.message}
                    </span>
                </div>
            )} */}

            <form onSubmit={handleSubmit(onSubmit)} className="p-4">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"

                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                        placeholder="Enter your email"
                        style={{ width: "50%" }}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1" style={{ color: "red" }}>
                            {errors.email.message as string}
                        </p>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"

                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 4,
                                message: "Password must be at least 4 characters"
                            },
                            maxLength: {
                                value: 20,
                                message: "Password must not exceed 20 characters"
                            }
                        })}
                        placeholder="Enter your password"
                        style={{ width: "50%" }}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1" style={{ color: "red" }}>
                            {errors.password.message as string}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"

                >
                    Register
                </button>
            </form>
            </>
        }
            
        </>
    );
}