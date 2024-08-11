import Navbar from "../Topbar/Navbar";
import Workspace from "../Workspace/Workspace";
import { useParams } from "react-router-dom"; // Assuming you're using React Router

const Problem = () => {
  // Get problemId from route params (assuming problemId is in the URL)
  const { id } = useParams(); // Or however you're getting the ID

  return (
    <div>
      <Navbar />
      <Workspace id= { id } /> 
    </div>
  );
};

export default Problem;