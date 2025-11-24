



import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="items-center justify-center flex flex-col h-screen py-4 sm:py-6 lg:py-8 px-4 overflow-hidden">
         <img 
           src="/imgs/logo.png" 
           alt="" 
           className="w-12 h-auto sm:w-16 lg:w-20 flex-shrink-0"
         />
         <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold mt-2 sm:mt-3 lg:mt-4 text-center flex-shrink-0">TAKE NOTE</h1>
         <img 
           src='/imgs/Notepad.png' 
           alt="" 
           className="w-48 h-auto sm:w-56 lg:w-64 xl:w-72 mt-3 sm:mt-4 lg:mt-6 flex-shrink-0 max-h-[40vh] sm:max-h-[45vh] lg:max-h-[50vh] object-contain"
         />
         <Button 
           variant='default' 
           onClick={() => navigate('/dashboard')} 
           className="px-6 py-4 sm:px-7 sm:py-5 lg:px-8 lg:py-5 xl:px-10 xl:py-6 text-sm sm:text-base lg:text-lg xl:text-xl bg-black hover:bg-[#C77D00] mt-4 sm:mt-5 lg:mt-6 xl:mt-8 font-bold w-full max-w-xs sm:w-auto flex-shrink-0"
         >
           Get Started
         </Button>
    </div>
  )
}

export default Landing
