using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using serverWebAPI.Models;

namespace serverWebAPI.Data
{
    public class PostRepo : IPostRepo
    {
        private readonly PostContext _context;
        public PostRepo(PostContext context)
        {
            _context = context;            
        }

        public async Task AddPost(Post post)
        {
            await _context.Posts.AddAsync(post);
        }

        public async Task DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            _context.Posts.Remove(post);
        }

        public async Task<IEnumerable<Post>> GetAllPosts()
        {
            return await _context.Posts.ToListAsync();
        }

        public async Task<Post> GetPostBySlug(string slug)
        {
            return await _context.Posts.SingleOrDefaultAsync(p => p.slug == slug);
        }

        public async Task UpdatePost(Post post)
        {
            var postFound = await _context.Posts.FirstOrDefaultAsync(p => p.id == post.id);
            postFound.title = post.title;
            postFound.content = post.content;
            postFound.slug = post.slug;
            postFound.description = post.description;

            _context.Posts.Update(postFound);
        }

        public async Task<bool> SaveChangesAsync(){
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}