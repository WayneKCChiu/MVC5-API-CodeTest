namespace App.Entity
{
   public class EntityFactory
   {
      public static CompanyEntities DbContext {
         get {
            return new CompanyEntities();
         }
      }
   }
}