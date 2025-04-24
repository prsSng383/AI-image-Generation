import { getCredits } from "@/app/actions/credit-actions";
import { getImages } from "@/app/actions/image-actions";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentImages from "@/components/dashboard/RecentImages";
import StatsCards from "@/components/dashboard/StatsCards";
import { createClient } from "@/lib/supabase/server"

export default async function Page() {

  const supabase = await createClient();
  const {data:{user}} = await supabase.auth.getUser();

  const {data:credits} = await getCredits();
  const {data:images} = await getImages();

  const imageCount = images?.length || 0;

  return (
     <section className="container mx-auto flex-1 space-y-6" >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
           Welcome back , {user?.user_metadata.full_name}
        </h2>
      </div>
           
          <StatsCards imageCount = {imageCount} credits = {credits} />
          <div className="grid gap-6 grid-cols-4">
          <RecentImages images={(images?.slice(0, 6).map((img) => ({...img, url: img.url ?? null})) ?? [])}/>

            <QuickActions/>

            {/* quick actions */}
          </div>


     </section>
    
  )
}
