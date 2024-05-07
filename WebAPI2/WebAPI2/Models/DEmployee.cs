using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebAPI2.Models
{
    public class DEmployee
    {
        [Key]
        public int id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? name { get; set; }

        [Column(TypeName = "nvarchar(16)")]
        public string? mobile { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? email { get; set; }

   
    }
}
