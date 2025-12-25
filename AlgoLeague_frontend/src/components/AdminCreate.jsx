// import { useForm, useFieldArray } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import axiosClient from '../utils/axiosClient';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// /* ======================= ZOD SCHEMA ======================= */
// const problemSchema = z.object({
//   title: z.string().min(1, 'Title is required'),
//   description: z.string().min(1, 'Description is required'),
//   difficulty: z.enum(['easy', 'medium', 'hard']),
//   tags: z.enum(['array', 'linkedlist', 'graph', 'dp']),
//   visibletestcases: z.array(
//     z.object({
//       input: z.string().min(1),
//       output: z.string().min(1),
//       explanation: z.string().min(1),
//     })
//   ).min(1),
//   hiddentestcases: z.array(
//     z.object({
//       input: z.string().min(1),
//       output: z.string().min(1),
//     })
//   ).min(1),
//   StartCode: z.array(
//     z.object({
//       language: z.enum(['c++', 'java', 'javaScript']),
//       initialcode: z.string().min(1),
//     })
//   ).length(3),
//   referenceSolution: z.array(
//     z.object({
//       language: z.enum(['c++', 'java', 'javaScript']),
//       completeCode: z.string().min(1),
//     })
//   ).length(3),
// });

// /* ======================= COMPONENT ======================= */
// function AdminPanel() {
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);

//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     resolver: zodResolver(problemSchema),
//     defaultValues: {
//       title: '',
//       description: '',
//       difficulty: 'easy',
//       tags: 'array',
//       visibletestcases: [{ input: '', output: '', explanation: '' }],
//       hiddentestcases: [{ input: '', output: '' }],
//       StartCode: [
//         { language: 'c++', initialcode: '//write Code Here' },
//         { language: 'java', initialcode: '//write Code Here' },
//         { language: 'javaScript', initialcode: '//write Code Here' }
//       ],
//       referenceSolution: [
//         { language: 'c++', completeCode: '' },
//         { language: 'java', completeCode: '' },
//         { language: 'javaScript', completeCode: '' }
//       ]
//     }
//   });

//   const { fields: visibleFields, append: addVisible, remove: removeVisible } =
//     useFieldArray({ control, name: 'visibletestcases' });

//   const { fields: hiddenFields, append: addHidden, remove: removeHidden } =
//     useFieldArray({ control, name: 'hiddentestcases' });

//   const onSubmit = async (data) => {
//     try {
//       await axiosClient.post('/problem/create', data);
//       alert('Problem Created!');
//       navigate('/adminpage');
//     } catch (error) {
//       console.error(error.response?.data || error.message);
//       alert('Error: ' + (error.response?.data?.message || error.message));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] px-4 py-6 overflow-y-auto">

//       {/* ================= HEADER ================= */}
//       <div className="flex items-center justify-between bg-[#1D232A] rounded-xl px-6 py-4 shadow-md mb-8 flex-wrap gap-y-4">

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
//           Create Problem
//         </h1>

//         <div className="hidden sm:block text-right">
//           <p className="text-sm text-gray-400">Welcome</p>
//           <p className="font-semibold text-primary uppercase">
//             {user?.firstName || 'Admin'}
//           </p>
//         </div>
//       </div>

//       {/* ================= FORM CARD ================= */}
//       <div className="max-w-5xl mx-auto bg-[#1D232A] rounded-2xl shadow-xl p-6 md:p-8">

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

//           {/* ===== BASIC INFO ===== */}
//           <div className="space-y-4">
//             <h2 className="text-lg font-semibold text-white">Basic Information</h2>

//             <input
//               {...register("title")}
//               placeholder="Problem Title"
//               className="input input-bordered w-full"
//             />
//             {errors.title && <p className="text-red-400 text-sm">{errors.title.message}</p>}

//             <textarea
//               {...register("description")}
//               placeholder="Problem Description"
//               className="textarea textarea-bordered w-full min-h-[120px]"
//             />
//             {errors.description && <p className="text-red-400 text-sm">{errors.description.message}</p>}

//             <div className="flex gap-4 flex-wrap">
//               <select {...register("difficulty")} className="select select-bordered">
//                 <option value="easy">Easy</option>
//                 <option value="medium">Medium</option>
//                 <option value="hard">Hard</option>
//               </select>

//               <select {...register("tags")} className="select select-bordered">
//                 <option value="array">Array</option>
//                 <option value="linkedlist">Linked List</option>
//                 <option value="graph">Graph</option>
//                 <option value="dp">DP</option>
//               </select>
//             </div>
//           </div>

