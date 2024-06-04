using Employee_Ajax_JQuery.Context;
using Employee_Ajax_JQuery.Entity;
using Employee_Ajax_JQuery.Migrations;
using Microsoft.AspNetCore.Mvc;

namespace Employee_Ajax_JQuery.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly EmployeeDBContext _dbContext;
        public EmployeeController(EmployeeDBContext context)
        {
            this._dbContext = context;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult EmployeeList()
        {
            var EmployeesList = _dbContext.Employees.ToList();
            return new JsonResult(EmployeesList);
        }
        [HttpPost]
        public JsonResult AddEmployee(EmployeeEntity employee)
        {
            var emp = new EmployeeEntity()
            {
                EmployeeName = employee.EmployeeName,
                City = employee.City,
                State = employee.State,
                Salary = employee.Salary,
            };
            _dbContext.Employees.Add(emp);
            _dbContext.SaveChanges();
            return new JsonResult("Data is Saved");
        }

        public JsonResult Delete(int id)
        {
            var data = _dbContext.Employees.Where(e => e.EmployeeId==id).SingleOrDefault();
            _dbContext.Remove(data);
            _dbContext.SaveChanges();
            return new JsonResult("Data Deleted!");
        }

        [HttpGet]
        public JsonResult Edit(int id)
        {
            var data = _dbContext.Employees.Where(e => e.EmployeeId == id).SingleOrDefault();
            return new JsonResult(data);
        }
        [HttpPost]
        public JsonResult Update(EmployeeEntity employee)
        {
            _dbContext.Employees.Update(employee);
            _dbContext.SaveChanges();
            return new JsonResult("Record Updated successfully");
        }
    }
}
