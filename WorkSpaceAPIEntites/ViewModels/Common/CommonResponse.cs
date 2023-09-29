using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkSpaceAPIEntites.ViewModels.Common
{
    public class CommonResponseStatus
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
    }
    public class CommonResponse<ResponceClass>
    {
        public Boolean IsError { get; set; } = true;
        public string ErrorMessage { get; set; } = String.Empty;
        public ResponceClass? Responce { get; set; }
    }
    public class MailSend
    {
        public string From { get; set; } = string.Empty;
        public string To { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
    }
    public class AppSetting
    {
        public static string AppRootPath { get; set; } = String.Empty;
    }
    public class DropDownResponce
    {
        public string Key { get; set; } = String.Empty;   
        public string Value { get; set; } = String.Empty;   
    }
    public class FileForm
    {
        [Required] public int FormId { get; set; }
        [Required] public string[] Courses { get; set; }
        [Required] public IFormFile File { get; set; }
    }
}
