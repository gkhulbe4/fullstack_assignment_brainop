import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id")

  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/user/${userId}`);
      return res.data.user;
    },
  });

  if (error) {
    return <h1>Error</h1>;
  }
  return (
    <div className="h-screen" style={{backgroundImage: "url('https://pbs.twimg.com/ext_tw_video_thumb/1496101358122016768/pu/img/CUt0j0MQ_B_joMeQ?format=jpg&name=large')"}}>
      {isLoading ? (
        <h1>Please wait , your details are loading</h1>
      ) : (
        <div className="card lg:card-side bg-base-100 shadow-xl text-gray-300" style={{backgroundImage: "url('https://pbs.twimg.com/ext_tw_video_thumb/1496101358122016768/pu/img/CUt0j0MQ_B_joMeQ?format=jpg&name=large')"}}>
  <figure><img src="https://pbs.twimg.com/profile_images/1496059189415849984/-kKPbLRr_400x400.jpg" alt="Album"/></figure>
  <div className="card-body">
    <h2 className="card-title">Hey {data.username}</h2>
    <p>{data.email}</p>
    <div className="card-actions justify-end items-center gap-3 text-gray-300">
      <h1>Wanna reset your password? Click on this button</h1>
    <button className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800  hover:scale-110 transition-all duration-300 ease-in-out" onClick={() => navigate("/resetpass")}>Reset Password</button>
    </div>
  </div>
</div>
      )}
    </div>
  );
}

export default Dashboard;
