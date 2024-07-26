import React, { useState } from 'react';
import axios from 'axios';
import classes from './adddonor.module.css';

function AddDonor() {
  const initialFormData = {
    first_name: '',
    last_name: '',
    gender: '',
    birth_date: '',
    contact_number: '',
    bloodType: '',
    address: '',
    additional_info: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      console.log('Form Data:', {
        user_id: userId,
        ...formData,
      });
      const response = await axios.post('https://localhost:7104/api/AddDonor', {
        user_id: userId,
        ...formData,
      });
      console.log('Response:', response);
      if (response.status === 200) {
        console.log('Donor added successfully');
        alert('Donor added successfully');
        setFormData(initialFormData); // Reset form data
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Failed to add donor. Please try again later.');
    }
  };
  
  return (
    <div className={classes.container}>
      <div className={classes.containertitle}>Add Donor</div>
      <form className={classes.userdetails} onSubmit={handleSubmit}>
        <div>
          <div className={classes.inputbox}>
            <h4>Donor First Name</h4>
            <input type="text" name="first_name" placeholder='First Name' value={formData.first_name} onChange={handleChange} required />
          </div>
          <div className={classes.inputbox}>
            <h4>Donor Last Name</h4>
            <input type="text" name="last_name" placeholder='Last Name' value={formData.last_name} onChange={handleChange} required />
          </div>
        </div>
        <div>
          <div className={classes.inputbox}>
            <h4>Birth Date</h4>
            <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} required />
          </div>
          <div>
            <h4>Gender</h4>
            <br />
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              Female
            </label>
            <br />
            <br />
          </div>
          <div className={classes.inputbox}>
            <h4>Blood Type:</h4>
            <select name="bloodType" value={formData.bloodType} onChange={handleChange} required>
              <option value="">Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value='O-'>O-</option>
            </select>
          </div>
        </div>
        <div className={classes.inputbox}>
          <h4> Contact Number:</h4>
          <input type="text" name="contact_number" placeholder='Contact Number' value={formData.contact_number} onChange={handleChange} required />
        </div>
        <div className={classes.inputbox}>
          <h4> Address:</h4>
          <input type="text" name="address" placeholder='Address' value={formData.address} onChange={handleChange} required />
        </div>
        <div className={classes.inputbox}>
          <h4>Additional Information:</h4>
          <textarea cols={55} rows={5} name="additional_info" value={formData.additional_info} onChange={handleChange} required />
        </div>
        <button type="submit" className={classes.btn}>
          <span className={classes.btntextone}>Add Donor</span>
          <span className={classes.btntexttwo}>Done!</span>
        </button>
      </form>
    </div>
  );
}

export default AddDonor;
