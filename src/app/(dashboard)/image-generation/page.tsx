import Configurations from '@/components/image-generation/Configurations'
import GeneratedImages from '@/components/image-generation/GeneratedImages'
import React from 'react'

const ImageGeneration = () => {
  return (
    <section className='container mx-auto felx-1 grid gap-4 grid-cols-3 overflow-hidden pl-12'>
      <Configurations/> 
      <div className='col-span-2 p-4 rounded-xl flex items-center justify-center border h-fit'>
        <GeneratedImages />
      </div>
    </section>
  )
}

export default ImageGeneration