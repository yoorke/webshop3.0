using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace WebShop3.BusinessLogic
{
    public class Common
    {
        public string GetFriendlyString(string value)
        {
            value = value.ToLower();
            string[] input = new string[] { "š", "ć", "č", "ž", "đ" };
            string[] replace = new string[] { "s", "c", "c", "z", "dj" };

            for (int i = 0; i < input.Length; i++)
                value.Replace(input[i], replace[i]);

            Regex regex = new Regex("[^a-z0-9]+/g");
            regex.Replace(value, "-");
            regex = new Regex("^-+|-+$/g");
            regex.Replace(value, "-");
            regex = new Regex("^-+|-+$/g");
            regex.Replace(value, string.Empty);

            return value;
        }
    }
}
