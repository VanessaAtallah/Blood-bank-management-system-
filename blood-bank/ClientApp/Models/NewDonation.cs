
namespace blood_bank.Models
{
    public class NewDonation
    {
        public int? donation_id {get; set; }
        public string? donor_name {get; set; }
        public string? blood_components {get; set;}
        public DateTime? donation_date { get; set; }
        public string? bloodTypeDonated { get; set; }
        public string? donationQuantity { get; set; }
        public int? donor_id { get; set; }
    }
}
