using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GenericBE;

namespace WebShop3.Models
{
    public class MenuItem : BaseEntity
    {
        [SqlFieldNameAttribute("name")]
        public string Name { get; set; }

        [SqlFieldNameAttribute("url")]
        public string Url { get; set; }

        [SqlFieldNameAttribute("icon")]
        public string Icon { get; set; }

        [SqlFieldNameAttribute("sortIndex")]
        public int SortIndex { get; set; }

        [SqlFieldNameAttribute("typeId")]
        public int Type { get; set; }

        [SqlFieldNameAttribute("menuID", "MenuItem", "id", Relation.OneToMany, "getByMenuID")]
        public List<MenuItem> SubMenu { get; set; }

        [SqlFieldNameAttribute("hrAfter")]
        public bool HrAfter { get; set; }
    }
}