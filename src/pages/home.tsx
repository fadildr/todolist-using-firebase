import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Blog from "../components/blog";
import FilterDataComponent from "../components/filterObject";
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // If there is no token, navigate to the login page
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h1 className="text-lg text-center mt-5">Welcome to the Home Page</h1>
      <div
        className=" w-10 mx-auto"
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        <p className="text-lg text-center mt-5 cursor-pointer underline text-green-500 hover:text-green-300">
          Logout
        </p>
      </div>
      <Blog />
      <div className="mt-5"></div>
      <FilterDataComponent />
      {/* Your home page content goes here */}
    </div>
  );
};

export default Home;
