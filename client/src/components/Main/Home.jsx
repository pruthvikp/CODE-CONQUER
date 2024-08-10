import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Topbar/Navbar";
import "./Home.css";
import TableData from "./TableData";

const Home = () => {
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get('http://localhost:5500/api/problems');

                setProblems(Array.isArray(response.data.data) ? response.data.data : []); // Access the correct part of the response
            } catch (error) {
                console.error('Error fetching problems', error);
            }
        };

        fetchProblems();
    }, []);

  return (
    <>
      <Navbar />
        <h1>Problem List</h1>
      <TableData problems={problems} />
    </>
  );
}

export default Home;
