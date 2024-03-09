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
import { useEffect, useRef } from "react";

export default function Authpage() {
  const signupRef = {
    name: useRef<any>(),
    email: useRef<any>(),
    password: useRef<any>(),
  };
  const loginRef = { email: useRef<any>(), password: useRef<any>() };
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
            </CardContent>
            <CardFooter>
              <Button>Signup</Button>
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
              <Button className=" rounded-lg">Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
