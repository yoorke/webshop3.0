using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using eshop.Models;
using GenericRepositories;
using GenericBE;

namespace eshopAPI.Controllers
{
    public class MenuItemController : BaseController
    {
        public IEnumerable<MenuItem> Get()
        {
            List<QueryParameter> parameters = new List<QueryParameter>();
            parameters.Add(new QueryParameter("languageID", base.GetClaimsValue("LanguageID")));
            return new GenericRepository<MenuItem>().GetByParameter("get", parameters, false, false);
        }
    }
}
