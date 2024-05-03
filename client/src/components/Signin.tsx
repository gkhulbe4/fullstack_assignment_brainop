import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../@/components/ui/form";
import { Input } from "./ui/input";
import { signinSchema } from "../../schema/index";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import usePostStore from "@/utils/postStore";
import { Toaster, toast } from "sonner";
import { useState } from "react";

type signin = z.infer<typeof signinSchema>;
function Signin() {
  const [view, setView] = useState<boolean>(false);
  const { auth, setAuth} = usePostStore((state) => ({
    auth: state.auth,
    setAuth: state.setAuth,
  }));

  const navigate = useNavigate();

  const form = useForm<signin>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      username: "johndoe",
      email: "john@gmail.com",
      password: "123",
    },
  });

  async function onSubmit(data: signin) {
    const username = data.username;
    const email = data.email;
    const password = data.password;
    try {
      const res = await axios.post(
        "http://localhost:3000/signin",
        {
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", res.data.token);
      setAuth(true);
      // alert(typeof res.data.userId)
      localStorage.setItem("id", res.data.userId);
      navigate("/posts");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error);
      }
    }
  }

  if(auth === true ) return (<div className="h-screen"> You are already signed in. Please logout to signin with an account.</div>)

  return (
    <div className="flex flex-col items-start justify-center h-screen bg-gray-700 gap-2" style={{backgroundImage: "url('https://cdn.akamai.steamstatic.com/steam/apps/1791480/ss_1db6a3147e29c4e4da1a639154f2d119e07fd2ef.1920x1080.jpg?t=1702331054')"}}>
      <h1 className="text-center w-full text-2xl font-extrabold">
        Please signin to your account
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-md mx-auto p-8 border border-gray-500 rounded-xl bg-white backdrop-filter backdrop-blur-lg bg-opacity-10"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormControl>
                  <Input
                    className="border border-gray-400 bg-opacity-15 bg-black placeholder-white text-gray-200 font-extralight text-sm rounded-xl py-5 px-3 w-full outline-none tracking-wider focus:ring-2 focus:ring-gray-300"
                    placeholder="Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormControl>
                  <Input
                    className="border border-gray-400 bg-opacity-15 bg-black placeholder-white text-gray-200 font-extralight text-sm rounded-xl py-5 px-3 w-full outline-none tracking-wider focus:ring-2 focus:ring-gray-300"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="relative">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center">
                  <FormControl>
                    <Input
                      type={view ? "text" : "password"}
                      className="border border-gray-400 bg-opacity-15 bg-black placeholder-white text-gray-200 font-extralight text-sm rounded-xl py-5 px-3 w-full outline-none tracking-wider focus:ring-2 focus:ring-gray-300"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div
              className="absolute top-3 right-3 w-max text-sm text-gray-200 cursor-pointer"
              onClick={() => setView(!view)}
            >
              {view ? "Hide" : "Show"}
            </div>
          </div>
          <Button
            className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 hover:scale-110 transition-all duration-300 ease-in-out"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
      <Toaster richColors position="top-center" expand={true} />
    </div>
  );
}

export default Signin;
