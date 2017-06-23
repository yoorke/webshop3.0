using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using System.Drawing.Imaging;

namespace eshopBL
{
    public interface IImageHandler
    {
        void SaveImage(Image image, ImageFormat format, string path);
        void SaveThumb(Image image, ImageFormat format, int width, int height, string path, string sufix);
        string GetExtension(string type);
        ImageFormat GetImageFormat(string type);

    }
}
