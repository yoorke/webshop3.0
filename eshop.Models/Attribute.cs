using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GenericBE;

namespace eshop.Models
{
    public class Attribute : BaseEntity
    {
        [SqlFieldNameAttribute("name")]
        public string Name { get; set; }

        [SqlFieldNameAttribute("categoryID")]
        public int CategoryID { get; set; }

        [SqlFieldNameAttribute("isDescription")]
        public bool IsDescription { get; set; }

        [SqlFieldNameAttribute("isFilter")]
        public bool IsFilter { get; set; }

        [SqlFieldNameAttribute("sortIndex")]
        public int SortIndex { get; set; }
    }
}
