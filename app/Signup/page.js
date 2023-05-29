"use client"
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const Register = () => {
    const router = useRouter();
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adress, setAdress] = useState("");
    const [avatar, setAvatar] = useState("");


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // Perform the registration logic here
            console.log(nom, adress, email, password, avatar);
            const av = avatar.split("/"); // Declare the 'av' variable here
            // Redirect to the dashboard after successful registration
            const newUser = {
                nom: nom,
                address: adress,
                email: email,
                password: password,
                avatar: av[8]
            };
            // Make a POST request to the API endpoint
            const response = await fetch("http://127.0.0.1:3001/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });
            // Check the response status
            if (response.ok) {
                // Redirect to the dashboard after successful registration
                router.push("/dashboard");
            } else {
                // Handle error case
                console.log("Registration failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="h-full bg-white">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="/logo.svg"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
                        Create an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={submitHandler}>
                        <div>
                            <label
                                htmlFor="nom"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="nom"
                                    name="nom"
                                    type="text"
                                    autoComplete="name"
                                    value={nom}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                    onChange={(e) => setNom(e.target.value)}
                                />
                            </div>
                        </div>


                        <div>
                            <label
                                htmlFor="adress"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="adress"
                                    name="adress"
                                    type="adress"
                                    autoComplete="adress"
                                    value={adress}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                    onChange={(e) => setAdress(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-black"
                            >
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    value={password}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="avatar"
                                className="block text-sm font-medium leading-6 text-black"
                            >
                                Avatar
                            </label>
                            <div className="mt-2">
                                <input
                                    id="avatar"
                                    name="avatar"
                                    type="file"
                                    autoComplete="new-avatar"
                                    value={avatar}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 bg-gray-100 text-gray-900 border-gray-300 p-2"
                                    onChange={(e) => setAvatar(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-lg bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <a href="/login" className="font-semibold leading-6 text-black hover:text-gray-500">
                            Log in here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
