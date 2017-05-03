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
    public class LanguageController : BaseController
    {
        public IEnumerable<Language> Get()
        {
            return new GenericRepository<Language>().GetAll();
        }

        public Language Get(int id)
        {
            return new GenericRepository<Language>().GetByID(id);
        }

        public IHttpActionResult Post([FromBody] Language language)
        {
            language.ID = new GenericRepository<Language>().Insert(language);
            return Ok(language);
        }

        public IHttpActionResult Put(int id, [FromBody] Language language)
        {
            return Ok(new GenericRepository<Language>().Update(language));
        }

        public IHttpActionResult Delete(int id)
        {
            new GenericRepository<Language>().Delete(new GenericRepository<Language>().GetByID(id));
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
