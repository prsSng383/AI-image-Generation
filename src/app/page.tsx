import Pricing from "@/components/landing-page/Pricing";
import { createClient } from "@/lib/supabase/server";
import { getProducts, getUser } from "@/lib/supabase/queries";
import { redirect } from "next/navigation";
import Navigation from "@/components/landing-page/Navigation";
import HeroSection from "@/components/landing-page/HeroSection";


export default async function Home() {
  
  const supabase = await createClient();

  const[user , products] = await Promise.all([
    getUser(supabase),
    getProducts(supabase)
  ])  

    if(user){
        return  redirect("/dashboard")
    }
   
  return (
    
     
    <main className="flex flex-col min-h-screen items-center justify-center" >
      <Navigation />
      <HeroSection />
      <Pricing products={products ?? []}  />
    </main>
    
    
    
  );
}
