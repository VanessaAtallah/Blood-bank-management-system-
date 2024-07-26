namespace blood_bank.Models
{
    public class Donor 
    {
        public int? donor_id { get; set; }
        public int? user_id { get; set; }
        public string? first_name { get; set; }
        public string? last_name { get; set; }
        public string? gender { get; set; }
        public DateTime? birth_date { get; set; } 
        public int? contact_number { get; set; }
        public string? bloodType { get; set; }
        public string? address { get; set; }
        public string? additional_info { get; set; }
       
        
    }
}
