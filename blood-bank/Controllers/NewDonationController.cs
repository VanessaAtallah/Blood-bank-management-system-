using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using blood_bank.Models; // Import the NewDonation model

namespace blood_bank.Controllers
{
    [Route("api/[controller]")] // Route attribute to specify the base URL for this controller
    [ApiController] // Indicates that this controller is an API controller

    public class NewDonationController : ControllerBase
    {
        private readonly string? _connectionString; // Connection string to the database

        // Constructor to initialize the connection string using IConfiguration
        public NewDonationController (IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MySqlConnection");
        }

// Action method to handle POST requests to add a new donation
[HttpPost]
public IActionResult Post([FromBody] NewDonation donation)
{
    var responseObject = new { message = $"Create Donation: {donation.donor_id}, {donation.donor_name},  {donation.blood_components}, {donation.donation_date}, {donation.bloodTypeDonated}, {donation.donationQuantity}" };

    try
    {
        using (MySqlConnection myConnection = new MySqlConnection(_connectionString))
        {
            myConnection.Open(); // Open the database connection

            // SQL command to insert a new donation
            using (MySqlCommand newDonationCommand = new MySqlCommand())
            {
                newDonationCommand.Connection = myConnection;
                newDonationCommand.CommandText =newDonationCommand.CommandText = @"INSERT INTO donation (donor_id, donor_name, donation_date, blood_components, bloodTypeDonated, donationQuantity) VALUES (@donor_id, @donor_name, @date, @blood_components, @typeDonated, @quantity)";

                newDonationCommand.Parameters.AddWithValue("@donor_id", donation.donor_id);
                newDonationCommand.Parameters.AddWithValue("@blood_components", donation.blood_components);           
                newDonationCommand.Parameters.AddWithValue("@donor_name", donation.donor_name);
                newDonationCommand.Parameters.AddWithValue("@date", donation.donation_date);
                newDonationCommand.Parameters.AddWithValue("@typeDonated", donation.bloodTypeDonated);
                newDonationCommand.Parameters.AddWithValue("@quantity", donation.donationQuantity);

                newDonationCommand.ExecuteNonQuery();
            }
        }
    }
    catch (MySqlException ex)
    {
        Console.WriteLine("An Error has occurred: " + ex.Message);
        return StatusCode(500, "An Error has occurred Creating Donation");  // Return HTTP 500 status if an error occurs
    }
    return Ok(responseObject);
}

}
}