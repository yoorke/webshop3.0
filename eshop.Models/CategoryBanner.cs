using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GenericBE;

namespace WebShop3.Models
{
    public class CategoryBanner : BaseEntity
    {
        [SqlFieldNameAttribute("name")]
        public string Name { get; set; }

        [SqlFieldNameAttribute("url")]
        public string Url { get; set; }

        [SqlFieldNameAttribute("imageUrl")]
        public string ImageUrl { get; set; }
    }
}
