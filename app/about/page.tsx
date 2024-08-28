import React from 'react'
import Footer from '../components/Footer'

const page = () => {
  return (
    <>
    <div className='min-h-screen'>
      <h1 className='font-semibold text-4xl sm:ml-[40px] m-2 mt-[20px] ml-[30px]'>About</h1>
      <p className='sm:ml-[20px] max-w-[900px] sm:mt-[20px] mt-[10px] sm:p-5 p-6 sm:m-0 m-2 sm:text-lg'>
        Briefbuzz is your go-to platform for staying informed with just the right amount of detail. We understand that everyone&#39;s time is valuable, which is why we offer news summaries in varying lengths—200, 350, 500, and 1000 words—powered by Google&#39;s cutting-edge Gemini AI. Whether you&#39;re looking for a quick overview or an in-depth analysis, Briefbuzz has you covered.
        Our mission is to provide accurate, concise, and easily digestible news content, so you can stay informed without the overwhelm. With a clean, user-friendly interface and the ability to customize your news reading experience, Briefbuzz ensures that staying updated is both easy and enjoyable.

        Join us in revolutionizing the way you consume news—efficiently, intelligently, and on your terms.
    </p> 
    </div>
    <Footer/>
    </>
  )
}

export default page