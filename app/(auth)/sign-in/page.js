"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobalApi from "@/lib/GlobalApi";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function SignIn() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const router = useRouter()
  const [loader,setLoader]= useState()
  useEffect(()=>{
    const jwt= sessionStorage.getItem("jwt")
    console.log(jwt)
    if(jwt){
      router.push('/')
    }

  },[])

  const onSignIn = () => {
    setLoader(true)
    GlobalApi.SignIn(username, password).then(
      (res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        sessionStorage.setItem("jwt",res.data.token)
        toast("login succesfully");
        router.push('/')
        setLoader(false)
      },
      (e) => {
        console.log(e);
        toast("Invalid username or pasword")
        setLoader(false)
      }
    );
  };

  return (
    <div className="flex items-baseline justify-center my-10">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200">
        <img src="/login.png" width={100} height={100} alt="login" />
        <h2 className="font-bold text-3xl">Sign In to Account</h2>
        <h2 className="text-gray-500">
          Enter you Username and Password to Sign In
        </h2>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={() => onSignIn()} disabled={!(username || password)}>

            {loader?<LoaderIcon className="animate-spin"/>:'Sign In'}
          </Button>
          <p>
            Don't have an account
            <Link href={"/create-account"} className="text-blue-500">
              Click here to create new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
