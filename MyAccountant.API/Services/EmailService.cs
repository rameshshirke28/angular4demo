using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.Identity;

namespace MyAccountant.API.Services
{
	public class EmailService : IIdentityMessageService
	{
		public async Task SendAsync(IdentityMessage message)
		{
			await configSendGridasync(message);
		}

		// Use NuGet to install SendGrid (Basic C# client lib) 
		private async Task configSendGridasync(IdentityMessage message)
		{
			var fromAddress = ConfigurationManager.AppSettings["FromEmailId"].ToString();
			var toAddress = message.Destination;
			string fromPassword = ConfigurationManager.AppSettings["FromPassword"].ToString();

			using (MailMessage mm = new MailMessage(fromAddress, toAddress))
			{
				try
				{
					mm.Subject = message.Subject;
					mm.Body = message.Body;

					mm.IsBodyHtml = false;
					SmtpClient smtp = new SmtpClient();
					smtp.Host = ConfigurationManager.AppSettings["Host"].ToString();
					smtp.Port = Convert.ToInt32(ConfigurationManager.AppSettings["Port"]);
					smtp.Credentials = new System.Net.NetworkCredential(fromAddress, fromPassword);
					smtp.EnableSsl = Convert.ToBoolean(ConfigurationManager.AppSettings["EnableSsl"]);

					smtp.Send(mm);
					await Task.FromResult(1);
				}
				catch (SmtpException ex)
				{
					await Task.FromResult(0);
					//response.message = ex.Message;
				}
			}
		}
	}
}