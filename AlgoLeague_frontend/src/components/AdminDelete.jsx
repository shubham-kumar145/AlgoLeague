// import { useEffect, useState } from 'react';
// import axiosClient from '../utils/axiosClient';
// import { useSelector } from 'react-redux';
// import { NavLink } from 'react-router';

// const AdminDelete = () => {
//   const [problems, setProblems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     fetchProblems();
//   }, []);

//   const fetchProblems = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axiosClient.get('/problem/getAllProblem');
//       setProblems(data);
//     } catch (err) {
//       setError('Failed to fetch problems');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this problem?')) return;

//     try {
//       await axiosClient.delete(`/problem/delete/${id}`);
//       setProblems(problems.filter(problem => problem._id !== id));
//     } catch (err) {
//       setError('Failed to delete problem');
//       console.error(err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#020617]">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
//         <div className="alert alert-error max-w-xl">
//           <span>{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#020617] px-4 py-6">

//       {/* ===== Header ===== */}
//       <div className="flex items-center justify-between bg-[#020617] rounded-xl px-6 py-4 shadow-md mb-6 flex-wrap gap-y-4">

//         {user?.role === 'admin' ? (
//           <NavLink
//             to="/adminpage"
//             className="text-sm font-semibold uppercase text-gray-400 hover:text-primary transition"
//           >
//             ← Admin Panel
//           </NavLink>
//         ) : (
//           <NavLink
//             to="/"
//             className="text-sm font-semibold uppercase text-gray-400 hover:text-primary transition"
//           >
//             ← Home
//           </NavLink>
//         )}

//         <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
//           Delete Problems
//         </h1>

//         <div className="hidden sm:block text-right">
//           <p className="text-sm text-gray-400">Welcome</p>
//           <p className="font-semibold text-primary uppercase">
//             {user?.firstName || 'Admin'}
//           </p>
//         </div>
//       </div>

//       {/* ===== Table Card ===== */}
//       <div className="max-w-7xl mx-auto bg-[#1D232A] rounded-2xl shadow-xl overflow-hidden">

//         <div className="overflow-x-auto">
//           <table className="table w-full text-sm">
//             <thead className="bg-[#191E24] text-xs uppercase text-gray-400">
//               <tr>
//                 <th className="px-4 py-3">#</th>
//                 <th className="px-4 py-3">Title</th>
//                 <th className="px-4 py-3">Difficulty</th>
//                 <th className="px-4 py-3">Tags</th>
//                 <th className="px-4 py-3 text-center">Action</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-base-300">
//               {problems.map((problem, index) => (
//                 <tr
//                   key={problem._id}
//                   className="hover:bg-[#191E24] transition"
//                 >
//                   <td className="px-4 py-3">{index + 1}</td>

//                   <td className="px-4 py-3 font-medium uppercase text-white">
//                     {problem.title}
//                   </td>

//                   <td className="px-4 py-3">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-semibold uppercase
//                         ${
//                           problem.difficulty === 'easy'
//                             ? 'bg-green-500/10 text-green-400'
//                             : problem.difficulty === 'medium'
//                             ? 'bg-yellow-500/10 text-yellow-400'
//                             : 'bg-red-500/10 text-red-400'
//                         }
//                       `}
//                     >
//                       {problem.difficulty}
//                     </span>
//                   </td>

//                   <td className="px-4 py-3 uppercase text-gray-300">
//                     {problem.tags}
//                   </td>

//                   <td className="px-4 py-3 text-center">
//                     <button
//                       onClick={() => handleDelete(problem._id)}
//                       className="btn btn-sm btn-error text-white active:scale-95 transition"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {problems.length === 0 && (
//           <div className="text-center py-8 text-gray-400">
//             No problems found.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDelete;




import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';

const AdminDelete = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get('/problem/getAllProblem');
      setProblems(data);
    } catch (err) {
      setError('Failed to fetch problems');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this problem?')) return;

    try {
      await axiosClient.delete(`/problem/delete/${id}`);
      setProblems(problems.filter(problem => problem._id !== id));
    } catch (err) {
      setError('Failed to delete problem');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
        <div className="alert alert-error max-w-xl">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-6">

      {/* ===== Header ===== */}
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
          Delete Problems
        </h1>

        <div className="hidden sm:block text-right">
          <p className="text-sm text-gray-400">Welcome</p>
          <p className="font-semibold text-primary uppercase">
            {user?.firstName || 'Admin'}
          </p>
        </div>
      </div>

      {/* ===== Table Card ===== */}
      <div className="max-w-7xl mx-auto bg-[#1D232A] rounded-2xl shadow-xl overflow-hidden">

        <div className="overflow-x-auto">
          <table className="table w-full text-sm">
            <thead className="bg-[#191E24] text-xs uppercase text-gray-400">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Difficulty</th>
                <th className="px-4 py-3">Tags</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-base-300">
              {problems.map((problem, index) => (
                <tr
                  key={problem._id}
                  className="hover:bg-[#191E24] transition"
                >
                  <td className="px-4 py-3 text-white">{index + 1}</td>

                  <td className="px-4 py-3 font-medium uppercase text-white">
                    {problem.title}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase
                        ${
                          problem.difficulty === 'easy'
                            ? 'bg-green-500/10 text-green-400'
                            : problem.difficulty === 'medium'
                            ? 'bg-yellow-500/10 text-yellow-400'
                            : 'bg-red-500/10 text-red-400'
                        }
                      `}
                    >
                      {problem.difficulty}
                    </span>
                  </td>

                  <td className="px-4 py-3 uppercase text-gray-300">
                    {problem.tags}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(problem._id)}
                      className="btn btn-sm btn-error text-white active:scale-95 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {problems.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No problems found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDelete;
