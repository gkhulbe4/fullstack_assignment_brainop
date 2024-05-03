import React, { useState , useEffect } from "react";
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
import { signupSchema } from "../../schema/index";
import { z } from "zod";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import usePostStore from "@/utils/postStore";

type signup = z.infer<typeof signupSchema>;
function Signup() {
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const { auth } = usePostStore((state) => ({
    auth: state.auth,
  }));
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === true) {
      navigate("/posts");
    }
  }, [auth, navigate]);

  const form = useForm<signup>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: signup) {
    const name = data.name;
    const username = data.username;
    const email = data.email;
    const password = data.password;
    if (checkbox === false) {
      toast.info("Please accept the terms and confitions");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/signup",
        {
          name: name,
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
      toast.success(res.data.message);
    } catch (error: unknown) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error);
      }
    }
  }

  return (
    <div className="flex flex-col items-start justify-center h-screen bg-gray-700 gap-2" style={{backgroundImage: "url('https://cdn.akamai.steamstatic.com/steam/apps/1791480/ss_1db6a3147e29c4e4da1a639154f2d119e07fd2ef.1920x1080.jpg?t=1702331054')"}}>
      <h1 className="text-center w-full text-2xl font-extrabold">
        Please signup to create an account
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-md mx-auto p-8 border border-gray-500 rounded-xl bg-white backdrop-filter backdrop-blur-lg bg-opacity-10"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormControl>
                  <Input
                    className="border border-gray-400 bg-opacity-15 bg-black placeholder-white text-gray-200 font-extralight text-sm rounded-xl py-5 px-3 w-full outline-none tracking-wider focus:ring-2 focus:ring-gray-300 "
                    placeholder="Enter name (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormControl>
                  <Input
                    className="border border-gray-400 bg-opacity-15 bg-black placeholder-white text-gray-200 font-extralight text-sm rounded-xl py-5 px-3 w-full outline-none tracking-wider focus:ring-2 focus:ring-gray-300"
                    placeholder="Enter username"
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
                    placeholder="Enter email"
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
          <div className="flex items-center space-x-2">
            <input
              id="terms"
              type="checkbox"
              checked={checkbox}
              onClick={() => setCheckbox(!checkbox)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
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

export default Signup;
