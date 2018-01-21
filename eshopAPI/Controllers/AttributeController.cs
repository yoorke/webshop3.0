using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebShop3.Models;
using GenericRepositories;

namespace WebShop3.API.Controllers
{
    public class AttributeController : BaseController
    {
        public IEnumerable<WebShop3.Models.Attribute> Get()
        {
            return new GenericRepository<WebShop3.Models.Attribute>().GetAll();
        }

        public WebShop3.Models.Attribute Get(int id)
        {
            return new GenericRepository<WebShop3.Models.Attribute>().GetByID(id);
        }

        public IHttpActionResult Post([FromBody] WebShop3.Models.Attribute attribute)
        {
            attribute.ID = new GenericRepository<WebShop3.Models.Attribute>().Insert(attribute);
            return Ok(attribute);
        }

        public IHttpActionResult Put(int id, [FromBody] WebShop3.Models.Attribute attribute)
        {
            return Ok(new GenericRepository<WebShop3.Models.Attribute>().Update(attribute));
        }

        public IHttpActionResult Delete(int id)
        {
            new GenericRepository<WebShop3.Models.Attribute>().Delete(new GenericRepository<WebShop3.Models.Attribute>().GetByID(id));
            return Ok();
        }

        [HttpPatch]
        public IHttpActionResult DeleteAll(int[] ids)
        {
            foreach (int id in ids)
                Delete(id);
            return Ok();
        }
    }
}
