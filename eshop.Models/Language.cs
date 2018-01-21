using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GenericBE;

namespace WebShop3.Models
{
    public class Language : BaseEntity
    {
        [SqlFieldNameAttribute("name")]
        public string Name { get; set; }

        [SqlFieldNameAttribute("shortName")]
        public string ShortName { get; set; }
    }
}
