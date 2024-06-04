using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Employee_Ajax_JQuery.Entity
{
    public class EmployeeEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EmployeeId { get; set; }
        [Required(ErrorMessage ="Name can't be blank.")]
        public string EmployeeName { get; set; }
        [Required(ErrorMessage = "City can't be blank.")]
        public string City { get; set; }
        [Required(ErrorMessage = "State can't be blank.")]
        public string State { get; set; }
        [Required(ErrorMessage = "Salary can't be blank.")]
        public double Salary { get; set; }

    }
}
