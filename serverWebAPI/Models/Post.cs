using System;
using System.ComponentModel.DataAnnotations;

namespace serverWebAPI.Models
{
    public class Post
    {
        public Post()
        {
            
        }
        public Post(int id, string title, string content, string slug, string description, string photo, DateTime created_at)
        {
            this.id = id;
            this.title = title;
            this.content = content;
            this.slug = slug;
            this.description = description;
            this.photo = photo;
            this.created_at = created_at;
        }

        [Key]
        public int id { get; set; }

        [Required]
        public string title { get; set; }

        [Required]
        public string content { get; set; }

        [Required]
        public string slug { get; set; }

        [Required]
        public string photo { get; set; }

        [Required]
        public string description { get; set; }

        [Required]
        public DateTime created_at { get; set; } = DateTime.Now;

    }
}