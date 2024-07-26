using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using blood_bank.Models;

namespace blood_bank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewUserController : ControllerBase
    {
        private readonly string? _connectionString;

        // Constructor that takes IConfiguration as a parameter
        public NewUserController(IConfiguration configuration)
        {
            // Get the connection string named "MySqlConnection" from appsettings.json
            _connectionString = configuration.GetConnectionString("MySqlConnection");
        }

        // Action method that handles POST requests to create a new user
        [HttpPost]
        public IActionResult Post([FromBody] NewUser user)
        {
            try
            {
                // Open a connection to the MySQL database using the connection string
                using (MySqlConnection myConnection = new MySqlConnection(_connectionString))
                {
                    myConnection.Open(); // Open the database connection

                    // Check if the email already exists in the database
                    string query = "SELECT COUNT(*) FROM user WHERE email = @email";
                    using (MySqlCommand checkEmailCommand = new MySqlCommand(query, myConnection))
                    {
                        checkEmailCommand.Parameters.AddWithValue("@email", user.email);
                        int emailCount = Convert.ToInt32(checkEmailCommand.ExecuteScalar());
                        if (emailCount > 0)
                        {
                            // Email already exists, return a 409 Conflict response with a message
                            return Conflict("Email already exists");
                        }
                    }

                    // Create a MySqlCommand object to execute SQL commands
                    using (MySqlCommand myCommand = new MySqlCommand())
                    {
                        myCommand.Connection = myConnection;
                        // Define the SQL command to insert a new user into the 'user' table
                        myCommand.CommandText = @"INSERT INTO user (name, email, password, phone_number) VALUES (@name, @email, @password, @phone)";

                        // Add parameters to the SQL command to prevent SQL injection attacks
                        myCommand.Parameters.AddWithValue("@name", user.name);
                        myCommand.Parameters.AddWithValue("@email", user.email);
                        myCommand.Parameters.AddWithValue("@password", user.password);
                        myCommand.Parameters.AddWithValue("@phone", user.phone_number);

                        // Execute the SQL command to insert the new user into the database
                        myCommand.ExecuteNonQuery();
                    }
                }
            }
            catch (MySqlException ex)
            {
                // Handle any exceptions that occur during database operations
                Console.WriteLine("An Error has occurred: " + ex.Message);
                // Return a 500 Internal Server Error response with a message
                return StatusCode(500, "An Error has occurred Creating User");
            }

            // Create an anonymous object to store response data
            var responseObject = new { message = $"Create user: {user.name}, email = {user.email} with password {user.password}" };
            // Return a 200 OK response with the response object containing a success message
            return Ok(responseObject);
        }
    }
}
