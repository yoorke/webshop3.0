using GenericBE;
using GenericRepositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Http;
using eshop.Models;

namespace eshopAPI.Controllers
{
    public class UserRoleController : ApiController
    {
        public IEnumerable<UserRole> Get()
        {
            List<QueryParameter> parameters = new List<QueryParameter>();
            parameters.Add(new QueryParameter("username", HttpContext.Current.User.Identity.Name));
            return new GenericRepository<UserRole>().GetByParameter("get", parameters);
        }

        public UserRole Get(int id)
        {
            return new GenericRepository<UserRole>().GetByID(id);
        }

        public DataTable GetFlat()
        {
            return new GenericRepository<UserRole>().GetDataTable("userRole", "get", null);
        }
    }
}