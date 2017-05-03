using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GenericBE;

namespace eshop.Models
{
    public class Category : BaseEntity
    {
        [SqlFieldNameAttribute("name")]
        public string Name { get; set; }

        [SqlFieldNameAttribute("description")]
        public string Description { get; set; }

        [SqlFieldNameAttribute("url")]
        public string Url { get; set; }

        [SqlFieldNameAttribute("imageUrl")]
        public string ImageUrl { get; set; }

        [SqlFieldNameAttribute("sortIndex")]
        public int SortIndex { get; set; }

        [SqlFieldNameAttribute("showOnFirstPage")]
        public bool ShowOnFirstPage { get; set; }

        [SqlFieldNameAttribute("firstPageProductsCount")]
        public int FirstPageProductsCount { get; set; }

        [SqlFieldNameAttribute("firstPageSortIndex")]
        public int FirstPageSortIndex { get; set; }

        [SqlFieldNameAttribute("firstPageOrderBy")]
        public string FirstPageOrderBy { get; set; }

        [SqlFieldNameAttribute("sliderID", "Slider", "id", Relation.OneToOne)]
        public Slider Slider { get; set; }

        [SqlFieldNameAttribute("categoryBannerID", "CategoryBanner", "id", Relation.OneToOne)]
        public CategoryBanner CategoryBanner { get; set; }

        [SqlFieldNameAttribute("parentCategoryID")]
        public int ParentCategoryID { get; set; }

        [SqlFieldNameAttribute("categoryID", "Category", "id", Relation.OneToMany, "getByCategoryID")]
        public List<Category> SubCategories { get; set; }
    }
}
