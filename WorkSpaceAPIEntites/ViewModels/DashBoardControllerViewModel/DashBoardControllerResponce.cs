using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkSpaceAPIEntites.ViewModels.DashBoardControllerViewModel
{
    public class EmployeeForDashBoard
    {
        public string? ProfileImage { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
    public class UserProjects
    {
        public long ProjectId { get; set; } = 0;
        public string ProjectName { get; set; } = string.Empty;
    }
    public class NewsAndUpdates
    {
        public long NewsId { get; set; }
        public string? NewsTitle { get; set; }
        public string? NewsDescription { get; set; }
        public string? NewsDate { get; set; }
        public string? DocumentPath { get; set; }
        public string? UpdateAt { get; set; }
    }
}
