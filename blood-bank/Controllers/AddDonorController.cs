using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;

namespace blood_bank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddDonorController : ControllerBase
    {
        private readonly string? _connectionString;

        // Constructor
        public AddDonorController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MySqlConnection");
        }

        // POST method to add a new donor
        [HttpPost]
        public IActionResult Post([FromBody] Models.Donor donor)
        {
            try
            {
                // Establish connection to MySQL database
                using (MySqlConnection myConnection = new MySqlConnection(_connectionString))
                {
                    myConnection.Open();
                    // Create MySqlCommand to execute SQL command
                    using (MySqlCommand myCommand = new MySqlCommand())
                    {
                        myCommand.Connection = myConnection;
                        // Define SQL command to insert donor information into the database
                        myCommand.CommandText = @"INSERT INTO donor (user_id, first_name, last_name, gender, birth_date, contact_number, bloodType, address, additional_info) 
                                                VALUES (@user_id, @first_name, @last_name, @gender, @birth_date, @contact_number, @bloodType, @address, @additional_info)";
                        // Set parameters for the SQL command
                        myCommand.Parameters.AddWithValue("@user_id", donor.user_id);
                        myCommand.Parameters.AddWithValue("@first_name", donor.first_name);
                        myCommand.Parameters.AddWithValue("@last_name", donor.last_name);
                        myCommand.Parameters.AddWithValue("@gender", donor.gender);
                        myCommand.Parameters.AddWithValue("@birth_date", donor.birth_date);
                        myCommand.Parameters.AddWithValue("@contact_number", donor.contact_number);
                        myCommand.Parameters.AddWithValue("@bloodType", donor.bloodType);
                        myCommand.Parameters.AddWithValue("@address", donor.address);
                        myCommand.Parameters.AddWithValue("@additional_info", donor.additional_info);

                        // Execute the SQL command
                        myCommand.ExecuteNonQuery();
                    }
                }
                // Return success message if donor is added successfully
                return Ok(new { message = "Donor added successfully" });
            }
            catch (MySqlException ex)
            {
                // Handle any MySQL exceptions
                Console.WriteLine("An Error has occurred: " + ex.Message);
                return StatusCode(500, "An Error has occurred Creating User");
            }
        }
    }
}
