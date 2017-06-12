using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing.Imaging;
using System.Drawing;

namespace Common
{
    public class ImageHandler
    {
        public void SaveImage(Image image, int width, int height, string path)
        {

        }

        public string GetExtension(string type)
        {
            switch (type)
            {
                case "image/png": return ".png";
                case "image/jpeg": return ".jpg";
                case "image/svg": return ".svg";
            }
            return string.Empty;
        }

        public ImageFormat GetImageFormat(string type)
        {
            switch (type)
            {
                case "image/png": return ImageFormat.Png;
                case "image/jpeg": return ImageFormat.Jpeg;
                case "image/svg": return ImageFormat.Icon;
            }
            return null;
        }

    }
}
