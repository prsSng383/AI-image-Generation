"use client"
import React, { useEffect } from 'react'
import { z } from "zod";
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Link from 'next/link';
import { Slider } from "@/components/ui/slider"
import { Textarea } from '../ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from 'lucide-react';
import useGeneratedStore from '@/store/useGeneratedStore';

/* 
### This Data is from Replicate and we are using the flux-dev model by black-forest-labs.

const input = {
  prompt: "black forest gateau cake spelling out the words \"FLUX DEV\", tasty, food photography, dynamic shot",
  go_fast: true,
  guidance: 3.5,
  megapixels: "1",
  num_outputs: 1,
  aspect_ratio: "1:1",
  output_format: "webp",
  output_quality: 80,
  prompt_strength: 0.8,
  num_inference_steps: 28
};

const output = await replicate.run("black-forest-labs/flux-dev", { input });
console.log(output);
*/



export const ImageGenerationFormSchema = z.object({
    model: z.string({
        required_error:"Model is required!"
    }),
    prompt:z.string({
        required_error:"Prompt is required!"
    }),
    guidance:z.number({
        required_error:"Guidance scale is required!"
    }),
    num_outputs:z.number().min(1,{message:"Number of outputs should be atleast 1."}).max(4,{message:"Number of outputs must be less then 4."}),
    aspect_ratio:z.string({
        required_error:"Aspect-ratio is required!"
    }),
    output_format:z.string({
        required_error:"Output format is required!"
    }),
    output_quality:z.number().min(1,{message:"Output quality should be atleast 1."}).max(100,{message:"Output quality must be less then or equal to 100."}),
    num_inference_steps:z.number().min(1,{message:"Number should be atleast 1."}).max(50,{message:"Number must be less then or equal to 50."})
  })
  


const Configurations = () => {
    
   const generateImage = useGeneratedStore((state)=>state.generateImage)
  
    // 1. Define your form.
   const form = useForm<z.infer<typeof ImageGenerationFormSchema>>({
    resolver: zodResolver(ImageGenerationFormSchema),
    defaultValues: {
        model: "black-forest-labs/flux-dev",
        prompt: "",
        guidance: 3.5,
        num_outputs: 1,
        output_format: "jpg",
        aspect_ratio:"1:1",
        output_quality: 80,
        num_inference_steps:28,
    },
  })
    
  useEffect(()=>{
    const subscription = form.watch((value , {name})=>{
      if(name === "model"){
        let newSteps;
        if(value.model === "black-forest-labs/flux-schnell"){
          newSteps = 4;
        }else{
          newSteps=28;
        }
        if(newSteps !== undefined){
          form.setValue('num_inference_steps', newSteps)
        }

      }
    })
  
    return () => subscription.unsubscribe() 

  },[form])

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ImageGenerationFormSchema>) {
    // Do something with the form values.
    // This will be type-safe and validated.
    await generateImage(values)
  }

  return (
    <TooltipProvider>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <fieldset className='grid gap-6 p-4 bg-background rounded-lg border'>
            <legend className='text-sm -ml-1 px-1 font-medium'>Settings</legend>

            <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex'>
                Model
                <Tooltip>
                  <Info className=' w-3 h-3 ml-1' />
                   <TooltipContent>
                   <p>You can select multiple models.</p>
                  </TooltipContent>
                 </Tooltip>
                </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="black-forest-labs/flux-dev">Flux Dev</SelectItem>
                  <SelectItem value="black-forest-labs/flux-schnell">Flux Schnell</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
         
         <div className='grid grid-cols-2 gap-4'>
         <FormField
          control={form.control}
          name="aspect_ratio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex'>
                Aspect Ratio
                <Tooltip>
                  <Info className='w-3 h-3 ml-1' />
                   <TooltipContent>
                   <p>You can select aspect_ratio.</p>
                  </TooltipContent>
                 </Tooltip>
                </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a aspect_ratio" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1:1">1:1</SelectItem>
                  <SelectItem value="16:9">16:9</SelectItem>
                  <SelectItem value="9:16">9:16</SelectItem>
                  <SelectItem value="21:9">21:9</SelectItem>
                  <SelectItem value="9:21">9:21</SelectItem>
                  <SelectItem value="4:5">4:5</SelectItem>
                  <SelectItem value="5:4">5:4</SelectItem>
                  <SelectItem value="3:4">3:4</SelectItem>
                  <SelectItem value="4:3">4:3</SelectItem>
                  <SelectItem value="3:2">3:2</SelectItem>
                  <SelectItem value="2:3">2:3</SelectItem>
                  
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
           
           <FormField
          control={form.control}
          name="num_outputs"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex'>
                Num of Outputs
                <Tooltip>
                 <Info className='w-3 h-3 ml-1' />
                   <TooltipContent>
                   <p>You can select number of outputs.</p>
                  </TooltipContent>
                 </Tooltip>
                </FormLabel>
              <FormControl>
                <Input type="number" min={1} max={4} {...field} onChange={(event)=>field.onChange(+event.target.value)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

         </div>
         <FormField
          control={form.control}
          name="guidance"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center justify-between'> 
               <div className='flex'>
                Guidance
                
                <Tooltip>
                  <Info className='w-3 h-3 ml-1' />
                   <TooltipContent>
                   <p>You can select guidance.</p>
                  </TooltipContent>
                 </Tooltip>
             </div>
                 <span>
                    {field.value}
                </span>
              </FormLabel>
              <FormControl>
              <Slider  defaultValue={[field.value]} min={0} max={10} step={0.5} onValueChange={(value)=>field.onChange(value[0])} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="num_inference_steps"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex justify-between '>
                <div className='flex'>
                Number of inference steps
                <Tooltip>
                  <Info className='w-3 h-3 ml-1' />
                   <TooltipContent>
                   <p>You can select number of inference steps.</p>
                  </TooltipContent>
                 </Tooltip>
                     </div>
                 <span>
                    {field.value}
                 </span>

              </FormLabel>
              <FormControl>
              <Slider  defaultValue={[field.value]} min={1} max={form.getValues("model")==="black-forest-labs/flux-schnell"? 4 : 50} step={1} onValueChange={(value)=>field.onChange(value[0])} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="output_quality"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center justify-between'>
                <div className='flex'>
                Output Quality
                <Tooltip>
                  <Info className='w-3 h-3 ml-1' />
                   <TooltipContent>
                   <p>You can select output quality.</p>
                  </TooltipContent>
                 </Tooltip>
                </div>
                <span>
                    {field.value}
                </span>
              </FormLabel>
              <FormControl>
              <Slider  defaultValue={[field.value]} min={50} max={100} step={1} onValueChange={(value)=>field.onChange(value[0])} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="output_format"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex'>Output Format
              <Tooltip>
                  <Info className='w-3 h-3 ml-1' />
                   <TooltipContent>
                   <p>You can select multiple output formats.</p>
                  </TooltipContent>
                 </Tooltip>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a output format" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="jpg">JPG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="webp">WebP</SelectItem>                  
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex'>Prompt
              <Tooltip>
                  <Info className='w-3 h-3 ml-1' />
                   <TooltipContent>
                   <p>You can write your prompt here.</p>
                  </TooltipContent>
                 </Tooltip>
              </FormLabel>
              <FormControl>
                <Textarea {...field} rows={6} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='font-medium' >Generate</Button>
        </fieldset>

        
      </form>
    </Form>
    </TooltipProvider>
    
  )
}

export default Configurations