//           {/* ===== VISIBLE TEST CASES ===== */}
//           <div className="space-y-4">
//             <h2 className="text-lg font-semibold text-white">Visible Test Cases</h2>

//             {visibleFields.map((field, index) => (
//               <div key={field.id} className="bg-[#191E24] p-4 rounded-xl space-y-3">
//                 <input {...register(`visibletestcases.${index}.input`)} placeholder="Input" className="input input-bordered w-full" />
//                 <input {...register(`visibletestcases.${index}.output`)} placeholder="Output" className="input input-bordered w-full" />
//                 <textarea {...register(`visibletestcases.${index}.explanation`)} placeholder="Explanation" className="textarea textarea-bordered w-full" />
//                 <button type="button" onClick={() => removeVisible(index)} className="btn btn-sm btn-error">
//                   Remove
//                 </button>
//               </div>
//             ))}

//             <button type="button" onClick={() => addVisible({ input: '', output: '', explanation: '' })} className="btn btn-sm btn-primary">
//               + Add Visible Case
//             </button>
//           </div>

//           {/* ===== HIDDEN TEST CASES ===== */}
//           <div className="space-y-4">
//             <h2 className="text-lg font-semibold text-white">Hidden Test Cases</h2>

//             {hiddenFields.map((field, index) => (
//               <div key={field.id} className="bg-[#191E24] p-4 rounded-xl space-y-3">
//                 <input {...register(`hiddentestcases.${index}.input`)} placeholder="Input" className="input input-bordered w-full" />
//                 <input {...register(`hiddentestcases.${index}.output`)} placeholder="Output" className="input input-bordered w-full" />
//                 <button type="button" onClick={() => removeHidden(index)} className="btn btn-sm btn-error">
//                   Remove
//                 </button>
//               </div>
//             ))}

//             <button type="button" onClick={() => addHidden({ input: '', output: '' })} className="btn btn-sm btn-primary">
//               + Add Hidden Case
//             </button>
//           </div>

//           {/* ===== CODE SECTIONS ===== */}
//           {[0, 1, 2].map((index) => (
//             <div key={index} className="space-y-3">
//               <h2 className="text-lg font-semibold text-white">
//                 {['C++', 'Java', 'JavaScript'][index]}
//               </h2>

//               <textarea
//                 {...register(`StartCode.${index}.initialcode`)}
//                 placeholder="Starter Code"
//                 className="textarea textarea-bordered w-full min-h-[140px]"
//               />

//               <textarea
//                 {...register(`referenceSolution.${index}.completeCode`)}
//                 placeholder="Reference Solution"
//                 className="textarea textarea-bordered w-full min-h-[160px]"
//               />
//             </div>
//           ))}

//           {/* ===== SUBMIT ===== */}
//           <button type="submit" className="btn btn-primary w-full text-lg">
//             Create Problem
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdminPanel;


import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* ======================= ZOD SCHEMA ======================= */
const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.enum(['array', 'linkedlist', 'graph', 'dp']),
  visibletestcases: z.array(
    z.object({
      input: z.string().min(1),
      output: z.string().min(1),
      explanation: z.string().min(1),
    })
  ).min(1),
  hiddentestcases: z.array(
    z.object({
      input: z.string().min(1),
      output: z.string().min(1),
    })
  ).min(1),
  StartCode: z.array(
    z.object({
      language: z.enum(['c++', 'java', 'javaScript']),
      initialcode: z.string().min(1),
    })
  ).length(3),
  referenceSolution: z.array(
    z.object({
      language: z.enum(['c++', 'java', 'javaScript']),
      completeCode: z.string().min(1),
    })
  ).length(3),
});

