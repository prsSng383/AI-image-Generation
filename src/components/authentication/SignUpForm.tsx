"use client"
import React, { useId, useState } from 'react'
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { toast } from "sonner";
import { signup } from '@/app/actions/auth-actions';
import { redirect } from 'next/navigation';



const formSchema = z.object({
    full_name: z.string().min(3,{
        message:"Your name must be atleast 3 characters long."
    }),
    email: z.string().email({
        message:"Please enter a valid emai address!"
    }),
    password: z.string({required_error:"Password is required!"}).min(8,{
        message:"Password must be atleast 8 characters long!."
    }),
    confirmPassword:z.string({
        required_error:"Confirm Password is required!"
    })
  }).refine(data => data.password === data.confirmPassword , {
    message:"Password don't match",
    path:["confirmPassword"]
  })

const SignUpForm = ({className}:{className?:string}) => {
  const[loading  , setLoading] = useState(false);
  const toastId = useId();
     // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:"",
      full_name:"",
      confirmPassword:""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Signing up...",{id:toastId})
    setLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    const formData = new FormData();
    formData.append("full_name",values.full_name)
    formData.append("email",values.email)
    formData.append("password",values.password)

    const {success , error}  = await signup(formData)
    if(!success){
      toast.error(String(error),{id:toastId})
      setLoading(false); 
    }
    else{
      toast.success("Signed up successfully! Please confirm your email address.",{id:toastId})
      setLoading(false); 
      redirect("/login")
    }
    

  }
  
    return (
        <div className={cn("grid gap-6",className)}>
            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="Confirm your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className='w-full' disabled={loading}>
            {loading && <Loader2 className='mr-2 w-4 h-4 animate-spin' />}
            Sign Up</Button>
        </form>
      </Form>
        </div>
    
  )
}

export default SignUpForm