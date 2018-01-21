using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebShop3.Models;
using GenericRepositories;
using RepositoryInterfaces;

namespace WebShop3.API.Controllers
{
    public class ConfigurationController : BaseController
    {
        private IGenericRepository<Configuration> _repository;

        public ConfigurationController(IGenericRepository<Configuration> repository)
        {
            _repository = repository;
        }
        public IEnumerable<Configuration> Get()
        {
            return new GenericRepository<Configuration>().GetAll(null, false, false);
        }

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
