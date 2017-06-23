using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing.Imaging;
using System.Drawing;
using System.Drawing.Drawing2D;

namespace eshopBL
{
    public class ImageHandler : IImageHandler
    {
        public void SaveImage(Image image, ImageFormat format, string path)
        {
            using (Bitmap bitmap = new Bitmap(image))
            {
                bitmap.Save(path, format);
            }
        }

        public void SaveThumb(Image image, ImageFormat format, int width, int height, string path, string sufix)
        {
            string extenstion = path.Substring(path.LastIndexOf('.'));
            string imageName = path.Substring(0, path.LastIndexOf('.'));

            Image thumb = createThumb(image, width, height);
            thumb.Save(imageName + "-" + (sufix != string.Empty ? "-" + sufix : string.Empty) + extenstion);
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

        private Image createThumb(Image imgPhoto, int Width, int Height)
        {
            int sourceWidth = imgPhoto.Width;
            int sourceHeight = imgPhoto.Height;
            int sourceX = 0;
            int sourceY = 0;
            int destX = 0;
            int destY = 0;

            float nPercent = 0;
            float nPercentW = 0;
            float nPercentH = 0;

            nPercentW = ((float)Width / (float)sourceWidth);
            nPercentH = ((float)Height / (float)sourceHeight);
            if (nPercentH < nPercentW)
            {
                nPercent = nPercentH;
                destX = System.Convert.ToInt16((Width -
                              (sourceWidth * nPercent)) / 2);
            }
            else
            {
                nPercent = nPercentW;
                destY = System.Convert.ToInt16((Height -
                              (sourceHeight * nPercent)) / 2);
            }

            int destWidth = (int)(sourceWidth * nPercent);
            int destHeight = (int)(sourceHeight * nPercent);

            Bitmap bmPhoto = new Bitmap(Width, Height,
                              PixelFormat.Format24bppRgb);
            bmPhoto.SetResolution(imgPhoto.HorizontalResolution,
                             imgPhoto.VerticalResolution);

            Graphics grPhoto = Graphics.FromImage(bmPhoto);
            grPhoto.Clear(Color.White);
            grPhoto.InterpolationMode =
                    InterpolationMode.HighQualityBicubic;

            grPhoto.DrawImage(imgPhoto,
                new Rectangle(destX, destY, destWidth, destHeight),
                new Rectangle(sourceX, sourceY, sourceWidth, sourceHeight),
                GraphicsUnit.Pixel);

            grPhoto.Dispose();
            return bmPhoto;
        }

    }
}
