using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace blood_bank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly string? _connectionString;

        // Constructor 
        public DashboardController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MySqlConnection");
        }

        // Endpoint to get the total count of donations for a user by user ID
        [HttpGet("donations/{uID}")]
        public IActionResult GetDonationCount(int uID)
        {
            try
            {
                // Establish connection to MySQL database
                using (MySqlConnection myConnection = new MySqlConnection(_connectionString))
                {
                    myConnection.Open();

                    // Query to get count of donations for the user
                    using (MySqlCommand myCommand = new MySqlCommand("SELECT COUNT(*) FROM donation WHERE donor_id IN (SELECT donor_id FROM donor WHERE user_id = @uID)", myConnection))
                    {
                        myCommand.Parameters.AddWithValue("@uID", uID);
                        var count = Convert.ToInt32(myCommand.ExecuteScalar());
                        return Ok(new { total = count });
                    }
                }
            }
            catch (MySqlException ex)
            {
                Console.WriteLine("An Error has occurred: " + ex.Message);
                return StatusCode(500, "An Error has occurred while counting donations");
            }
        }

        // Endpoint to get the count of donations for each blood type for a user by user ID
        [HttpGet("bloodtypes/{uID}")]
        public IActionResult GetDonationCountForBloodTypes(int uID)
        {
            try
            {
                using (MySqlConnection myConnection = new MySqlConnection(_connectionString))
                {
                    myConnection.Open();

                    // Query to get count of donations for each blood type for the user
                    using (MySqlCommand myCommand = new MySqlCommand("SELECT bloodTypeDonated, COUNT(*) FROM donation WHERE donor_id IN (SELECT donor_id FROM donor WHERE user_id = @uID) GROUP BY bloodTypeDonated", myConnection))
                    {
                      // Set the parameter @uID in the SQL command to the provided uID value
                    myCommand.Parameters.AddWithValue("@uID", uID);

                    // Execute the SQL command and retrieve the results using a data reader
                    using (MySqlDataReader reader = myCommand.ExecuteReader())
                    {
                    // Initialize a dictionary to store blood type counts
                     var bloodTypeCounts = new Dictionary<string, int>();

                    // Iterate through each row in the result set
                      while (reader.Read())
                    {
                   
                    string bloodType = reader.GetString(0);
                    int count = reader.GetInt32(1);
        
                    // Add the blood type and its count to the dictionary
                    bloodTypeCounts.Add(bloodType, count);
    }
    return Ok(bloodTypeCounts);
}

                    }
                }
            }
            catch (MySqlException ex)
            {
                Console.WriteLine("An Error has occurred: " + ex.Message);
                return StatusCode(500, "An Error has occurred while counting donations for blood types");
            }
        }

        // Endpoint to get the count of donors for a user by user ID
        [HttpGet("donors/{uID}")]
        public IActionResult GetDonorCountForUser(int uID)
        {
            try
            {
                using (MySqlConnection myConnection = new MySqlConnection(_connectionString))
                {
                    myConnection.Open();

                    // Query to get count of donors for the user
                    using (MySqlCommand myCommand = new MySqlCommand("SELECT COUNT(*) FROM donor WHERE user_id = @uID", myConnection))
                    {
                        myCommand.Parameters.AddWithValue("@uID", uID);
                        var countDonors = myCommand.ExecuteScalar();
                        return Ok(countDonors);
                    }
                }
            }
            catch (MySqlException ex)
            {
                Console.WriteLine("An Error has occurred: " + ex.Message);
                return StatusCode(500, "An Error has occurred while counting donors");
            }
        }
    }
}
