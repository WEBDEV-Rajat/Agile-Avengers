import React from 'react'
import img1 from "../Assets/img-1-dod.png"
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="relative top-14 w-full h-auto p-10 bg-gradient-to-r m-auto from-[#ADEDF0] from-50% to-[#82DF90] to-50%">
    <div className="flex flex-row w-full h-auto text-xl">
      <div className='ml-5 mr-15 w-1/2 float-left mt-2 max-[768px]:ml-0 '>
      <div className='flex flex-col gap-5'>
      <h1 className='text-4xl font-semibold tracking-wider text-[#0D5B19] max-[640px]:text-2xl max-[430px]:text-xl max-[375px]:text-base'>Empower Your</h1>
      <h1 className='text-4xl font-semibold tracking-wider text-[#26A038] max-[640px]:text-2xl max-[430px]:text-xl max-[375px]:text-base'>Finances</h1> 
      <h1 className='text-4xl font-semibold tracking-wider text-[#0D5B19] max-[640px]:text-2xl max-[430px]:text-xl max-[375px]:text-base'>For A Brighter</h1>
      <h1 className='text-4xl font-semibold tracking-wider text-[#26A038] max-[640px]:text-2xl max-[430px]:text-xl max-[375px]:text-base'>Future</h1>
      </div>
      <p className="ml-0 mb-0 mt-5 max-[640px]:text-sm">Effortlessly Manage Your Expenses</p>
      <p className="ml-0 mt-0 mb-10 max-[640px]:text-sm">Anytime, Anywhere</p>
      <Link to="/register" className="p-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 cursor-pointer font-semibold">Get Started</Link>
      </div>
      <div className='w-1/2 float-right translate-x-5 h-[350px] flex items-center justify-center'>
      <img src={img1} alt="" className='w-[350px] h-[350px] z-10 max-[768px]:w-[300px] max-[768px]:h-[300px] max-[640px]:w-[200px] max-[640px]:h-[300px] max-[470px]:w-[150px] max-[470px]:h-[250px] '/>
      </div>
    </div>
     
  </div>
  )
}

export default Hero
