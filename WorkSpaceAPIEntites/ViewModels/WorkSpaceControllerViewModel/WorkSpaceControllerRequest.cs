using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkSpaceAPIEntites.ViewModels.WorkSpaceControllerViewModel
{
    public class GetMonthlyTimeLogRequest
    {
        public long EmployeeId { get; set; }
        public int? Month { get; set; }
        public int? Year { get; set; }
    }
    public class GetYearlyTimeLogRequest
    {
        public long EmployeeId { get; set; }
        public int? Year { get; set; }
    }
    public class LeaveRequestEmployeeInfoRequest
    {
        public long EmployeeId { get; set; }    
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
    public class ServiceDropDownRequest
    {
        public long? InputServiceGroupId { get; set; }
        public long? InputCategoryId { get; set; }
    }
}
