import { resetPassSchema } from "../../schema/index";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "../../@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Toaster, toast } from "sonner";

type reset = z.infer<typeof resetPassSchema>;

function ResetPass() {
  const userId = localStorage.getItem("id");
  const form = useForm<reset>({
    resolver: zodResolver(resetPassSchema),
    defaultValues: {
      oldPass: "",
      newPass: "",
    },
  });

  async function onSubmit(data: reset) {
    const oldPass = data.oldPass;
    const newPass = data.newPass;
    try {
      const res = await axios.put(
        `http://localhost:3000/resetpass/${userId}`,
        {
          oldPass: oldPass,
          newPass: newPass,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(res.data.message);
      localStorage.setItem("token", "");
      localStorage.setItem("id" , "")
      setTimeout(() => {
        window.location.href = "/"
      },1500)
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error);
      }
    }
  }
  return (
    <div className="flex flex-col items-start justify-center h-screen bg-gray-700 gap-2" style={{backgroundImage: "url('https://cdn.akamai.steamstatic.com/steam/apps/1791480/ss_1db6a3147e29c4e4da1a639154f2d119e07fd2ef.1920x1080.jpg?t=1702331054')"}}>
       <h1 className="text-center w-full text-2xl font-extrabold text-white ">
        Reset your password
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-md mx-auto p-8 border border-gray-500 rounded-xl bg-white backdrop-filter backdrop-blur-lg bg-opacity-10"
        >
          <FormField
            control={form.control}
            name="oldPass"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormControl>
                  <Input
                    type="password"
                    className="border border-gray-400 bg-opacity-15 bg-black placeholder-white text-gray-200 font-extralight text-sm rounded-xl py-5 px-3 w-full outline-none tracking-wider focus:ring-2 focus:ring-gray-300"
                    placeholder="Enter your old password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPass"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormControl>
                  <Input
                    type="password"
                    className="border border-gray-400 bg-opacity-15 bg-black placeholder-white text-gray-200 font-extralight text-sm rounded-xl py-5 px-3 w-full outline-none tracking-wider focus:ring-2 focus:ring-gray-300"
                    placeholder="Enter your new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
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

export default ResetPass;
