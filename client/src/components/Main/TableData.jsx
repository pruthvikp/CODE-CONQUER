import React from 'react';
import { Link } from 'react-router-dom';

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
                        <td>
                            <Link to={`/problem/${problem.id}`}>{problem.title}</Link>
                        </td>
                        <td>{problem.difficulty}</td>
                        <td>{problem.category}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableData;