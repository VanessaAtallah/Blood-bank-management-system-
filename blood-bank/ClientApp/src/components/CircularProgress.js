import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CircularProgress.css';

const CircularProgress = () => {
    const strokeWidth = 10;
    const radius = 50 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const [counts, setCounts] = useState({
        'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0,
        'O+': 0, 'O-': 0, 'AB+': 0, 'AB-': 0,
        total: 0,
        donors: 0 // Initialize donor count
    });

    useEffect(() => {
        // Fetch donor count for the authenticated user
        const userID = localStorage.getItem('userId');
        if (userID) {
            axios.get(`https://localhost:7104/api/dashboard/donors/${userID}`)
                .then(response => {
                    setCounts(prevCounts => ({ ...prevCounts, donors: response.data }));
                })
                .catch(error => {
                    console.error('Error fetching donor count:', error);
                });
       
        
        // Fetch total donation count
        axios.get(`https://localhost:7104/api/dashboard/donations/${userID}`)

            .then(response => {
                setCounts(prevCounts => ({ ...prevCounts, total: response.data.total }));
            })
            .catch(error => {
                console.error('Error fetching donation count:', error);
            });
        }

        // Fetch donation count for each blood type related to the connected user
        axios.get(`https://localhost:7104/api/dashboard/bloodtypes/${userID}`)
        .then(response => {
            setCounts(prevCounts => ({ ...prevCounts, ...response.data }));
        })
        .catch(error => {
            console.error('Error fetching blood type counts:', error);
        });

    }, []);
    
    return (
        <div className='Progresses'>

            <div className="circle-container">
                {Object.entries(counts).map(([key, value]) => {
                    if (key !== 'total' && key !== 'donors') {
                        return (
                            <div key={key} className="progress-container">
                                <div className="circle-label">Number of {key} Donations</div>
                                <svg className="circular-progress" viewBox="0 0 100 100">
                                    <circle
                                        className="progress"
                                        cx="50"
                                        cy="50"
                                        r={radius}
                                        strokeWidth={strokeWidth}
                                        style={{ strokeDasharray: circumference, strokeDashoffset: circumference * (1 - value / counts.total) }}
                                    />
                                    <text className="text" x="50" y="50" dominantBaseline="middle" textAnchor="middle">
                                        {value}
                                    </text>
                                </svg>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <div className="box-container">
                <div className="box-label">Number of Donors</div>
                <div className="box-value">{counts.donors}</div>
            </div>
            <div className="box-container">
                <div className="box-label">Total Donations</div>
                <div className="box-value">{counts.total}</div>
            </div>
        </div>
    );

};

export default CircularProgress;
