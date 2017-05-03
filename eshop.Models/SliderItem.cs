using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GenericBE;

namespace eshop.Models
{
    public class SliderItem
    {
        [SqlFieldNameAttribute("imageUrl")]
        public string ImageUrl { get; set; }

        [SqlFieldNameAttribute("url")]
        public string Url { get; set; }

        [SqlFieldNameAttribute("sortIndex")]
        public int SortIndex { get; set; }
    }
}
