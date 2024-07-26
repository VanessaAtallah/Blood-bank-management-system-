using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MySql.Data.MySqlClient;
using blood_bank.Models;

namespace blood_bank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly string? _connectionString;
        private readonly IConfiguration _configuration;

        // Constructor
        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("MySqlConnection");
        }

        // Endpoint to handle user login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            try
            {
                // Establish connection to MySQL database
                using (MySqlConnection myConnection = new MySqlConnection(_connectionString))
                {
                    myConnection.Open();

                    // SQL query to retrieve user_id and name based on email and password
                    string query = "SELECT user_id, name FROM user WHERE email=@email AND password=@password";

                    // Execute the SQL query using MySqlCommand
                    using (MySqlCommand myCommand = new MySqlCommand(query, myConnection))
                    {
                        myCommand.Parameters.AddWithValue("@email", request.email);
                        myCommand.Parameters.AddWithValue("@password", request.password);

                        // Read the result using MySqlDataReader
                        using (MySqlDataReader reader = myCommand.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                // Retrieve user_id and name from the result
                                var userId = reader.GetInt32("user_id");
                                var username = reader.GetString("name");

                                // Generate JWT token
                                var token = GenerateJwtToken(userId, username);

                                // Return token and user_id in the response
                                return Ok(new { token, userId });
                            }
                        }
                    }
                }
                // Return Unauthorized if user credentials are invalid
                return Unauthorized(new { message = "Invalid email or password" });
            }
            catch (Exception ex)
            {
                // Return Internal Server Error if an exception occurs
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        // Method to generate JWT token
        private string GenerateJwtToken(int userId, string username)
        {
            // Get secret key from appsettings.json
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            
            // Create credentials using the secret key
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // Define claims including user_id and name
            var claims = new[]
            {
                new Claim("user_id", userId.ToString()),
                new Claim("name", username)
            };

            // Create JWT token with claims, expiration time, and signing credentials
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

            // Write token as a string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