/* ======================= COMPONENT ======================= */
function AdminPanel() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: '',
      description: '',
      difficulty: 'easy',
      tags: 'array',
      visibletestcases: [{ input: '', output: '', explanation: '' }],
      hiddentestcases: [{ input: '', output: '' }],
      StartCode: [
        { language: 'c++', initialcode: '//write Code Here' },
        { language: 'java', initialcode: '//write Code Here' },
        { language: 'javaScript', initialcode: '//write Code Here' }
      ],
      referenceSolution: [
        { language: 'c++', completeCode: '' },
        { language: 'java', completeCode: '' },
        { language: 'javaScript', completeCode: '' }
      ]
    }
  });

  const { fields: visibleFields, append: addVisible, remove: removeVisible } =
    useFieldArray({ control, name: 'visibletestcases' });

  const { fields: hiddenFields, append: addHidden, remove: removeHidden } =
    useFieldArray({ control, name: 'hiddentestcases' });

  const onSubmit = async (data) => {
    try {
      await axiosClient.post('/problem/create', data);
      alert('Problem Created!');
      navigate('/adminpage');
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-6 overflow-y-auto">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between bg-[#1D232A] rounded-xl px-6 py-4 shadow-md mb-8 flex-wrap gap-y-4">

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
          Create Problem
        </h1>

        <div className="hidden sm:block text-right">
          <p className="text-sm text-gray-400">Welcome</p>
          <p className="font-semibold text-primary uppercase">
            {user?.firstName || 'Admin'}
          </p>
        </div>
      </div>

      {/* ================= FORM CARD ================= */}
      <div className="max-w-5xl mx-auto bg-[#1D232A] rounded-2xl shadow-xl p-6 md:p-8">

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* ===== BASIC INFO ===== */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Basic Information</h2>

            <input
              {...register("title")}
              placeholder="Problem Title"
              className="input input-bordered w-full bg-blue-100 text-black"
            />
            {errors.title && <p className="text-red-400 text-sm">{errors.title.message}</p>}

            <textarea
              {...register("description")}
              placeholder="Problem Description"
              className="textarea textarea-bordered w-full min-h-[120px] bg-blue-100 text-black"
            />
            {errors.description && <p className="text-red-400 text-sm">{errors.description.message}</p>}

            <div className="flex gap-4 flex-wrap ">
              <select {...register("difficulty")} className="select select-bordered bg-blue-100 text-black">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              <select {...register("tags")} className="select select-bordered bg-blue-100 text-black">
                <option value="array">Array</option>
                <option value="linkedlist">Linked List</option>
                <option value="graph">Graph</option>
                <option value="dp">DP</option>
              </select>
            </div>
          </div>

          {/* ===== VISIBLE TEST CASES ===== */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Visible Test Cases</h2>

            {visibleFields.map((field, index) => (
              <div key={field.id} className="p-4 rounded-xl space-y-3 bg-blue-200">
                <input {...register(`visibletestcases.${index}.input`)} placeholder="Input" className="input input-bordered w-full" />
                <input {...register(`visibletestcases.${index}.output`)} placeholder="Output" className="input input-bordered w-full" />
                <textarea {...register(`visibletestcases.${index}.explanation`)} placeholder="Explanation" className="textarea textarea-bordered w-full" />
                <button type="button" onClick={() => removeVisible(index)} className="btn btn-sm btn-error">
                  Remove
                </button>
              </div>
            ))}

            <button type="button" onClick={() => addVisible({ input: '', output: '', explanation: '' })} className="btn btn-sm btn-primary">
              + Add Visible Case
            </button>
          </div>

          {/* ===== HIDDEN TEST CASES ===== */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Hidden Test Cases</h2>

            {hiddenFields.map((field, index) => (
              <div key={field.id} className="p-4 rounded-xl space-y-3 bg-blue-200">
                <input {...register(`hiddentestcases.${index}.input`)} placeholder="Input" className="input input-bordered w-full" />
                <input {...register(`hiddentestcases.${index}.output`)} placeholder="Output" className="input input-bordered w-full" />
                <button type="button" onClick={() => removeHidden(index)} className="btn btn-sm btn-error">
                  Remove
                </button>
              </div>
            ))}

            <button type="button" onClick={() => addHidden({ input: '', output: '' })} className="btn btn-sm btn-primary">
              + Add Hidden Case
            </button>
          </div>

          {/* ===== CODE SECTIONS ===== */}
          {[0, 1, 2].map((index) => (
            <div key={index} className="space-y-3">
              <h2 className="text-lg font-semibold text-white">
                {['C++', 'Java', 'JavaScript'][index]}
              </h2>

              <textarea
                {...register(`StartCode.${index}.initialcode`)}
                placeholder="Starter Code"
                className="textarea textarea-bordered w-full min-h-[140px] bg-blue-100 text-black"
              />

              <textarea
                {...register(`referenceSolution.${index}.completeCode`)}
                placeholder="Reference Solution"
                className="textarea textarea-bordered w-full min-h-[160px] bg-blue-50 text-black"
              />
            </div>
          ))}

          {/* ===== SUBMIT ===== */}
          <button type="submit" className="btn btn-primary w-full text-lg">
            Create Problem
          </button>

        </form>
      </div>
    </div>
  );
}

export default AdminPanel;

