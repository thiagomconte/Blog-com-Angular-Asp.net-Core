using Microsoft.EntityFrameworkCore;
using serverWebAPI.Models;

namespace serverWebAPI.Data
{
    public class PostContext : DbContext
    {
        public PostContext(DbContextOptions<PostContext> options) : base(options){ }

        public DbSet<Post> Posts{ get; set; }

        public DbSet<User> Users{ get; set; }
    }
}