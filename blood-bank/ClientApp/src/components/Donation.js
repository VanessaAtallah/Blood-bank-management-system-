import axios from 'axios';
import React, { useState , useEffect} from 'react';
import classes from './donation.module.css';

function AddDonation({ donorId, onClose }) {
    const [donorName, setDonorName] = useState('');
    const [donationDate, setDonationDate] = useState('');
    const [bloodTypeDonated, setBloodTypeDonated] = useState('');
    const [donationQuantity, setDonationQuantity] = useState('');
    const [blood_components, setBlood_components] = useState('');


    //Handle the insertion of a new donation in the donation table
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://localhost:7104/api/newdonation", {
                donor_id: donorId,
                donor_name: donorName,
                blood_components: blood_components,
                donation_date: donationDate,
                bloodTypeDonated: bloodTypeDonated,
                donationQuantity: donationQuantity,
            });
            if (response.status === 200) {
                // Handle success
                console.log('New Donation Created!');
                alert('Donation Inserted!'); 
                //close the donation form popup to prevent insertion of the same donation more than once 
                onClose();
            } else {
                // Handle error
                console.error('Error inserting donation:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    //when popup is open, disable scrolling in the background
    useEffect(() => {
      // Disable scrolling on the background
      document.body.style.overflow = 'hidden';
      return () => {
          // Re-enable scrolling when the component is unmounted
          document.body.style.overflow = 'auto';
      };
  }, []);

    return (
        <div className={classes.overlay}> {/*to create a semi transparent effect for the background when the popup is open*/}
            {/*Form to fill for inseting a new donation*/}
            <div className={classes.container1}>
                <span className={classes.close} onClick={onClose}>&times;</span> {/* x to close the popup */}

                <div className={classes.containertitle}>Donation</div>

                <form className={classes.userdetails} onSubmit={handleSubmit}>

                    <div className={classes.formrow}>

                        {/*donor name*/}
                        <div className={classes.inputbox}>
                            <label>Donor Name:</label>
                            <input type="text" value={donorName} onChange={(e) => setDonorName(e.target.value)} required/>     
                        </div>

                        {/*donation date*/}
                        <div className={classes.inputbox}>
                            <label>Donation Date:</label>
                            <input type="date" value={donationDate} onChange={(e) => setDonationDate(e.target.value)} required />
                        </div>

                    </div>

                    <div className={classes.formrow}>

                        {/*blood type*/}
                        <div className={classes.inputbox}>
                            <label>Blood Type:</label>
                            <input type="text"  value={bloodTypeDonated} onChange={(e) => setBloodTypeDonated(e.target.value)} placeholder='e.g. A+' required />
                        </div>
                 
                        {/*blood component*/}
                        <div className={classes.inputbox}>
                        <label>Blood Component:</label>
                        <input type="text"  value={blood_components} onChange={(e) => setBlood_components(e.target.value)} placeholder='e.g. Whole Blood' required />
                        </div>

                        {/*quantity*/}
                        <div className={classes.inputbox}>
                            <label>Quantity:</label>
                            <input type="text" value={donationQuantity} onChange={(e) => setDonationQuantity(e.target.value)} required />
                        </div>

                    </div>

                    <button className={classes.btn} type='submit'>
                        <span className={classes.btntextone}>Add Donation</span>
                        <span className={classes.btntexttwo}>Done!</span>
                    </button>

                </form>

            </div>
        </div>
    )
}

export default AddDonation;
