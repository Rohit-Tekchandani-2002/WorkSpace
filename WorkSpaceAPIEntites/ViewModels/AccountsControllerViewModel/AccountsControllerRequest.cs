using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkSpaceAPIEntites.ViewModels.AccountsControllerViewModel
{
    public class LoginRequest
    {
        public string userName { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
    }
    public class RegisterRequest
    {
        public string userName { get; set; } = string.Empty;
        public string firstName { get; set; } = string.Empty;
        public string lastName { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
    }
    public class RefershRequest
    {
        public string refershToken { get; set; } = String.Empty;
    }
}
