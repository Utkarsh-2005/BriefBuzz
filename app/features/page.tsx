import React from 'react'
import { featureData } from '@/constants/feauresData'
import ShadCard from '../components/shadCard'
import Footer from '../components/Footer'

const page = () => {
  return (
    <div>
    <h1 className='font-semibold text-4xl ml-[25px] m-2 mt-[20px]'>Features</h1>
    <div className="flex">
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:p-5 p-6 max-w-[900px]'>
        {featureData.map((feature, index) => (
        <ShadCard key={index} title = {feature.title} description={feature.description} content={feature.content}/>
      ))}
    </div>
    </div>
    <Footer/>
    </div>
  )
}

export default page