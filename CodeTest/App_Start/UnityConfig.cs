using System.Web.Http;
using System.Web.Mvc;
using Execute.IService;
using Execute.Services;
using Unity;

namespace CodeTest
{
   public static class UnityConfig
   {
      public static void RegisterComponents() {
         var container = new UnityContainer();

         container.RegisterType<IEmployeeApi, EmployeeApi>();
         container.RegisterType<ITaskApi, TaskApi>();

         DependencyResolver.SetResolver(new Unity.Mvc5.UnityDependencyResolver(container));
         GlobalConfiguration.Configuration.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);
      }
   }
}