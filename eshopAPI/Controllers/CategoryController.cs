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
    public class CategoryController : BaseController
    {
        public IEnumerable<Category> Get()
        {
            return new GenericRepository<Category>().GetAll(null, true, false);
        }

        public Category Get(int id)
        {
            return new GenericRepository<Category>().GetByID(id);
        }

        public IHttpActionResult Post([FromBody] Category category)
        {
            category.ID = new GenericRepository<Category>().Insert(category);
            return Ok(category);
        }

        public IHttpActionResult Put(int id, [FromBody] Category category)
        {
            return Ok(new GenericRepository<Category>().Update(category));
        }

        public IHttpActionResult Delete(int id)
        {
            new GenericRepository<Category>().Delete(new GenericRepository<Category>().GetByID(id));
            return Ok();
        }

        public IHttpActionResult DeleteAll(int[] ids)
        {
            foreach (int id in ids)
                Delete(id);
            return Ok();
        }
    }
}
