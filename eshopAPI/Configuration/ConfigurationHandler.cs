using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GenericRepositories;

namespace eshopAPI
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

        public eshop.Models.Configuration Values { get; set; }

        private void loadValues()
        {
            Values = new GenericRepository<eshop.Models.Configuration>().GetByID(1);
            
        }
    }
}
