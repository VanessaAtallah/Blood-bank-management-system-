using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using blood_bank.Models; 

namespace blood_bank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonorController : ControllerBase
    {
        private readonly string? _connectionString;

        // Constructor
        public DonorController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MySqlConnection");
        }

        // GET method to fetch all donors for a specific user by user ID
        [HttpGet("{userId}")]
        public IActionResult GetAllDonors(int userId)
        {
            try
            {
                List<Donor> donors = new List<Donor>();

                // Establish connection to MySQL database
                using (MySqlConnection myConnection = new MySqlConnection(_connectionString))
                {
                    myConnection.Open();

                    // SQL query to select all donors for the given user ID
                    using (MySqlCommand myCommand = new MySqlCommand("SELECT * FROM donor WHERE user_id = @userId", myConnection))
                    {
                        myCommand.Parameters.AddWithValue("@userId", userId);

                        // Execute the SQL query and read the results
                        using (MySqlDataReader reader = myCommand.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                
                                Donor donor = new Donor
                                {
                                    donor_id = reader.GetInt32("donor_id"),
                                    first_name = reader.GetString("first_name"),
                                    last_name = reader.GetString("last_name"),
                                    gender = reader.GetString("gender"),
                                    birth_date = reader.GetDateTime("birth_date"),
                                    contact_number = reader.GetInt32("contact_number"),
                                    bloodType = reader.GetString("bloodType"),
                                    address = reader.GetString("address"),
                                    additional_info = reader.GetString("additional_info")
                                };

                                // Add donor to the list
                                donors.Add(donor);
                            }
                        }
                    }
                }

                // Return the list of donors
                return Ok(donors);
            }
            catch (MySqlException ex)
            {
                // Handle any MySQL exceptions
                Console.WriteLine("An Error has occurred: " + ex.Message);
                return StatusCode(500, "An Error has occurred while fetching donors");
            }
        }

        // DELETE method to delete a donor and associated donations by donor ID
        [HttpDelete("{id}")]
        public IActionResult DeleteDonor(int id)
        {
            try
            {
                // Establish connection to MySQL database
                using (MySqlConnection myConnection = new MySqlConnection(_connectionString))
                {
                    myConnection.Open();

                    // Delete donations associated with the donor
                    using (MySqlCommand deleteDonationsCommand = new MySqlCommand("DELETE FROM donation WHERE donor_id = @id", myConnection))
                    {
                        deleteDonationsCommand.Parameters.AddWithValue("@id", id);
                        deleteDonationsCommand.ExecuteNonQuery();
                    }

                    // Delete the donor
                    using (MySqlCommand myCommand = new MySqlCommand("DELETE FROM donor WHERE donor_id = @id", myConnection))
                    {
                        myCommand.Parameters.AddWithValue("@id", id);
                        int rowsAffected = myCommand.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            // Return success message if donor and associated donations are deleted successfully
                            return Ok(new { message = "Donor and associated donations deleted successfully" });
                        }
                        else
                        {
                            // Return Not Found if donor ID does not exist
                            return NotFound();
                        }
                    }
                }
            }
            catch (MySqlException ex)
            {
                // Handle any MySQL exceptions
                Console.WriteLine("An Error has occurred: " + ex.Message);
                return StatusCode(500, "An Error has occurred while deleting donor");
            }
        }
    }
}
