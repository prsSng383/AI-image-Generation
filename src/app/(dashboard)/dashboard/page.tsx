import { getCredits } from "@/app/actions/credit-actions";
import { getImages } from "@/app/actions/image-actions";
import StatsCards from "@/components/dashboard/StatsCards";
import { createClient } from "@/lib/supabase/server"

export default async function Page() {

  const supabase = await createClient();
  const {data:{user}} = await supabase.auth.getUser();

  const {data:credits} = await getCredits();
  const {data:image} = await getImages();

  const imageCount = image?.length || 0;

  return (
     <section className="container mx-auto flex-1 space-y-6" >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
           Welcome back , {user?.user_metadata.full_name}
        </h2>
      </div>
          
          <StatsCards imageCount = {imageCount} credits = {credits} />



     </section>
    
  )
}
