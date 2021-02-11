using System.Collections.Generic;
using System.Threading.Tasks;
using serverWebAPI.Models;

namespace serverWebAPI.Data
{
    public interface IPostRepo
    {
        Task<IEnumerable<Post>> GetAllPosts();
        Task<Post> GetPostBySlug(string slug);
        Task AddPost(Post post);
        Task UpdatePost(Post post);
        Task DeletePost(int id);
        Task<bool> SaveChangesAsync();
    }
}