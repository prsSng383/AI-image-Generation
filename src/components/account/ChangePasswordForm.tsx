"use client"
import React, { useId, useState } from 'react'
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import { changePassword } from '@/app/actions/auth-actions';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
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


const ChangePasswordForm = ({className}:{className?:string}) => {
  const [loading , setLoading] = useState(false);
  const toastId = useId();

      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password:"",
      confirmPassword:"",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Changing password...",{id:toastId})
    setLoading(true);

 
        const {success , error}  = await changePassword(values.password)
    if(!success){
      toast.error(String(error),{id:toastId})
      setLoading(false);
      redirect("/login") 
    }
    else{
      toast.success("Password is successfully updated!",{id:toastId})
      setLoading(false); 
      redirect("/login")
    }
    
    

  }
  
    return (
        <div className={cn("grid gap-6",className)}>
            <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
               Change Password
            </h1>
            <p className='text-sm text-muted-foreground'>
                Enter your new password below to change/update your password.
            </p>
        </div>
            
            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="Enter your password" {...field} />
                </FormControl>
                <FormDescription>
                    Enter a strong password that meets the requirement above.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="Enter your password" {...field} />
                </FormControl>
                <FormDescription>
                    Re-enter your new password to confirm.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className='w-full pt-4'>
          {loading && <Loader2 className='mr-2 w-4 h-4 animate-spin' />}
          {loading ? "Changing password...":"Change Password"}
            </Button>
            <div className='text-center text-sm text-muted-foreground'>
                Make sure to remember your new password or store it securely.
            </div>
        </form>
            </Form>
        </div>
    
  )
}

export default ChangePasswordForm