using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Project.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<User> User { get; set; }

        public async Task<List<User>> SearchUsersByNameAsync(string name)
        {
            return await User.FromSqlRaw("EXEC [dbo].[spCustomers_SearchCustomers] @p0", name).ToListAsync();
        }
    }
}
