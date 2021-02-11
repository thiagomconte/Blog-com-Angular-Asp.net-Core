using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using serverWebAPI.Data;
using serverWebAPI.Models; 
using serverWebAPI.Services;

namespace serverWebAPI.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        
        private readonly IUserRepo _repo;

        public UserController(IUserRepo repo)
        {
            _repo = repo;
        }        
        
        [HttpPost]
        public async Task<IActionResult> AddUser(User user){
            try
            {

                if(user.password.Length < 6){
                    return BadRequest("A senha deve conter no mínimo 6 caracteres");
                }else if(user.nome.Length == 0|| user.email.Length == 0){
                    return BadRequest("Preencha todos os campos");
                }else{
                    await _repo.AddUser(user);
                    if(await _repo.SaveChangesAsync()){
                        return Ok("Usuario cadastrado");
                    }
                    return BadRequest("Não foi possivel cadastrar");
                }

                
            }
            catch (System.Exception)
            {
                return BadRequest("Não foi possivel cadastrar");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers(){
            try
            {
                var users = await _repo.GetUsers();
                return Ok(users);
            }
            catch (System.Exception)
            {
                return BadRequest("Não foi possivel carregar a lista de usuários");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Authenticate(AuthenticateModel user){
            try
            {
                var account = await _repo.AuthenticateUser(user);
                if(account == null){
                    return BadRequest("Dados incorretos");
                }else{
                    var token = TokenService.GenerateToken(account);
                    account.password = "";
                    
                    return Ok(new {token, account});
                }
            }
            catch (System.Exception)
            {
                
                return BadRequest("Erro interno");
            }
        }

        [HttpGet("isAuth")]
        [Authorize]
        public IActionResult IsAuth(){
            return Ok("Esta logado");
        }

    }
}