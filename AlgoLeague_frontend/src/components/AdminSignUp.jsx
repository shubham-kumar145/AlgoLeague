// export default AdminSignUp;


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const adminsignupSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
  emailId: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  age: z.coerce
    .number()
    .min(6, "Can register after age 6")
    .max(80, "Cannot register after age 80"),
  role: z.enum(["user", "admin"], { required_error: "Select a role" }),
});

const AdminSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(adminsignupSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axiosClient.post('/user/admin/register', data);
      alert('Admin Registered Successfully');
      reset();
      navigate('/adminpage');
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      if (message.toLowerCase().includes("email")) {
        setError("emailId", { type: "server", message });
      } else {
        alert('Error: ' + message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col px-4 py-6">

      {/* ===== Header ===== */}
      <div className="flex items-center justify-between bg-[#191E24] rounded-xl px-6 py-4 shadow-md mb-6 flex-wrap gap-y-4">

        {user?.role === 'admin' ? (
          <NavLink
            to="/adminpage"
            className="text-sm font-semibold uppercase text-gray-400 hover:text-primary transition"
          >
            ← Admin Panel
          </NavLink>
        ) : (
          <NavLink
            to="/"
            className="text-sm font-semibold uppercase text-gray-400 hover:text-primary transition"
          >
            ← Home
          </NavLink>
        )}

        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          Admin Registration
        </h1>

        <div className="hidden sm:block text-right">
          <p className="text-sm text-gray-400">Welcome</p>
          <p className="font-semibold text-primary uppercase">
            {user?.firstName || 'Admin'}
          </p>
        </div>
      </div>

      <div className="flex justify-center flex-1">
        <div className="w-full max-w-3xl bg-[#1D232A] rounded-2xl shadow-xl p-6">

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* ===== Name ===== */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300">
                Admin Name
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    {...register("firstName")}
                    className={`input input-bordered w-full bg-gray-800 text-white
                      ${errors.firstName ? "border-red-500" : "border-gray-700"}`}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName")}
                    className={`input input-bordered w-full bg-gray-800 text-white
                      ${errors.lastName ? "border-red-500" : "border-gray-700"}`}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ===== Email ===== */}
            <div>
              <label className="text-sm font-medium text-gray-300">
                Admin Email
              </label>
              <input
                type="email"
                placeholder="Email Address"
                {...register("emailId")}
                className={`input input-bordered w-full bg-gray-800 text-white
                  ${errors.emailId ? "border-red-500" : "border-gray-700"}`}
              />
              {errors.emailId && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.emailId.message}
                </p>
              )}
            </div>

            {/* ===== Age ===== */}
            <div>
              <label className="text-sm font-medium text-gray-300">
                Admin Age
              </label>
              <input
                type="number"
                placeholder="Age"
                {...register("age")}
                className={`input input-bordered w-full bg-gray-800 text-white
                  ${errors.age ? "border-red-500" : "border-gray-700"}`}
              />
              {errors.age && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.age.message}
                </p>
              )}
            </div>

            {/* ===== Password ===== */}
            <div>
              <label className="text-sm font-medium text-gray-300">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className={`input input-bordered w-full bg-gray-800 text-white pr-10
                    ${errors.password ? "border-red-500" : "border-gray-700"}`}
                />

                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* ===== Role ===== */}
            <div>
              <label className="text-sm font-medium text-gray-300">
                User Role
              </label>
              <select
                {...register("role")}
                className={`select w-full bg-gray-800 text-white
                  ${errors.role ? "border-red-500" : "border-gray-700"}`}
              >
                <option value="">-- Select Role --</option>
                <option value="user">USER</option>
                <option value="admin">ADMIN</option>
              </select>
              {errors.role && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* ===== Actions ===== */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? "Creating Account..." : "Register"}
              </button>

              <button
                type="button"
                onClick={() => reset()}
                className="btn btn-outline flex-1"
              >
                Reset
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;



