import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './adddonor.module.css'; 
import ViewDonation from './ViewDonation'; 
import Donation from './Donation'; 

function DonorList() {
  // Define state variables
  const [donors, setDonors] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDonorId, setSelectedDonorId] = useState(null);
  const [showDonationPopup, setShowDonationPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodTypeFilter, setBloodTypeFilter] = useState('');

  // Function to handle opening ViewDonation popup
  const handleViewDonation = (donorId) => {
    setSelectedDonorId(donorId);
    setShowPopup(true);
  };

  // Function to close ViewDonation popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedDonorId(null);
  };

  // Function to handle opening Donation popup
  const handleMakeDonation = (donorId) => {
    setSelectedDonorId(donorId);
    setShowDonationPopup(true);
  };

  // Function to close Donation popup
  const handleCloseDonationPopup = () => {
    setShowDonationPopup(false);
    setSelectedDonorId(null);
  };

  // Fetch donors from API on component mount
  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage
    async function fetchDonors() {
      try {
        const response = await axios.get(`https://localhost:7104/api/donor/${userId}`); // Fetch donors from API
        setDonors(response.data); // Update donors state
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
    fetchDonors();
  }, []);

  // Function to handle deletion of a donor
  const handleDelete = async (donorId) => {
    try {
      await axios.delete(`https://localhost:7104/api/donor/${donorId}`); // Send DELETE request to API
      setDonors(donors.filter(donor => donor.donor_id !== donorId)); // Update donors state after deletion
      console.log('Delete donor with ID:', donorId);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  // Filter donors based on search term and blood type filter
  const filteredDonors = donors.filter(donor => {
    const fullName = `${donor.first_name} ${donor.last_name}`.toLowerCase();
    if (searchTerm && fullName.indexOf(searchTerm.toLowerCase()) === -1) {
      return false;
    }
    if (bloodTypeFilter && donor.bloodType !== bloodTypeFilter) {
      return false;
    }
    return true;
  });

  // Render donor list with buttons for each donor
  return (
    <div>
      <h2>Donor List</h2>
      <div className={classes.donorcontainer}>
        {/* Search input */}
        <input type="text" placeholder="Search by name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ marginRight: '10px' }} />
        {/* Blood type filter */}
        <select value={bloodTypeFilter} onChange={(e) => setBloodTypeFilter(e.target.value)}>
          <option value="">Filter by Blood Type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>  
        </select>
      </div>
      {/* Display filtered donors */}
      {filteredDonors.map(donor => (
        <div key={donor.donor_id} className={classes.donorbox}>
          <div className={classes.donorinfo}>
            {/* Display donor information */}
            <p>Donor ID: {donor.donor_id}</p>
            <p>Name: {donor.first_name} {donor.last_name}</p>
            <p>Gender: {donor.gender}</p>
            <p>Birth Date: {new Date(donor.birth_date).toLocaleDateString()}</p>
            <p>Contact Number: {donor.contact_number}</p>
            <p>Blood Type: {donor.bloodType}</p>
            <p>Address: {donor.address}</p>
            <p>Additional Info: {donor.additional_info}</p>
          </div>
          {/* Buttons for actions */}
          <div className={classes.donorbuttons}>
            <button onClick={() => handleDelete(donor.donor_id)}>Delete</button>
            <button onClick={() => handleViewDonation(donor.donor_id)}>View Donations</button>
            <button onClick={() => handleMakeDonation(donor.donor_id)}>Donation</button>
          </div>
        </div>
      ))}
      {/* Render ViewDonation popup if showPopup state is true */}
      {showPopup && <ViewDonation donorId={selectedDonorId} onClose={handleClosePopup} />}
      {/* Render Donation popup if showDonationPopup state is true */}
      {showDonationPopup && <Donation donorId={selectedDonorId} onClose={handleCloseDonationPopup} />}
    </div>
  );
}

export default DonorList;
