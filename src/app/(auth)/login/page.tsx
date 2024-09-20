"use client";
import React, { useState } from "react";
import Logo from "../../../../public/assets/goodreads_logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form, Input, message } from "antd";
import { ILogin } from "@/interface/login.interface";
import { useLoginMutation } from "@/redux/features/apis/auth-api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  const handleSubmit = async (values: ILogin) => {
    try {
      const response: any = await login({ ...values });

      if (response && response?.error) {
        const errorMessage =
          typeof response?.error === "string" && response?.error;
        message.error(errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error.message || "An unexpected error occurred.";
      message.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center flex-col bg-white h-screen">
      <Link href={"/"} className="my-5">
        <Image width={200} height={100} src={Logo} alt="brand-nav" />
      </Link>
      <p className="text-4xl">Sign In</p>

      <Form
        className="mt-8 flex flex-col w-[400px]"
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              message: "The input is not valid Email!",
            },
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item className="w-[300px] md:w-[400px]">
          <Button
            htmlType="submit"
            className="md:w-[400px] w-[300px] rounded-full bg-black text-white"
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>

      <p className="w-[400px] mt-8">
        By signing in, you agree to the Goodreads{" "}
        <span>
          <a href="">
            <u>Terms of Service and Privacy Policy</u>
          </a>
        </span>
      </p>
    </div>
  );
};

export default Login;
