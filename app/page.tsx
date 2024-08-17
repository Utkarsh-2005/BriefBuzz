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


// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
// if (!apiKey) {
//   throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not defined in the environment variables.');
// }

// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };
type Response = {
  _id: string;
  twoHundred: string;
  threeFifty: string;
  fiveHundred: string;
  oneThousand: string;
  createdAt: string;
};


const Home  = () => {
  const { data: session } = useSession(); 
  const [text, setText] = useState("Please select");
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<Response | null>(null);
  const [clicked, setClicked] = useState(0);


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
    if (clicked != 200){
      setClicked(200)
    }
    // Optionally reset after some time or based on other logic
    // setTimeout(() => setClicked(false), 100);
    if (response?.twoHundred){
      setText(response.twoHundred.replace(/ \* /g, ' '));
    }
  }

  
  const threeFiftyHandler = () => {
    if (clicked != 300){
      setClicked(300)
    }
    if (response?.threeFifty){
      setText(response.threeFifty.replace(/ \* /g, ' '))
    }
  }

  
  const fiveHundredHandler = () => {
    if (clicked != 500){
      setClicked(500)
    }
    if (response?.fiveHundred){
      setText(response.fiveHundred.replace(/ \* /g, ' '))
    }
  }

  
  const oneThousandHandler = () => {
    if (clicked != 1000){
      setClicked(1000)
    }
    if (response?.oneThousand){
      setText(response.oneThousand.replace(/ \* /g, ' '))
    }
  }


  // async function run(prompt:string) {
  //   const chatSession = model.startChat({
  //     generationConfig,
  //  // safetySettings: Adjust safety settings
  //  // See https://ai.google.dev/gemini-api/docs/safety-settings
  //     history: [
  //     ],
  //   });
  
  //   const result = await chatSession.sendMessage(prompt);
  //   console.log(result.response.text());
  //   setResponse(result.response.text())
  // }
  
  // const testHandler = async () => {
  //   const newPrompt = prompt+". Summarize all this news in 500 words.";
  //   setPrompt(newPrompt);
  //   // run(newPrompt);
  // }
//   useEffect(() => {
//     axios.get(`https://newsapi.org/v2/everything?q=tesla&from=2024-06-20&sortBy=publishedAt&apiKey=2d6a75aacad645469ef07fbdf13cb522
// `)
//     .then(response => {
//       console.log(response.data)
//       setPrompt(JSON.stringify(response.data))
//     })
//     .catch(error => {
//       console.log(error)
//     })
//   }, [prompt]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch('http://localhost:3000/api/cron');
  //       if (!res.ok) {
  //         throw new Error('Failed to fetch data');
  //       }
  //       const data = await res.json();
  //       setData(JSON.stringify(data).replace(/^"|"$/g, '') );
  //       setLoading(false)
  //     } catch (error: any) {
  //       console.log(error.message);}
  //   };

  //   fetchData();
  // }, []);
  
  return (
    <div className='min-h-screen bg-gray-100"'>
    <div className="shadow-lg fixed w-full z-10 top-0 flex justify-between items-between">
     <h1>Welcome to My App</h1>
     {session ? (
       <div>
         <p>Signed in as {session.user?.email}</p>
         <button onClick={() => signOut()}>Sign out</button>
       </div>
     ) : (
       <>
       {/* <button onClick={() => signIn('google')}>Sign in with Baby</button> */}
       <div className="flex items-center justify-center">
   <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 bg-slate-600" onClick={() => signIn('google')}>
       <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
       <span>Login with Google</span>
   </button>
</div>
       </>
     )}
     </div>
     <main className="pt-20">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="flex">
      <button className='text-white m-2 bg-slate-500 p-1 px-[20px] rounded hover:bg-slate-600 duration-75 shadow-lg' onClick={twoHundredHandler}>200 Words</button>
      <button className='text-white m-2 bg-slate-500 p-1 px-[20px] rounded hover:bg-slate-600 duration-75 shadow-lg' onClick={threeFiftyHandler}>350 Words</button>
      <button className='text-white m-2 bg-slate-500 p-1 px-[20px] rounded hover:bg-slate-600 duration-75 shadow-lg' onClick={fiveHundredHandler}>500 Words</button>
      <button className='text-white m-2 bg-slate-500 p-1 px-[20px] rounded hover:bg-slate-600 duration-75 shadow-lg' onClick={oneThousandHandler}>1000 Words</button>
     </div>
     {/* <p>{response}</p> */}
     {loading ? (
            <p>Loading...</p>
          ) : (
            response && (
              <>
        
                  {/* <p dangerouslySetInnerHTML={{ __html: marked(text) }}></p> */}
                <TypingEffect text={text} isClicked={clicked} />
              </>
            )
          )}
     </div>
     </main>
   </div>
 
  
  )
}


export default Home;