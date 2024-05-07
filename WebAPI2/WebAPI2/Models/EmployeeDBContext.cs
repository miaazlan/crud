using Microsoft.EntityFrameworkCore;

namespace WebAPI2.Models
{
    public class EmployeeDBContext : DbContext
    {
        public EmployeeDBContext(DbContextOptions<EmployeeDBContext> options) : base(options)
        {

        }

        public DbSet<DEmployee> DEmployee { get; set; }
    }

}
