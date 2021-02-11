using System.Collections.Generic;
using System.Threading.Tasks;
using serverWebAPI.Models;

namespace serverWebAPI.Data
{
    public interface IUserRepo
    {
        Task AddUser(User user);
        Task<IEnumerable<User>> GetUsers();

        Task<bool> SaveChangesAsync();
        Task<User> AuthenticateUser(AuthenticateModel user);
    }
}