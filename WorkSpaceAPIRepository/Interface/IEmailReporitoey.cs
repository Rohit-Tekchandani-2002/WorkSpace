using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkSpaceAPIRepository.Interface
{
    public interface IEmailReporitoey
    {
        public void SendEmail(string recipient, string subject, string body);
    }
}
