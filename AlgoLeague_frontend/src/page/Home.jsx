import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';

function Home() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [problems, setProblems] = useState([]);
    const [solvedProblems, setSolvedProblems] = useState([]);
    const [filters, setFilters] = useState({
        difficulty: 'all',
        tag: 'all',
        status: 'all'
    });
    const navigate = useNavigate();

    const handleResetFilters = () => {
        setFilters({
            difficulty: 'all',
            tag: 'all',
            status: 'all'
        });
    };

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const { data } = await axiosClient.get('/problem/getAllProblem');
                setProblems(data);
            } catch (error) {
                console.error('Error fetching problems:', error);
            }
        };

        const fetchSolvedProblems = async () => {
            try {
                const { data } = await axiosClient.get('/problem/problemSolvedByUser');
                setSolvedProblems(data);
            } catch (error) {
                console.error('Error fetching solved problems:', error);
            }
        };

        fetchProblems();
        if (user) fetchSolvedProblems();
    }, [user]);

    const handleLogout = () => {
        dispatch(logoutUser());
        setSolvedProblems([]);
    };

    const filteredProblems = problems.filter(problem => {
        const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
        const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
        const statusMatch =
            filters.status === 'all' ||
            solvedProblems.some(sp => sp._id === problem._id);
        return difficultyMatch && tagMatch && statusMatch;
    });

    return (
        <div className="min-h-screen bg-[#0f172a] text-gray-200">
            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 bg-[#020617] border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <NavLink to="/" className="text-xl font-bold tracking-wide text-indigo-400">
                        AlgoLeague
                    </NavLink>

                    {/* PROFILE */}
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            className="flex items-center gap-3 cursor-pointer px-2 py-1 rounded-lg hover:bg-gray-800 transition"
                        >
                            <img
                                src={`https://ui-avatars.com/api/?name=${user?.firstName || 'User'}&background=6366f1&color=fff`}
                                className="w-9 h-9 rounded-full"
                            />
                            <div className="leading-tight">
                                <p className="text-sm font-semibold">{user?.firstName}</p>
                                <p className="text-xs text-gray-400">Edit profile</p>
                            </div>
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content mt-3 w-48 rounded-xl bg-[#020617] border border-gray-800 shadow-xl"
                        >
                            {user?.role === 'admin' && (
                                <li>
                                    <NavLink to="/adminpage" className="px-4 py-2 block hover:bg-gray-800">
                                        Admin
                                    </NavLink>
                                </li>
                            )}
                            <li>
                                <NavLink to="/profile" className="px-4 py-2 block hover:bg-gray-800">
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 w-full text-left hover:bg-red-500/10 text-red-400"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* MAIN CONTENT */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                {/* FILTER BAR */}
                <div className="flex flex-wrap items-center gap-4 mb-6 bg-[#020617] border border-gray-800 rounded-xl p-4">
                    <select
                        className="select select-sm bg-[#0f172a] border-gray-700"
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    >
                        <option value="all">All Problems</option>
                        <option value="solved">Solved</option>
                    </select>

                    <select
                        className="select select-sm bg-[#0f172a] border-gray-700"
                        value={filters.difficulty}
                        onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                    >
                        <option value="all">Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>

                    <select
                        className="select select-sm bg-[#0f172a] border-gray-700"
                        value={filters.tag}
                        onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
                    >
                        <option value="all">Tags</option>
                        <option value="array">Array</option>
                        <option value="linkedlist">Linked List</option>
                        <option value="graph">Graph</option>
                        <option value="dp">DP</option>
                    </select>

                    <button
                        onClick={handleResetFilters}
                        className="btn btn-sm btn-ghost text-gray-400 hover:text-white hover:bg-gray-800 ml-auto"
                    >
                        Reset
                    </button>
                </div>

                {/* TABLE HEADER */}
                <div className="grid grid-cols-12 px-4 py-2 text-xs text-gray-400 border-b border-gray-800">
                    <div className="col-span-1">Status</div>
                    <div className="col-span-6">Title</div>
                    <div className="col-span-3">Tags</div>
                    <div className="col-span-2 text-right">Difficulty</div>
                </div>

                {/* PROBLEM ROWS */}
                <div className="divide-y divide-gray-800">
                    {filteredProblems.map(problem => {
                        const solved = solvedProblems.some(sp => sp._id === problem._id);

                        return (
                            <div
                                key={problem._id}
                                className="grid grid-cols-12 px-4 py-3 text-sm hover:bg-[#020617] transition"
                            >
                                <div className="col-span-1">
                                    {solved && <span className="text-green-400">✔</span>}
                                </div>

                                <div className="col-span-6">
                                    <NavLink
                                        to={`/problem/${problem._id}`}
                                        className="hover:text-indigo-400 uppercase"
                                    >
                                        {problem.title}
                                    </NavLink>
                                </div>

                                <div className="col-span-3">
                                    <span className="badge badge-outline text-blue-400 border-blue-400 uppercase">
                                        {problem.tags}
                                    </span>
                                </div>

                                <div className={ ` uppercase col-span-2 text-right ${getDifficultyText(problem.difficulty)}`}>
                                    {problem.difficulty}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

const getDifficultyText = (difficulty) => {
    switch (difficulty.toLowerCase()) {
        case 'easy': return 'text-green-400';
        case 'medium': return 'text-yellow-400';
        case 'hard': return 'text-red-400';
        default: return 'text-gray-400';
    }
};

export default Home;
