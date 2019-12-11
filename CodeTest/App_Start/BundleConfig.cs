using System.Web.Optimization;

namespace CodeTest
{
   public class BundleConfig
   {
      // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
      public static void RegisterBundles(BundleCollection bundles) {
         bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                     "~/Scripts/jquery-{version}.js"));

         bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                     "~/Scripts/jquery.validate*"));

         // Use the development version of Modernizr to develop with and learn from. Then, when you're
         // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
         bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                     "~/Scripts/modernizr-*"));

         bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                   "~/Scripts/bootstrap.js"));

         bundles.Add(new StyleBundle("~/Content/css").Include(
                   "~/Content/bootstrap.css"));

         bundles.Add(new ScriptBundle("~/bundles/base").Include(
                   "~/Scripts/vue.js",
                   "~/Scripts/axios.js",
                   "~/Scripts/moment.js",
                   "~/Script/api.js"
                  ));

         bundles.Add(new ScriptBundle("~/bundles/home").Include(
                   "~/Script/api/api.employee.js",
                   "~/Script/app/home.js"
                  ));

         bundles.Add(new ScriptBundle("~/bundles/task").Include(
                  "~/Script/api/api.task.js",
                  "~/Script/app/task.js"
         ));

         bundles.Add(new StyleBundle("~/Style/css").Include(
                   "~/Style/home.css"));

         bundles.Add(new StyleBundle("~/Style/taskcss").Include(
                   "~/Style/task.css"));
      }
   }
}