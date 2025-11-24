// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';

// const Landing = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="items-center justify-center flex flex-col">
//          <img src="/imgs/logo.png" alt=""  width={90} height={30} />
//          <h1 className="text-[50px] font-extrabold">TAKE NOTE</h1>
//          <img src='/imgs/Notepad.png' alt="" height={600}  width={350}/>
//          <Button variant='default' onClick={() => navigate('/dashboard')} className="px-[30px] py-[20px] text-[20px] bg-black hover:bg-[#C77D00]  mt-[40px] font-bold">Get Started</Button>

//     </div>
//   )
// }

// export default Landing



import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="items-center justify-center flex flex-col min-h-screen py-8 sm:py-12 px-4">
         <img 
           src="/imgs/logo.png" 
           alt="" 
           className="w-16 h-auto sm:w-20 md:w-[90px]"
         />
         <h1 className="text-3xl sm:text-4xl md:text-[50px] font-extrabold mt-4 text-center">TAKE NOTE</h1>
         <img 
           src='/imgs/Notepad.png' 
           alt="" 
           className="w-64 h-auto sm:w-80 md:w-[350px] mt-6 sm:mt-8"
         />
         <Button 
           variant='default' 
           onClick={() => navigate('/dashboard')} 
           className="px-6 py-4 sm:px-8 sm:py-5 md:px-[30px] md:py-[20px] text-base sm:text-lg md:text-[20px] bg-black hover:bg-[#C77D00] mt-8 sm:mt-10 md:mt-[40px] font-bold w-full max-w-xs sm:w-auto"
         >
           Get Started
         </Button>
    </div>
  )
}

export default Landing
