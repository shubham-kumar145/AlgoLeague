// export default AdminDeletePage;

import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axiosClient from '../utils/axiosClient';

const AdminDeletePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [allUsers, setAllUsers] = useState([]);
  const [role, setRole] = useState("");
  const [plans, setPlans] = useState("");

  const filteredUsers = allUsers.filter((data) => {
    return (role ? data.role === role : true) &&
           (plans ? data.plans === plans : true);
  });

  const fetchDetails = useCallback(async () => {
    try {
      const { data } = await axiosClient.get('/user/get-all-details');
      setAllUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails, user]);

  const handleDelete = async (userId) => {
    try {
      if (userId === user?._id) {
        alert("Can't delete your data from here");
        return;
      }
      await axiosClient.delete(`/user/deleteuser/${userId}`);
      await fetchDetails();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-6">

      {/* ================= Header ================= */}
      <div className="flex items-center justify-between bg-[#1D232A] rounded-xl px-6 py-4 shadow-md mb-6 flex-wrap gap-y-4">

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
          User Management
        </h1>

        <div className="hidden sm:block text-right">
          <p className="text-sm text-gray-400">Welcome</p>
          <p className="font-semibold text-primary uppercase">
            {user?.firstName || 'Admin'}
          </p>
        </div>
      </div>

      {/* ================= Filters ================= */}
      <div className="max-w-6xl mx-auto bg-[#1D232A] rounded-xl shadow-md px-6 py-4 mb-6 flex flex-wrap gap-6 justify-between">

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-300">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="select select-sm bg-[#191E24] text-white"
          >
            <option value="">All</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-300">
            Plan
          </label>
          <select
            value={plans}
            onChange={(e) => setPlans(e.target.value)}
            className="select select-sm bg-[#14181d] text-white"
          >
            <option value="">All</option>
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>
        </div>
      </div>

      {/* ================= Table ================= */}
      <div className="max-w-6xl mx-auto bg-[#1D232A] rounded-2xl shadow-xl overflow-hidden">

        <div className="overflow-x-auto">
          <table className="table w-full text-sm">
            <thead className="bg-[#191E24]  text-xs uppercase text-gray-400">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Plan</th>
                <th>Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#15191E] ">
              {filteredUsers.map((userdetails, index) => (
                <tr
                  key={userdetails._id}
                  className="hover:bg-[#191E24] transition"
                >
                  <td className='text-white'>{index + 1}</td>

                  <td className="uppercase font-medium text-white">
                    {userdetails.firstName}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase
                        ${
                          userdetails.plans === 'premium'
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-red-500/10 text-red-400'
                        }`}
                    >
                      {userdetails.plans}
                    </span>
                  </td>

                  <td className="uppercase text-gray-300">
                    {userdetails.role}
                  </td>

                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(userdetails._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDeletePage;
