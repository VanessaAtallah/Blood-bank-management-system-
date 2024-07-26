import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ViewDonation.module.css';


const DonationPopup = ({ donorId, onClose }) => {
  const [donations, setDonations] = useState([]);


  //get the donations of a specific donor
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(`https://localhost:7104/api/donation?donorId=${donorId}`);
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();
  }, [donorId]);

   //when popup is open, disable scrolling in the background
  useEffect(() => {
    if (donations.length > 0) {
      document.body.style.overflow = 'hidden'; // Disable body scroll
    } else {
      document.body.style.overflow = 'auto'; // Enable body scroll
    }

    // Cleanup function to re-enable body scroll when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [donations.length]);


  return (
    <div className={styles.popupDonation}>
        <div className={styles.popupInnerDonation}>

            <span className={styles.closeDonation} onClick={onClose}>&times;</span> {/* x to close the popup */}
            
            <h2>Donation Details</h2>

            <ol>
              {donations.map((donation, index) => (
                <li key={index}> {/* each li corresponds to one donation made by this selected donor */}
                  <p>Donation Date: {donation.donation_date.split('T')[0]}</p>
                  <p>Blood Type: {donation.bloodTypeDonated}</p>
                  <p>Donated Blood Component: {donation.blood_components}</p>
                  <p>Donation Quantity: {donation.donationQuantity}</p>
                </li>
              ))}
            </ol>

        </div>
    </div>
  );
};

export default DonationPopup;
