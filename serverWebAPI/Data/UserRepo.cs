using System.Collections.Generic;
using System.Threading.Tasks;
using BC = BCrypt.Net.BCrypt;
using serverWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace serverWebAPI.Data
{
    public class UserRepo : IUserRepo
    {

        private readonly PostContext _context;

        public UserRepo(PostContext context)
        {
            _context = context;
        }

        public async Task AddUser(User user){
            user.password = BC.HashPassword(user.password);
            await _context.Users.AddAsync(user);
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<bool> SaveChangesAsync(){
            return (await _context.SaveChangesAsync()) > 0;
        }

        public async Task<User> AuthenticateUser(AuthenticateModel user){
            var account = await _context.Users.SingleOrDefaultAsync(u => u.email == user.email);
            if (account == null || !BC.Verify(user.password, account.password))
            {
                return null;
            }else{
                return account;
            }

        }
    }
}