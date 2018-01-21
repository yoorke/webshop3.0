using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Http;

namespace WebShop3.API.Controllers
{
    public class BaseController : ApiController
    {
        public string GetClaimsValue(string claimType)
        {
            ClaimsIdentity claimsIdentity = HttpContext.Current.User.Identity as ClaimsIdentity;
            foreach (var claim in claimsIdentity.Claims)
                if (claim.Type.Equals(claimType))
                    return claim.Value;
            return string.Empty;
        }
    }
}