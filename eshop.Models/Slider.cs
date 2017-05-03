using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GenericBE;

namespace eshop.Models
{
    public class Slider : BaseEntity
    {
        [SqlFieldNameAttribute("name")]
        public string Name { get; set; }

        [SqlFieldNameAttribute("sliderID", "SliderItem", "id", Relation.OneToMany, "getBySliderID")]
        public List<SliderItem> Items { get; set; }
    }
}
