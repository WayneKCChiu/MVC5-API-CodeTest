//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace App.Entity
{
    using System;
    using System.Collections.Generic;
    
    public partial class Employee
    {
        public int EmpID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public System.DateTime HiredDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}
