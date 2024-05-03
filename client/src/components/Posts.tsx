import React, { useEffect, useState } from "react";
import usePostStore from "@/utils/postStore";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type Post = {
  id: string;
  title: string;
  description: string;
};

function Posts() {
  const queryClient = useQueryClient();
  const { auth } = usePostStore((state) => ({
    auth: state.auth,
  }));

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/getposts");
      return res.data.posts;
    },
  });

  // async function getPosts() {
  //   try {
  //     const res = await axios.get("http://localhost:3000/getposts");
  //     console.log(res.data.posts);
  //     setPosts(res.data.posts);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching posts:", error);
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   getPosts();
  // }, []);

  if (!auth) {
    return <div className="h-screen">Please login to see the posts</div>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <div className="bg-gray-700 flex items-center justify-center" style={{backgroundImage: "url('https://pbs.twimg.com/ext_tw_video_thumb/1496101358122016768/pu/img/CUt0j0MQ_B_joMeQ?format=jpg&name=large')"}}>
      {isLoading ? (
        <h1>Please wait , Posts are loading</h1>
      ) : (
        <div className="flex flex-col gap-3 items-center justify-start w-[60%] bg-[#000033] rounded-3xl" >
          {data.map((post: Post) => (
            <div className="card w-96 bg-purple-200 text-primary-content" key={post.id}>
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p>{post.description}</p>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Posts;
