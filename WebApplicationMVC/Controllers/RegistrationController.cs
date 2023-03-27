using Microsoft.AspNetCore.Mvc;
using WebApplicationMVC.DataContext;
using WebApplicationMVC.Models;


namespace WebApplicationMVC.Controllers
{
    public class RegistrationController : Controller
    {

        private readonly ApplicationDbContext _context;

        public RegistrationController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetAllRegistration()
        {
          var data= _context.UserRegistrations.ToList();
            return new JsonResult(data);
        }
        [HttpPost]
        public JsonResult AddUserRegistration(UserRegistration userRegistration)
        {
            var Registration = new UserRegistration()
            {
                Name = userRegistration.Name,
                Email = userRegistration.Email,
                Phone = userRegistration.Phone,
                Address = userRegistration.Address,
                City = userRegistration.City,
                State = userRegistration.State,
            };
            _context.UserRegistrations.Add(Registration);
            _context.SaveChanges();
            return new JsonResult("Data is saved");
        }

        public JsonResult Delete(int id)
        {
            var data= _context.UserRegistrations.Where(x => x.Id == id).SingleOrDefault();
            _context.UserRegistrations.Remove(data);
            _context.SaveChanges();
            return new JsonResult("Data Deleted");
        }

        public JsonResult Edit(int id)
        {
            var data = _context.UserRegistrations.Where(x => x.Id == id).SingleOrDefault();
            return new JsonResult(data);
        }

        public JsonResult Update(UserRegistration userRegistration)
        {
            _context.UserRegistrations.Update(userRegistration);
            _context.SaveChanges();
            return new JsonResult("Record Update");
        }
    }
}
