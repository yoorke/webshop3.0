using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using System.IO;
using System.Drawing.Imaging;
using System.Drawing;
using System.Web.Hosting;
using Common;

namespace eshopAPI.Controllers
{
    public class CommonController : ApiController
    {
        [HttpPost]
        [ActionName("Upload")]
        public async Task<string> Upload()
        {
            if (Request.Content.IsMimeMultipartContent())
            {
                string filename = Guid.NewGuid().ToString();
                string extension = string.Empty;
                await Request.Content.ReadAsMultipartAsync<MultipartMemoryStreamProvider>(new MultipartMemoryStreamProvider()).ContinueWith(task =>
                {
                    MultipartMemoryStreamProvider provider = task.Result;
                    foreach (HttpContent content in provider.Contents)
                    {
                        using (Stream stream = content.ReadAsStreamAsync().Result)
                        {
                            if (content.Headers.ContentType.MediaType == "image/png" || content.Headers.ContentType.MediaType == "image/jpeg" || content.Headers.ContentType.MediaType == "image/svg")
                            {
                                extension = new ImageHandler().GetExtension(content.Headers.ContentType.MediaType);
                                ImageFormat format = new ImageHandler().GetImageFormat(content.Headers.ContentType.MediaType);
                                Image image = Image.FromStream(stream);
                                var name = content.Headers.ContentDisposition.Name;
                                string filepath = HostingEnvironment.MapPath("~/images");
                                string fullpath = Path.Combine(filepath, filename + extension);
                                using (Bitmap bitmap = new Bitmap(image))
                                {
                                    bitmap.Save(fullpath, format);
                                }
                            }
                            else
                                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.BadGateway));
                        }
                    }
                });
                return filename + extension;
            }
            else
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.BadGateway));
        }

        

        
    }
}
