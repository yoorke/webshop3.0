using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using eshop.Models;

namespace eshopAPI.ConfigurationHandler
{
    public interface IConfigurationHandler
    {
        Configuration GetConfiguration();

        object GetValue(string name);
    }
}