﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace WebShop3.API.DIConfiguration
{
    [AttributeUsage(AttributeTargets.Parameter)]
    public class InjectAttribute : ParameterBindingAttribute
    {
        public override HttpParameterBinding GetBinding(HttpParameterDescriptor parameter)
        {
            return new InjectParameterBinding(parameter);
        }
    }
}