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
using WebShop3.Common;
using System.Web;

namespace WebShop3.API.Controllers
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
                                ImageHandler imageHandler = new ImageHandler();
                                extension = imageHandler.GetExtension(content.Headers.ContentType.MediaType);
                                ImageFormat format = imageHandler.GetImageFormat(content.Headers.ContentType.MediaType);
                                Image image = Image.FromStream(stream);
                                var name = content.Headers.ContentDisposition.Name;
                                string filepath = HostingEnvironment.MapPath("~/images");
                                string fullpath = Path.Combine(filepath, filename + extension);
                                //using (Bitmap bitmap = new Bitmap(image))
                                //{
                                //bitmap.Save(fullpath, format);
                                //}
                                imageHandler.SaveImage(image, format, fullpath);
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

        [HttpPost]
        [ActionName("UploadImage")]
        public HttpResponseMessage UploadImage()
        {
            var httpRequest = HttpContext.Current.Request;

            //HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);
            var file = httpRequest.Files[0];

            if(file != null && file.ContentLength > 0)
            {
                IList<string> allowedExtensions = new List<string> { ".jpg", ".png" };
                string extension = file.FileName.Substring(file.FileName.LastIndexOf(".")).ToLower();
                if(!allowedExtensions.Contains(extension))
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }
                else
                {
                    string fullpath = HttpContext.Current.Server.MapPath("~/images/" + file.FileName);
                    file.SaveAs(fullpath);

                    return Request.CreateResponse(HttpStatusCode.Created, file.FileName);
                }
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        
    }
}
