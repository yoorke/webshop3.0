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
    public class AttributeController : BaseController
    {
        public IEnumerable<eshop.Models.Attribute> Get()
        {
            return new GenericRepository<eshop.Models.Attribute>().GetAll();
        }

        public eshop.Models.Attribute Get(int id)
        {
            return new GenericRepository<eshop.Models.Attribute>().GetByID(id);
        }

        public IHttpActionResult Post([FromBody] eshop.Models.Attribute attribute)
        {
            attribute.ID = new GenericRepository<eshop.Models.Attribute>().Insert(attribute);
            return Ok(attribute);
        }

        public IHttpActionResult Put(int id, [FromBody] eshop.Models.Attribute attribute)
        {
            return Ok(new GenericRepository<eshop.Models.Attribute>().Update(attribute));
        }

        public IHttpActionResult Delete(int id)
        {
            new GenericRepository<eshop.Models.Attribute>().Delete(new GenericRepository<eshop.Models.Attribute>().GetByID(id));
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
