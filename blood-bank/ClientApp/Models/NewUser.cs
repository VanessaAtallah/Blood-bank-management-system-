
namespace blood_bank.Models
{
    public class NewUser
    {
        public int? user_id {get; set; }
        public string? name { get; set; }
        public string? email { get; set; }
        public string? password { get; set; }
        public string? phone_number { get; set; }
    }
}
