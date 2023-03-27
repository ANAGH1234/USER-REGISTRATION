using System.ComponentModel.DataAnnotations;

namespace WebApplicationMVC.Models
{
    public class UserRegistration
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Phone { get; set; }
        [Required]
        public string? Address { get; set; }
        [Required]
        public string? State { get; set; }
        [Required]
        public string? City { get; set; }




    }

}
