import React from 'react';
import './HomePage.css';
import Carousel from './Carousel'; 
import { Link } from 'react-router-dom';
import b3 from './b3.png';
import b4 from './b4.png';
import b1 from './b1.png';
import b2 from './b2.png';


function Home_page() {
  const images = [b3,b4];
    
  
   
  return (
    <div>
      
      <Carousel images={images}/>

      <div className="textOverlay">
      <h1 className="welcoming">SAVE LIVES</h1>
            <p className="titles">Donate Blood</p>
           
            
            <div>
           
                <Link to="/AddDonor">
                    <button className="button-welcome1">Add Donor</button>
                </Link>
            </div>


      </div>
 
      <section className="section">
        <div className="imagetextcontainer">
        <p className="title2">The Power of Giving: Saving Lives Through Blood Donation</p>
           <p className="p1">Blood donation is a simple yet impactful way to
            contribute to the well-being of others. By donating a portion of 
            your blood, you can help patients in need of transfusions due to traumatic injuries, 
            surgeries, cancer treatments, and various medical conditions. 
            Every day, countless lives are touched by the generosity of blood donors, 
            and we invite you to join us in this noble cause.</p>
             </div>
             <img src={b1} className='i1'/>
      </section>

      <section className="section">
        <div className="imagetextcontainer1">
        <p className="title3">Making a Difference Together: Join Our Blood Donation Community</p>
           <p className="p1">Join us in our mission to save
            lives and make a difference in the world. 
            Whether you're considering becoming a donor,
             organizing a blood drive, or simply spreading 
             the word about the importance of blood donation,
              your support is invaluable. 
              Together, we can ensure that patients in need have access to the 
              lifesaving blood transfusions they require.
               Thank you for visiting our website and for your commitment 
               to making a difference through blood donation.



</p>
             </div>
             <img src={b2} className='i2'/>
            
      </section>
      <section className="section">
        <div className="imagetextcontainer2">
       
        <p className="p3">Be a Hero, Donate Blood</p>
          
             </div>
            
            
      </section>
      
        <h5 style={{marginLeft:'45%'}}> © 2024, Blood Bank Donation</h5>

      </div>
      
 
       

  );
}                                                                             

export default Home_page;
