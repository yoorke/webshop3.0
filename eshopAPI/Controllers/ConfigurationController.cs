using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using eshop.Models;
using GenericRepositories;

namespace eshopAPI.Controllers
{
    public class ConfigurationController : BaseController
    {
        public Configuration Get(int id)
        {
            return new GenericRepository<Configuration>().GetByID(id);
        }

        public IHttpActionResult Put(int id, [FromBody] Configuration configuration)
        {
            return Ok(new GenericRepository<Configuration>().Update(configuration));
        }
    }
}
