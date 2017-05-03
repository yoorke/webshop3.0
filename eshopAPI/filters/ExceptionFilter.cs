using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;
using Utility;

namespace eshopAPI.filters
{
    public class ExceptionFilter : ExceptionFilterAttribute, IExceptionFilter
    {
        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            HttpStatusCode status = HttpStatusCode.InternalServerError;
            string message = string.Empty;
            var exception = actionExecutedContext.Exception.GetBaseException();

            if (exception.Message.Contains("DELETE statement conflicted with the REFERENCE constraint"))
            {
                message = "DELETE-REFERENCE-CONSTRAINT";
                status = HttpStatusCode.Conflict;
            }
            else if (exception.Message.Contains("Cannot insert duplicate key row in object"))
            {
                message = "DUPLICATE-KEY";
                status = HttpStatusCode.Conflict;
            }
            else
            {
                message = "INTERNAL-SERVER-ERROR";
                status = HttpStatusCode.InternalServerError;
            }

            actionExecutedContext.Response = new HttpResponseMessage()
            {
                Content = new StringContent(message, System.Text.Encoding.UTF8, "text/plain"),
                StatusCode = status
            };

            base.OnException(actionExecutedContext);
            Utility.ExceptionHandling.ExceptionLog.LogError(actionExecutedContext.Exception);
        }
    }
}