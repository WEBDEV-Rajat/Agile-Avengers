import React from 'react'
import "./Hero.css"
import img1 from "../Assets/img-1-dod.png"

const Hero = () => {
  return (
    <div class="hero">
    <div class="heading">
      <h1>Empower Your</h1>
      <h1>Finances</h1>
      <h1>For A Brighter</h1>
      <h1>Future</h1>
      <p class="one">Effortlessly Manage Your Expenses</p>
      <p class="two">Anytime, Anywhere</p>
    </div>
     <button class="get-started">Get Started</button>
    <img src={img1} alt="" />
  </div>
  )
}

export default Hero
