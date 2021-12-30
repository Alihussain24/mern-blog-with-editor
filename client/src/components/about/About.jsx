import React from 'react';
import './about.css';
import Aword from '../../img/award.png';
import AboutImg from '../../img/aboutimg.jpg'
const About = () => {
  return (
    <div className='about'>
      <div className='about-left'>
        <div className='aboutCard bg'> </div>
        <div className='aboutCard'>
          <img
            src={AboutImg}
            alt=''
            className='aboutimg'
          />
        </div>
      </div>

      <div className='about-right'>
        <h2 className='about_me'>About me</h2>

        <p className='pra'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora amet
          tempore, aliquid officiis accusamus exercitationem natus et
          recusandae? Exercitationem maxime quisquam debitis repudiandae dolorum
          delectus nemo assumenda pariatur voluptates velit?
        </p>

        <p className='pra'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum,
          sed, fugit aperiam necessitatibus ad ducimus voluptate blanditiis
          suscipit velit, quod labore voluptatum atque nobis! Nihil rem eius
          odit sit eum.
        </p>

        <div className='about_award'>
          <img src={Aword} alt='' className='about_aword_img' />
          <div className='about_award_text'>
            <h4 className='about_award_title'>International Designer</h4>
            <p className='about_aword_text'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
