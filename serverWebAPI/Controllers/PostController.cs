using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using serverWebAPI.Data;
using serverWebAPI.Models;

namespace serverWebAPI.Controllers
{
    [ApiController]
    [Route("api/post")]
    public class PostController : ControllerBase
    {
        private readonly IPostRepo _repo;
        public PostController(IPostRepo repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllPosts(){
            try
            {
                var posts = await _repo.GetAllPosts();
                return Ok(posts);
            }
            catch (System.Exception)
            {
                
                return BadRequest("Não foi possível carregar as postagens");
            }
        }

        [HttpGet("getPostBySlug/{slug}")]
        public async Task<IActionResult> GetPostBySlug(string slug){
            try
            {
                var post = await _repo.GetPostBySlug(slug);
                return Ok(post);
            }
            catch (System.Exception)
            {
                
                return BadRequest("Não foi possível carregar a postagem");
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddPost(Post post){
            try
            {
                await _repo.AddPost(post);
                if(await _repo.SaveChangesAsync()){
                    return Ok("Postagem adicionada");
                }
                return BadRequest("Não foi possível adicionar a postagem");
            }
            catch (System.Exception)
            {
                
                return BadRequest("Não foi possível adicionar a postagem");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id){
            try
            {
                await _repo.DeletePost(id);
                if(await _repo.SaveChangesAsync()){
                    return Ok("Postagem deletada");
                }
                return BadRequest("Não foi possível adicionar a postagem");
            }
            catch (System.Exception)
            {
                
                return BadRequest("Não foi possível adicionar a postagem");
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdatePost(Post post){
            try
            {
                await _repo.UpdatePost(post);
                if(await _repo.SaveChangesAsync()){
                    return Ok("Postagem atualizada");
                }
                return BadRequest("Não foi possível atualizar a postagem");
            }
            catch (System.Exception ex)
            {
                
                return BadRequest($"Não foi possível atualizar a postagem: {ex}");
            }
        }
    }
}