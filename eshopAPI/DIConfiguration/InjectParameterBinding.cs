using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Metadata;

namespace WebShop3.API.DIConfiguration
{
    public class InjectParameterBinding : HttpParameterBinding
    {
        public InjectParameterBinding(HttpParameterDescriptor descriptor) : base(descriptor)
        {
        }

        public override Task ExecuteBindingAsync(ModelMetadataProvider metadataProvider, HttpActionContext actionContext, CancellationToken cancellationToken)
        {
            if (actionContext.ControllerContext.Configuration.DependencyResolver != null)
            {
                var resolved = actionContext.Request.GetDependencyScope().GetService(Descriptor.ParameterType);
                actionContext.ActionArguments[Descriptor.ParameterName] = resolved;
            }
            return Task.FromResult(0);
        }
    }
}