using Employee_Ajax_JQuery.Entity;
using Microsoft.EntityFrameworkCore;

namespace Employee_Ajax_JQuery.Context
{
    public class EmployeeDBContext : DbContext
    {
        public EmployeeDBContext(DbContextOptions dbContext) : base(dbContext) { }
        public DbSet<EmployeeEntity> Employees { get; set; }
    }
}
