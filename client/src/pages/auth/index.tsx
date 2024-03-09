import { apiInstance, setAuthToken } from "@/api/config";
import { APIROUTES } from "@/api/constants";
import Logo from "@/components/custom/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Authpage() {
  const [file, setFile] = useState();

  const signupRef = {
    name: useRef<any>(),
    email: useRef<any>(),
    password: useRef<any>(),
  };
  const loginRef = { email: useRef<any>(), password: useRef<any>() };
  const navigate = useNavigate();

  const upload = async () => {
    try {
      console.log(file);

      const formData: any = new FormData();
      formData.append("file", file);
      formData.append("prompt", "dywgdywgw");
      const { data } = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async () => {
    const email = signupRef.email?.current?.value;
    const password = signupRef.password?.current?.value;
    const name = signupRef.name?.current?.value;
    try {
      if (name && email && password) {
        setAuthToken("");
        const { data } = await axios.post(
          "http://localhost:5000/api/v1/user/register",
          {
            name,
            email,
            password,
          }
        );
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        prompt("Please fill all the required fields");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const login = async () => {
    const email = loginRef.email?.current?.value;
    const password = loginRef.password?.current?.value;
    try {
      if (email && password) {
        setAuthToken("");
        const { data } = await axios.post(
          "http://localhost:5000/api/v1/user/login",
          {
            email,
            password,
          }
        );
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        prompt("Please fill all the required fields");
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(file);

  return (
    <div className="w-full flex flex-col items-center justify-center h-[100dvh]">
      <div className="">
        <Logo />
      </div>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid rounded-[20px] w-full grid-cols-2">
          <TabsTrigger className="rounded-[20px]" value="account">
            Signup
          </TabsTrigger>
          <TabsTrigger className="rounded-[20px]" value="password">
            Login
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="rounded-[10px] shadow-md border-slate-600 mt-4">
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Fill the details below to onboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" ref={signupRef.name} placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  ref={signupRef.email}
                  placeholder="medimind@gmail.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  ref={signupRef.password}
                  placeholder="*******"
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={(e: any) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => signup()}>Signup</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card className="mt-4 border-slate-600 rounded-[10px]">
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  ref={loginRef.email}
                  placeholder="medimind@gmail.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  ref={loginRef.password}
                  placeholder="*******"
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="rounded-lg" onClick={() => login()}>
                Login
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
