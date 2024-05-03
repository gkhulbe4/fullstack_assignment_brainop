import usePostStore from "@/utils/postStore";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const { auth, setAuth } = usePostStore((state) => ({
    auth: state.auth,
    setAuth: state.setAuth,
  }));

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/me", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setAuth(true);
      })
      .catch(() => {
        setAuth(false);
      });
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 shadow-md bg-black">
      <h1
        className="text-3xl font-bold cursor-pointer bg-gradient-to-r from-pink-200 to-blue-800 text-transparent bg-clip-text font-serif mb-4 md:mb-0 md:mr-4"
        onClick={() => navigate("/")}
      >
        BrainOp
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {auth ? (
          <>
            <button
              className="bg-black text-white px-4 py-2 rounded-xl border border-white hover:bg-gray-800 hover:scale-110 transition-all duration-300 ease-in-out"
              onClick={() => {
                navigate(`/posts`);
              }}
            >
              Posts
            </button>
            <button
              className="bg-black text-white px-4 py-2 rounded-xl border border-white hover:bg-gray-800 hover:scale-110 transition-all duration-300 ease-in-out"
              onClick={() => {
                localStorage.setItem("token", "");
                localStorage.setItem("id", "");
                window.location.href = "/";
              }}
            >
              Logout
            </button>
            <button
              className="bg-black text-white px-4 py-2 rounded-xl border border-white hover:bg-gray-800 hover:scale-110 transition-all duration-300 ease-in-out"
              onClick={() => {
                navigate(`/dashboard/${userId}`);
              }}
            >
              Profile
            </button>
          </>
        ) : (
          <button
            className="bg-black text-white px-4 py-2 rounded-xl border border-white hover:bg-gray-800 hover:scale-110 transition-all duration-300 ease-in-out"
            onClick={() => navigate("/signin")}
          >
            Signin
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
