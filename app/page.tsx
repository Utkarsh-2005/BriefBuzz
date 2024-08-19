"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { VertexAI } from '@google-cloud/vertexai';
import { GetServerSideProps } from 'next';
import { marked } from 'marked';
import TypingEffect from './components/TypingEffect';
// import "./typingeffect.css"
import SignInAlert from './components/SignInAlert';
import Loader from './components/Loader';
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';


type Response = {
  _id: string;
  twoHundred: string;
  threeFifty: string;
  fiveHundred: string;
  oneThousand: string;
  createdAt: string;
};


const Home  = () => {
  const { data: session, status } = useSession(); 
  const [text, setText] = useState("");
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<Response | null>(null);
  const [clicked, setClicked] = useState(0);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const isAuthenticated = status === 'authenticated';
  const [screenLoading, setScreenLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [textLoading, setTextLoading] = useState<boolean>(false);


  const styles: React.CSSProperties & { [key: string]: string | number } = {
    "--n": 50,
  };
  
  useEffect(() => {
    // Set a timer to start fading out the loader after 2.5 seconds
    const timer1 = setTimeout(() => {
      setLoading(false);
    }, 2500);

    // Set another timer to fade in the main content after the loader fades out
    const timer2 = setTimeout(() => {
      setContentVisible(true);
    }, 3500); // 1 second delay after loader fades out

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);


  useEffect(() => {
    async function fetchArticles() {
      const date = new Date().toISOString().split('T')[0]; // Format the current date as YYYY-MM-DD
      console.log(date)
      try {
        const response = await fetch(`/api/req?date=${date}`);
                // const res = await fetch('http://localhost:3000/api/cron');

        // const response2 = await fetch(`/api/cron`);
        const data: Response[] = await response.json();
        if (data.length > 0) {
          setResponse(data[0]); // Access the first item in the list
        }

      
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  const twoHundredHandler = () => {
    if (isAuthenticated === false){
      setIsEditOpen(true);
    }else{
    if (clicked != 200){
      setClicked(200)
      setTextLoading(true); // Start loading
      setTimeout(() => {
        setTextLoading(false); // Stop loading after 2 seconds
      }, 1500);

    }
    // Optionally reset after some time or based on other logic
    // setTimeout(() => setClicked(false), 100);
    if (response?.twoHundred){
      setText(response.twoHundred.replace(/ \* /g, ' '));
    }}
  }

  
  const threeFiftyHandler = () => {
    if (isAuthenticated === false){
      setIsEditOpen(true);
    }else{
    if (clicked != 350){
      setClicked(350);
      setTextLoading(true); // Start loading
      setTimeout(() => {
        setTextLoading(false); // Stop loading after 2 seconds
      }, 1500);
    }
    if (response?.threeFifty){
      setText(response.threeFifty.replace(/ \* /g, ' '))
    }}
  }

  
  const fiveHundredHandler = () => {
    if (isAuthenticated === false){
      setIsEditOpen(true);
    }else{
    if (clicked != 500){
      setClicked(500);
      setTextLoading(true); // Start loading
      setTimeout(() => {
        setTextLoading(false); // Stop loading after 2 seconds
      }, 1500);
    }
    if (response?.fiveHundred){
      setText(response.fiveHundred.replace(/ \* /g, ' '))
    }}
  }

  
  const oneThousandHandler = () => {
    if (isAuthenticated === false){
      setIsEditOpen(true);
    }else{
    if (clicked != 1000){
      setClicked(1000);
      setTextLoading(true); // Start loading
      setTimeout(() => {
        setTextLoading(false); // Stop loading after 2 seconds
      }, 1500);
    }
    if (response?.oneThousand){
      setText(response.oneThousand.replace(/ \* /g, ' '))
    }}
  }


  
  return (
    <>
    {screenLoading && <Loader />}

    <div className= 'min-h-screen main-content bg-slate-50 hover:select-none'>
    <div className="shadow-lg fixed w-full z-10 top-0 flex justify-between items-center text-white" style={{ backgroundColor: '#131313' }}>
     {/* <h1 className='mx-[10px]'>Brief Buzz</h1> */}
     <Image src='/logo.png' alt='logo' width={90} height={90} className='ml-[10px]'/>
     {session ? (
       <div>
         <p className='sm:block hidden mr-2'>Signed in as {session.user?.email}</p>
         <button onClick={() => signOut()} className='mr-5'>Sign out</button>
       </div>
     ) : (
       <>
       {/* <button onClick={() => signIn('google')}>Sign in with Baby</button> */}
       <div className="flex items-center justify-center">
       <button className="px-4 py-2 border flex gap-2 border-black dark:border-slate-700 rounded-lg text-slate-100  hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-400 hover:shadow transition duration-150 bg-slate-600 mr-2" onClick={() => signIn('google')}>
          <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
          <span>Login with Google</span>
      </button>
</div>
       </>
     )}
     </div>
     <main className="pt-20 mt-[60px]">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
     <SignInAlert  isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}/>
     <div className='w-screen flex sm:flex-row flex-col justify-center items-center sm:mb-0 mb-[20px]'>
      <button className={`text-white m-2  p-1 px-[20px] rounded hover:bg-yellow-500 transition-colors duration-75 shadow- max-w-[250px] ${clicked === 200? "bg-yellow-500":"bg-yellow-400"}`} onClick={twoHundredHandler}>200 Words</button>
      <button className={`text-white m-2 p-1 px-[20px] rounded hover:bg-yellow-500 transition-colors duration-75 shadow- max-w-[250px] ${clicked === 350? "bg-yellow-500":"bg-yellow-400"}`} onClick={threeFiftyHandler}>350 Words</button>
      <button className={`text-white m-2 p-1 px-[20px] rounded hover:bg-yellow-500 transition-colors duration-75 shadow- max-w-[250px] ${clicked === 500? "bg-yellow-500":"bg-yellow-400"}`} onClick={fiveHundredHandler}>500 Words</button>
      <button className={`text-white m-2 p-1 px-[20px] rounded hover:bg-yellow-500 transition-colors duration-75 shadow- max-w-[250px] ${clicked === 1000? "bg-yellow-500":"bg-yellow-400"}`} onClick={oneThousandHandler}>1000 Words</button>
     </div>
     {/* <p>{response}</p> */}
     {loading ? (
            <p>Loading...</p>
          ) : (
            response && (
              <div className='pt-[10px]'>
        
                  {/* <p dangerouslySetInnerHTML={{ __html: marked(text) }}></p> */}
                <div className='py-5 rounded-lg w-[80vw] shadow-black shadow-2xl px-5 flex text-white hover:select-text' style={{ backgroundColor: '#131313' }}>
                {
                  text === "" ? (
                    <div className='flex'>
                      <p>Summarize using Gemini</p>
                      <Image 
                        src='https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg' 
                        width={20} 
                        height={20} 
                        alt='gemini' 
                        className='ml-[3px]' 
                      />
                    </div>
                  ) : (
                    !textLoading ? (
                      <TypingEffect text={text} isClicked={clicked} />
                    ) : (
                      <div className='flex flex-col w-full'>
                           <Skeleton className='w-full'   sx={{ bgcolor: 'grey.600' }}/>
                            <Skeleton className='w-full' sx={{ bgcolor: 'grey.600' }}/>
                            <Skeleton className='w-full' sx={{ bgcolor: 'grey.600' }}/>
                      </div>
                    )
                  )
                }
                </div>

              </div>
            )
          )}
     </div>
     </main>
   </div>
 
  </>
  )
}


export default Home;