using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using eshop.Models;
using GenericRepositories;
using GenericBE;
using System.Data;

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

        public IEnumerable<Category> GetRoot()
        {
            //dummy parameters
            List<QueryParameter> parameters = new List<QueryParameter>();
            parameters.Add(new QueryParameter("id", 1));
            return new GenericRepository<Category>().GetByParameter("getRoot", parameters, true, false);
        }

        [HttpGet]
        public DataTable GetNestedTable()
        {
            DataTable categoriesTable = new DataTable();
            categoriesTable.Columns.Add("ID", typeof(int));
            categoriesTable.Columns.Add("Name", typeof(string));
            categoriesTable.Columns.Add("ImageUrl", typeof(string));
            categoriesTable.Columns.Add("Indent", typeof(string));

            IEnumerable<Category> categoriesList = GetRoot();

            return categoriesList != null ? getCategories(categoriesTable, categoriesList, string.Empty) : null;
        }

        [HttpGet]
        [ActionName("GetSortIndex")]
        public int GetSortIndex(int parentCategoryID)
        {
            List<QueryParameter> parameters = new List<QueryParameter>();
            parameters.Add(new QueryParameter("parentCategoryID", parentCategoryID));
            return (int)new GenericRepository<Category>().GetScalar("category", "getSortIndex", parameters);
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
            Category category = new GenericRepository<Category>().GetByID(id);
            new GenericRepository<Category>().Delete(category);
            return Ok(category);
        }

        [HttpPost]
        public IHttpActionResult DeleteAll(int[] ids)
        {
            foreach (int id in ids)
                Delete(id);
            return Ok();
        }

        private DataTable getCategories(DataTable categoriesTable, IEnumerable<Category> categories, string indent)
        {
            foreach(Category category in categories)
            {
                DataRow newRow = categoriesTable.NewRow();
                newRow["ID"] = category.ID;
                newRow["Name"] = category.Name;
                newRow["ImageUrl"] = category.ImageUrl;
                newRow["Indent"] = indent;

                categoriesTable.Rows.Add(newRow);

                if (category.SubCategories != null)
                    getCategories(categoriesTable, category.SubCategories, indent + "----------------");
            }

            return categoriesTable;
        }

        [HttpPost]
        [ActionName("UploadImage")]
        public HttpResponseMessage UploadImage()
        {
            eshopAPI.ConfigurationHandler config = eshopAPI.ConfigurationHandler.Instance;
            ConfigurationHandler con = ConfigurationHandler.Instance;
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
