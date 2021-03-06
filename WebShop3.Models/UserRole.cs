﻿using GenericBE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebShop3.Models
{
    public class UserRole : BaseEntity
    {
        [SqlFieldNameAttribute("Name")]
        public string Name { get; set; }

        [SqlFieldNameAttribute("Description")]
        public string Description { get; set; }
    }
}