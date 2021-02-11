namespace serverWebAPI.Models
{
    public class User
    {
        public User()
        {
            
        }
        public User(int id, string nome, string email, string password)
        {
            this.id = id;
            this.nome = nome;
            this.email = email;
            this.password = password;

        }
        public int id { get; set; }

        public string nome { get; set; }

        public string email { get; set; }

        public string password { get; set; }
    }
}