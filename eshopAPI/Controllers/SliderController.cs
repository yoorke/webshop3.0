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
    public class SliderController : BaseController
    {
        public IEnumerable<Slider> Get()
        {
            return new GenericRepository<Slider>().GetAll();
        }

        public Slider Get(int id)
        {
            return new GenericRepository<Slider>().GetByID(id);
        }

        public IHttpActionResult Post([FromBody] Slider slider)
        {
            slider.ID = new GenericRepository<Slider>().Insert(slider);
            return Ok(slider);
        }

        public IHttpActionResult Put(int id, [FromBody] Slider slider)
        {
            return Ok(new GenericRepository<Slider>().Update(slider));
        }

        public IHttpActionResult Delete(int id)
        {
            new GenericRepository<Slider>().Delete(new GenericRepository<Slider>().GetByID(id));
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
