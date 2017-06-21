using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Http.Cors;
using Microsoft.Practices.Unity;
using GenericRepositories;
using RepositoryInterfaces;
using eshop.Models;

namespace eshopAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.EnableCors(new EnableCorsAttribute("*", "*", "*"));
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));
            config.Filters.Add(new eshopAPI.filters.ExceptionFilter());

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "ApiRoute",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
                );
                
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var container = new UnityContainer();
            container.RegisterType<IGenericRepository<Category>, GenericRepository<Category>>(new HierarchicalLifetimeManager());
            container.RegisterType<IGenericRepository<Configuration>, GenericRepository<Configuration>>(new HierarchicalLifetimeManager());
            //container.RegisterType<ConfigurationHandler.IConfigurationHandler, ConfigurationHandler.ConfigurationHandler>(new HierarchicalLifetimeManager());
            config.DependencyResolver = new UnityResolver(container);
        }
    }
}
