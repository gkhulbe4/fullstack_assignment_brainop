import { useEffect } from "react";
import usePostStore from "@/utils/postStore";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

type Post = {
  id: string;
  title: string;
  description: string;
};

function Posts() {
  const { auth } = usePostStore((state) => ({
    auth: state.auth,
  }));
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  const fetchPosts = async ({ pageParam = "" }) => {
    const res = await axios.get(
      `http://localhost:3000/getposts?cursor=${pageParam}`
    );
    return res.data;
  };

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: fetchPosts,
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
      initialPageParam: "",
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (auth === false) {
    setTimeout(() => {
      navigate("/");
    }, 2000);
    return (
      <div className="h-screen">
        <h1>You are not signed in. Redirecting you to Signup Page</h1>
      </div>
    );
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <div
      className="bg-gray-700 flex flex-col items-center justify-center pt-6 gap-3"
      style={{
        backgroundImage:
          "url('https://pbs.twimg.com/ext_tw_video_thumb/1496101358122016768/pu/img/CUt0j0MQ_B_joMeQ?format=jpg&name=large')",
      }}
    >
      {data &&
        data.pages.map((page) => {
          return (
            <div
              className="flex flex-col gap-3 items-center justify-start w-[60%] rounded-3xl"
              key={page.nextId ?? "lastPage"}
            >
              {page.posts.map((post: Post) => (
                <div
                  className="border border-gray-700 bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 text-white py-2 px-4 rounded-2xl"
                  key={post.id}
                >
                  <h1 className="text-2xl font-semibold">{post.title}</h1>
                  <p className="font-extralight">{post.description}</p>
                </div>
              ))}
            </div>
          );
        })}
      <span style={{ visibility: "hidden" }} ref={ref}>
        intersection observer marker
      </span>
      {isFetchingNextPage ? (
        <div className="font-extrabold text-4xl text-white">Loading...</div>
      ) : null}
    </div>
  );
}

export default Posts;
