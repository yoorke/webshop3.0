using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebShop3.Models;

namespace WebShop3.API.ConfigurationHandler
{
    public interface IConfigurationHandler
    {
        Configuration GetConfiguration();

        object GetValue(string name);
    }
}