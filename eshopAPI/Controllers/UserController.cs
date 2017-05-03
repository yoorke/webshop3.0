using GenericBE;
using GenericRepositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Http;
using eshop.Models;
using Microsoft.AspNet.Identity;

namespace eshopAPI.Controllers
{
    [Authorize]
    public class UserController : BaseController
    {
        public IEnumerable<User> Get()
        {
            List<QueryParameter> parameters = new List<QueryParameter>();
            parameters.Add(new QueryParameter("user_id", User.Identity.GetUserId()));
            return new GenericRepository<User>().GetByParameter("get", parameters, false);
            //return new GenericRepository<User>().GetAll();
        }

        public User Get(int id)
        {
            return new GenericRepository<User>().GetByID(id);
        }

        [HttpGet]
        [ActionName("GetByUsername")]
        public User GetByUsername(string username)
        {
            List<QueryParameter> parameters = new List<QueryParameter>();
            parameters.Add(new QueryParameter("username", username));
            return new GenericRepository<User>().GetByParameter("getByUsername", parameters, false)[0];
        }

        [HttpGet]
        public User GetProfile(string username)
        {
            List<QueryParameter> parameters = new List<QueryParameter>();
            parameters.Add(new QueryParameter("username", username));
            return new GenericRepository<User>().GetByParameter("getProfile", parameters, false)[0];
        }


        [Authorize(Roles = "Admin, FirmaAdmin")]
        public IHttpActionResult Put(int id, [FromBody] User user)
        {
            new GenericRepository<User>().Update(user);
            return Ok(user);
            //return BadRequest();
        }

        [Authorize(Roles = "Admin, FirmaAdmin")]
        public IHttpActionResult Delete(int id)
        {
            new GenericRepository<User>().Delete(new GenericRepository<User>().GetByID(id));
            return Ok();
        }

        public DataTable GetFlat()
        {
            List<QueryParameter> parameters = new List<QueryParameter>();
            parameters.Add(new QueryParameter("firma_id", base.GetClaimsValue("FirmaID")));
            return new GenericRepository<object>().GetDataTable("user", "get", parameters);
        }

        [HttpPost]
        public IHttpActionResult DeleteAll(int[] ids)
        {
            foreach (int id in ids)
                new GenericRepository<User>().Delete(new GenericRepository<User>().GetByID(id));
            return Ok();
        }
    }
}