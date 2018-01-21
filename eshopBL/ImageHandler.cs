using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing.Imaging;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Web;
using System.Web.Hosting;

namespace WebShop3.BusinessLogic
{
    public class ImageHandler : IImageHandler
    {
        public string SaveImage(HttpPostedFile file, string path, string[] allowedExtensions)
        {
            checkFile(file, allowedExtensions);
            
            string filename = new Common().GetFriendlyString(file.FileName);

            file.SaveAs(HttpContext.Current.Server.MapPath("~/images/" + path + filename));            

            return filename;
            
            //using (Bitmap bitmap = new Bitmap(image))
            //{
                //bitmap.Save(path, format);
            //}
        }

        public string SaveImage(HttpPostedFile file, int width, int height, string path, string sufix, string[] allowedExtensions)
        {
            checkFile(file, allowedExtensions);

            Image image = Image.FromStream(file.InputStream);
            Image thumb = createThumb(image, width, height);

            string filename = new Common().GetFriendlyString(file.FileName);
            thumb.Save(HostingEnvironment.MapPath("~/images/" + path + filename), ImageFormat.Jpeg);
            //string extenstion = path.Substring(path.LastIndexOf('.'));
            //string imageName = path.Substring(0, path.LastIndexOf('.'));

            //Image thumb = createThumb(image, width, height);
            //thumb.Save(imageName + "-" + (sufix != string.Empty ? "-" + sufix : string.Empty) + extenstion);

            return filename;
        }

        private void checkFile(HttpPostedFile file, string[] allowedExtensions)
        {
            if (file.ContentLength <= 0)
                throw new Exception("File size can not be 0");

            if (!allowedExtensions.Contains(file.FileName.Substring(file.FileName.LastIndexOf('.'))))
                throw new Exception("Bad file extension");            
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

        public string ParseExtension(string filename)
        {
            return filename.Substring(filename.LastIndexOf("."));
        }

    }
}
