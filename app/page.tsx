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
import "./typingeffect.css"
import SignInAlert from './components/SignInAlert';


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


  const styles: React.CSSProperties & { [key: string]: string | number } = {
    "--n": 50,
  };
  


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
    if (clicked != 300){
      setClicked(300)
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
      setClicked(500)
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
      setClicked(1000)
    }
    if (response?.oneThousand){
      setText(response.oneThousand.replace(/ \* /g, ' '))
    }}
  }


  
  return (
    <div className='min-h-screen bg-gray-100"'>
    <div className="shadow-lg fixed w-full z-10 top-0 flex justify-between items-center bg-white">
     <h1 className='mx-[10px]'>Brief Buzz</h1>
     {session ? (
       <div>
         <p>Signed in as {session.user?.email}</p>
         <button onClick={() => signOut()}>Sign out</button>
       </div>
     ) : (
       <>
       {/* <button onClick={() => signIn('google')}>Sign in with Baby</button> */}
       <div className="flex items-center justify-center">
       <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-100  hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-400 hover:shadow transition duration-150 bg-slate-600" onClick={() => signIn('google')}>
          <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
          <span>Login with Google</span>
      </button>
</div>
       </>
     )}
     </div>
     <main className="pt-20">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
     <SignInAlert  isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}/>
     <div className='w-screen flex sm:flex-row flex-col justify-center items-center'>
      <button className='text-white m-2 bg-slate-500 p-1 px-[20px] rounded hover:bg-slate-600 duration-75 shadow- max-w-[250px]' onClick={twoHundredHandler}>200 Words</button>
      <button className='text-white m-2 bg-slate-500 p-1 px-[20px] rounded hover:bg-slate-600 duration-75 shadow-lg max-w-[250px]' onClick={threeFiftyHandler}>350 Words</button>
      <button className='text-white m-2 bg-slate-500 p-1 px-[20px] rounded hover:bg-slate-600 duration-75 shadow-lg max-w-[250px]' onClick={fiveHundredHandler}>500 Words</button>
      <button className='text-white m-2 bg-slate-500 p-1 px-[20px] rounded hover:bg-slate-600 duration-75 shadow- max-w-[250px]' onClick={oneThousandHandler}>1000 Words</button>
     </div>
     {/* <p>{response}</p> */}
     {loading ? (
            <p>Loading...</p>
          ) : (
            response && (
              <div className='pt-[10px]'>
        
                  {/* <p dangerouslySetInnerHTML={{ __html: marked(text) }}></p> */}
                <TypingEffect text={text} isClicked={clicked}/>
              </div>
            )
          )}
     </div>
     </main>
   </div>
 
  
  )
}


export default Home;