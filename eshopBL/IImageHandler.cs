using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using System.Drawing.Imaging;
using System.Web;

namespace WebShop3.BusinessLogic
{
    public interface IImageHandler
    {
        string SaveImage(HttpPostedFile file, string path, string[] allowedExtensions);
        string SaveImage(HttpPostedFile file, int width, int height, string path, string sufix, string[] allowedExtensions);
        string GetExtension(string type);
        ImageFormat GetImageFormat(string type);
        string ParseExtension(string filename);
    }
}
