"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobalApi from "@/lib/GlobalApi";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { toast } from "sonner";

function createAccount() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const [loader,setLoader]= useState()
  useEffect(()=>{
    const jwt= sessionStorage.getItem("jwt")
    if(jwt){
      router.push('/sign-in')
    }

  },[])

  const onCreateAccount = () => {
    setLoader(true)
    GlobalApi.registerUser(username, email, password).then(
      (res) => {
        console.log(res.data.user);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        sessionStorage.setItem("jwt", res.data.token);

        toast("account created succesfully");
        router.push("/sign-in");
        setLoader(false)
      },
      (e) => {
        toast("error while createing account");
        toast(e.res.data.error.message)
        setLoader(false)

      }
    );
  };
  return (
    <div className="flex items-baseline justify-center my-10">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200">
        <img src="/login.png" width={100} height={100} alt="login" />
        <h2 className="font-bold text-3xl">Create an Account</h2>
        <h2 className="text-gray-500">
          Enter you Username,Email and Password to Create an account
        </h2>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={() => onCreateAccount()}
            disabled={!(username || email || password)}
          >
            {loader?<LoaderIcon className="animate-spin"/>:'Craete an Account'}
          </Button>
          <p>
            Already have an account
            <Link href={"/sign-in"} className="text-blue-500">
              Click here to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default createAccount;
