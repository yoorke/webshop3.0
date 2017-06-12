using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GenericBE;

namespace eshop.Models
{
    public class Configuration : BaseEntity
    {
        [SqlFieldNameAttribute("infoEmail")]
        public string InfoEmail { get; set; }

        [SqlFieldNameAttribute("infoEmailPassword")]
        public string InfoEmailPassword { get; set; }

        [SqlFieldNameAttribute("orderEmail")]
        public string OrderEmail { get; set; }

        [SqlFieldNameAttribute("orderEmailPassword")]
        public string OrderEmailPassword { get; set; }

        [SqlFieldNameAttribute("companyName")]
        public string CompanyName { get; set; }

        [SqlFieldNameAttribute("webShopUrl")]
        public string WebShopUrl { get; set; }

        [SqlFieldNameAttribute("webShopLoginUrl")]
        public string WebShopLoginUrl { get; set; }

        [SqlFieldNameAttribute("webShopLogoUrl")]
        public string WebShopLogoUrl { get; set; }

        [SqlFieldNameAttribute("webShopAdminUrl")]
        public string WebShopAdminUrl { get; set; }

        [SqlFieldNameAttribute("smtp")]
        public string Smtp { get; set; }

        [SqlFieldNameAttribute("smtpPort")]
        public int SmtpPort { get; set; }

        [SqlFieldNameAttribute("smtpSsl")]
        public bool SmtpSsl { get; set; }

        [SqlFieldNameAttribute("errorEmail")]
        public string ErrorEmail { get; set; }

        [SqlFieldNameAttribute("errorEmailPassword")]
        public string ErrorEmailPassword { get; set; }

        [SqlFieldNameAttribute("errorSmtp")]
        public string ErrorSmtp { get; set; }

        [SqlFieldNameAttribute("errorSmtpPort")]
        public int ErrorSmtpPort { get; set; }

        [SqlFieldNameAttribute("errorSmtpSsl")]
        public bool ErrorSmtpSsl { get; set; }

        [SqlFieldNameAttribute("mainWidth")]
        public int MainWidth { get; set; }

        [SqlFieldNameAttribute("mainHeight")]
        public int MainHeight { get; set; }

        [SqlFieldNameAttribute("mainName")]
        public string MainName { get; set; }

        [SqlFieldNameAttribute("listWidth")]
        public int ListWidth { get; set; }

        [SqlFieldNameAttribute("listHeight")]
        public int ListHeight { get; set; }

        [SqlFieldNameAttribute("listName")]
        public string ListName { get; set; }

        [SqlFieldNameAttribute("thumbWidth")]
        public int ThumbWidth { get; set; }

        [SqlFieldNameAttribute("thumbHeight")]
        public int ThumbHeight { get; set; }

        [SqlFieldNameAttribute("thumbName")]
        public string ThumbName { get; set; }

        [SqlFieldNameAttribute("showIfNotInStock")]
        public bool ShowIfNotInStock { get; set; }

        [SqlFieldNameAttribute("productDefaultDescription")]
        public string ProductDefaultDescription { get; set; }

        [SqlFieldNameAttribute("updateProductFromExternalApplication")]
        public bool UpdateProductFromExternalApplication { get; set; }

        [SqlFieldNameAttribute("exportProducts")]
        public bool ExportProducts { get; set; }

        [SqlFieldNameAttribute("leadingZerosCode")]
        public bool LeadingZerosCode { get; set; }

        [SqlFieldNameAttribute("leadingZerosBarcode")]
        public bool LeadingZerosBarcode { get; set; }

        [SqlFieldNameAttribute("fullProductUrl")]
        public bool FullProductUrl { get; set; }

        [SqlFieldNameAttribute("productInMultipleCategories")]
        public bool ProductInMultipleCategories { get; set; }

        [SqlFieldNameAttribute("includeSubcategoriesInProductList")]
        public bool IncludeSubcategoriesInProductList { get; set; }

        [SqlFieldNameAttribute("userDiscountVisible")]
        public bool UserDiscountVisible { get; set; }

        [SqlFieldNameAttribute("deliveryCost")]
        public double DeliveryCost { get; set; }

        [SqlFieldNameAttribute("freeDeliveryTotalValue")]
        public double FreeDeliveryTotalValue { get; set; }

        [SqlFieldNameAttribute("orderDiscountVisible")]
        public bool OrderDiscountVisible { get; set; }

        [SqlFieldNameAttribute("userDiscountOnlyOnProductNotOnPromotion")]
        public bool UserDiscountOnlyOnProductNotOnPromotion { get; set; }

        [SqlFieldNameAttribute("categoryImageWidth")]
        public int CategoryImageWidth { get; set; }

        [SqlFieldNameAttribute("categoryImageHeight")]
        public int CategoryImageHeight { get; set; }

        [SqlFieldNameAttribute("defaultLanguageID", "Language", "id", Relation.OneToOne)]
        public Language DefaultLanguage { get; set; }
    }
}
