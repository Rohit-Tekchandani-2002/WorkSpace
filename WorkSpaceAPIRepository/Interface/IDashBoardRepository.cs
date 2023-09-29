using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using WorkSpaceAPIEntites.ViewModels.DashBoardControllerViewModel;

namespace WorkSpaceAPIRepository.Interface
{
    public interface IDashBoardRepository
    {
        EmployeeForDashBoard? GetEmployeeInfo(long employeeId, out HttpStatusCode? statusCode, out string? errorText);
        List<UserProjects>? GetUserProjects(long employeeId, out HttpStatusCode? statusCode, out string? errorText);
        List<NewsAndUpdates>? GetnewsAndUpdates(out HttpStatusCode? statusCode, out string? errorText);
    }
}
