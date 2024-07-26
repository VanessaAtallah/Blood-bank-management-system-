using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using blood_bank.Models;

namespace blood_bank.Controllers
{
    [Route("api/[controller]")] // Route attribute to specify the base URL for this controller
    [ApiController] // Indicates that this controller is an API controller

public class DonationController : ControllerBase
{
    private readonly string? _connectionString; // Connection string to the database

    // Constructor to initialize the connection string using IConfiguration
    public DonationController(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("MySqlConnection");
    }

// Action method to handle GET requests to fetch all donations for a specific donor
[HttpGet]
public IActionResult GetAllDonations(int donorId)
{
    try
    {
        List<NewDonation> donations = new List<NewDonation>(); // List to hold donations objects

        using (MySqlConnection myConnection = new MySqlConnection(_connectionString))
        {
            myConnection.Open();

            // SQL command to select all the donations made by a specific donor
            using (MySqlCommand myCommand = new MySqlCommand("SELECT * FROM donation WHERE donor_id = @donorId ORDER BY donation_date DESC", myConnection))
            {
                myCommand.Parameters.AddWithValue("@donorId", donorId);
                using (MySqlDataReader reader = myCommand.ExecuteReader())
                {
                    // Loop through each row returned by the query
                    while (reader.Read())
                    {
                        NewDonation donation = new NewDonation
                        {
                            donor_name = reader.GetString("donor_name"),
                            donation_date = reader.GetDateTime("donation_date"),
                            bloodTypeDonated = reader.GetString("bloodTypeDonated"),
                            blood_components = reader.GetString("blood_components"),
                            donationQuantity = reader.GetString("donationQuantity")
                        };
                        donations.Add(donation); // Add the donation object to the list
                    }
                }
            }
        }

        return Ok(donations); // Return list of donation for the selected donor with HTTP 200 OK status
    }
    catch (MySqlException ex)
    {
        Console.WriteLine("An Error has occurred: " + ex.Message);
        return StatusCode(500, "An Error has occurred while fetching donations");  // Return HTTP 500 status if an error occurs
    }
}


}}
