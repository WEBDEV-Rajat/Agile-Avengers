import React from 'react';
import img1 from "../Assets/feature-img-1-dod.png";
import img2 from "../Assets/feature-img-2-dod.png";
import img3 from "../Assets/feature-img-3-dod.webp";
import img4 from "../Assets/feature-img-4-dod.png";
import img5 from "../Assets/feature-img-5-dod.webp";
import img6 from "../Assets/feature-img-6-dod.webp";

const Features = () => {
  return (
    <div className="mt-20">
      <h1 className='text-center text-3xl font-semibold text-[#0D5B19]'>Features</h1>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 m-10'>
        <div>
          <div className='flex bg-slate-100 p-2 border border-slate-400 rounded-3xl shadow-lg'>
          <img src={img1} alt="" className='float-left border border-slate-400 z-10 w-[100px] h-[100px] mr-5 rounded-lg' />
           <p className='font-bold float-right mt-0'>
            Record daily transactions seamlessly across multiple, customizable
            categories, allowing for detailed tracking and organization tailored
            to your unique financial needs.
           </p>
          </div>
        </div>
        <div>
          <div className='flex bg-slate-100 p-2 rounded-3xl border border-slate-400 shadow-lg'>
          <img src={img2} alt="" className='float-left border border-slate-400 z-10 w-[100px] h-[100px] mr-5 rounded-lg' />
          <p className='font-bold float-right mt-0'>
            Generate clear, easy-to-read expense reports with powerful
            visualizations that provide a comprehensive view of your spending
            patterns.
          </p>
          </div>
        </div>
        <div>
        <div className='flex bg-slate-100 p-2 rounded-3xl border border-slate-400 shadow-lg'>
          <img src={img3} alt="" className='float-left border border-slate-400 z-10 w-[100px] h-[100px] mr-5 rounded-lg'/>
          <p className='font-bold float-right mt-0'>
            Receive timely notifications for upcoming recurring bills and
            transactions, ensuring you're always informed before due dates.
          </p>
          </div>
        </div>
        <div>
        <div className='flex bg-slate-100 p-2 rounded-3xl border border-slate-400 shadow-lg'>
          <img src={img4} alt="" className='float-left border border-slate-400 z-10 w-[100px] h-[100px] mr-5 rounded-lg'/>
          <p className='font-bold float-right mt-0'>
            Monitor your savings progress to achieve your financial goals with
            confidence.
          </p>
          </div>
        </div>
        <div>
        <div className='flex bg-slate-100 p-2 rounded-3xl border border-slate-400 shadow-lg'>
            <img src={img5} alt="" className='float-left border border-slate-400 z-10 w-[100px] h-[100px] mr-5 rounded-lg'/>
            <p className='font-bold float-right mt-0'>
            Enable detailed expense reports for seamless sharing and analysis by
            exporting data in multiple formats
            </p>
          </div>
        </div>
        <div>
        <div className='flex bg-slate-100 p-2 rounded-3xl border border-slate-400 shadow-lg'>
          <img src={img6} alt="" className='float-left border border-slate-400 z-10 w-[100px] h-[100px] mr-5 rounded-lg'/>
          <p className='font-bold float-right mt-0'>
            Integrates comparative analysis tools in your expense tracker app
            which allows users to evaluate their current expenses against
            previous months or years
          </p>
          </div>
        </div>
    </div>
    </div>
  )
}

export default Features;
