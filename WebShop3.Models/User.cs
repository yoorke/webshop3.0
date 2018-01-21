using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GenericBE;

namespace WebShop3.Models
{
    public class User : BaseEntity
    {
        //[SqlFieldNameAttribute("firma_id")]
        //public int FirmaID { get; set; }

        [SqlFieldNameAttribute("email")]
        public string Email { get; set; }

        [SqlFieldNameAttribute("firstName")]
        public string FirstName { get; set; }

        [SqlFieldNameAttribute("lastName")]
        public string LastName { get; set; }

        [SqlFieldNameAttribute("username")]
        public string UserName { get; set; }

        [SqlFieldNameAttribute("role_id", "UserRole", "id", Relation.OneToOne)]
        public UserRole UserRole { get; set; }

        public string FullName { get { return FirstName + " " + LastName; } }

        [SqlFieldNameAttribute("is_active")]
        public bool? IsActive { get; set; }

        [SqlFieldNameAttribute("languageID", "Language", "id", Relation.OneToOne)]
        public Language Language { get; set; }

        public string Name { get { return FirstName + " " + LastName; } }
    }
}