using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GenericRepositories;
using eshop.Models;

namespace eshopAPI.ConfigurationHandler
{
    public class ConfigurationHandler
    {
        private static readonly Lazy<ConfigurationHandler> _instance = new Lazy<ConfigurationHandler>(() => new ConfigurationHandler());

        private ConfigurationHandler()
        {
            loadValues();
        }

        public static ConfigurationHandler Instance
        {
            get { return _instance.Value; }
        }

        private eshop.Models.Configuration _values { get; set; }

        private void loadValues()
        {
            _values = new GenericRepository<eshop.Models.Configuration>().GetByID(1);
            
        }

        public Configuration GetConfiguration()
        {
            return _values;
        }

        public object GetValue(string name)
        {
            return null;
        }
    }
}
