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
    public class CategoryBannerController : BaseController
    {
        public IEnumerable<CategoryBanner> Get()
        {
            return new GenericRepository<CategoryBanner>().GetAll();
        }

        public CategoryBanner Get(int id)
        {
            return new GenericRepository<CategoryBanner>().GetByID(id);
        }

        public IHttpActionResult Post([FromBody] CategoryBanner categoryBanner)
        {
            categoryBanner.ID = new GenericRepository<CategoryBanner>().Insert(categoryBanner);
            return Ok(categoryBanner);
        }

        public IHttpActionResult Put(int id, [FromBody] CategoryBanner categoryBanner)
        {
            return Ok(new GenericRepository<CategoryBanner>().Update(categoryBanner));
        }

        public IHttpActionResult Delete(int id)
        {
            new GenericRepository<CategoryBanner>().Delete(new GenericRepository<CategoryBanner>().GetByID(id));
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
