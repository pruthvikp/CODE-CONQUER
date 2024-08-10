// import { Link } from "react-router-dom";

// const TableData = ({ problems }) => {
//   return (
//     <div className="main-container">
//       <table className="problem-table">
//         <thead className="table-head-col">
//           <tr>
//             <th className="table-heading">Rank</th>
//             <th className="table-heading">Title</th>
//             <th className="table-heading">Difficulty</th>
//             <th className="table-heading">Category</th>
//           </tr>
//         </thead>
//         <tbody>
//           {problems.map((problem) => {
//             const difficultyColor =
//               doc.difficulty === "Easy"
//                 ? "green"
//                 : doc.difficulty === "Medium"
//                 ? "yellow"
//                 : "red";
//             return (
//               <tr className={idx % 2 === 1 ? "row-odd" : ""} key={doc.id}>
//                 <th>{doc.order}</th>
//                 <td className="title">
//                   <Link to={`/problem/${doc.id}`}>{doc.title}</Link>
//                 </td>
//                 <td style={{ color: difficultyColor }}>{doc.difficulty}</td>
//                 <td>{doc.category}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TableData;


import React from 'react';

const TableData = ({ problems }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Difficulty</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {problems.map((problem) => (
                    <tr key={problem._id}>
                        <td>{problem.id}</td>
                        <td>{problem.title}</td>
                        <td>{problem.difficulty}</td>
                        <td>{problem.category}</td>
                    
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableData;
