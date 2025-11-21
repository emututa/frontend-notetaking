import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="items-center justify-center flex flex-col">
         <img src="/imgs/logo.png" alt=""  width={90} height={30} />
         <h1 className="text-[50px] font-extrabold">TAKE NOTE</h1>
         <img src='/imgs/Notepad.png' alt="" height={600}  width={350}/>
         <Button variant='default' onClick={() => navigate('/dashboard')} className="px-[25px] py-[20px] text-[20px] bg-black hover:bg-[#C77D00]  mt-[10px] font-bold">Get Started</Button>

    </div>
  )
}

export default Landing
