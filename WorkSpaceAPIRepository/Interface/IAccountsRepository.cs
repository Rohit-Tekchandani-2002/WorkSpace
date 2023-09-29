using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using WorkSpaceAPIEntites.ViewModels.AccountsControllerViewModel;

namespace WorkSpaceAPIRepository.Interface
{
    public interface IAccountsRepository
    {
        public Tokens? Authenticate(LoginRequest loginRequest, out HttpStatusCode? statusCode, out string? errorText);
        public Tokens? RefreshToken(string? refreshToken, out HttpStatusCode? statusCode, out string? errorText);
        public void Register(RegisterRequest registerRequest, out HttpStatusCode? statusCode, out string? errorText);
        string? ForgotPassword(string userName, out HttpStatusCode? statusCode, out string? errorText);
    }
}
