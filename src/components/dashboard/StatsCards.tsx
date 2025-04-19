import React from 'react'
import { Database } from '../../../database.types'

interface StatsCardsProps{
    imageCount : number,
    credits : Database['public']['Tables']['credits']['Row'] | null
}

const StatsCards = ({imageCount , credits}:StatsCardsProps) => {
  return (
    <div className=''>StatsCards</div>
  )
}

export default StatsCards