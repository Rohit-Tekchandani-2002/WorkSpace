using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using WorkSpaceAPIEntites.ViewModels.Common;
using WorkSpaceAPIRepository.Interface;

namespace WorkSpaceAPIRepository.Repository
{
    public class EmailReporitoey : IEmailReporitoey
    {
        public void SendEmail(string recipient, string subject, string body)
        {
            MailSend mail = new MailSend();
            mail.From = "admin@tatvasoft.com";
            mail.To = recipient;
            mail.Subject = subject;
            mail.Body = body;

            SmtpClient smtp = new SmtpClient();
            smtp.Host = "sandbox.smtp.mailtrap.io";
            smtp.Credentials = new System.Net.NetworkCredential(
                "22c997f2e7905f", // UserName
                "abcfe97ca16eac" //Password
            );
            smtp.UseDefaultCredentials = false;
            smtp.EnableSsl = true;
            smtp.Port = 587;
            try
            {
                smtp.Send(mail.From, mail.To, mail.Subject, mail.Body);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error Sending email: " + ex.Message);
            }
        }
    }
}
