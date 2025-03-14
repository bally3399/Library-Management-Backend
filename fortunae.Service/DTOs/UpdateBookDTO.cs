﻿using Microsoft.AspNetCore.Http;


namespace fortunae.Service.DTOs
{
    public class UpdateBookDTO
    {
        public string? Title { get; set; }
        public string? Author { get; set; }
        public string? Genre { get; set; }
        public string? Description { get; set; }
        public string? ISBN { get; set; }
        public bool? IsAvailable { get; set; }
        public IFormFile? Image { get; set; }
    }
}
