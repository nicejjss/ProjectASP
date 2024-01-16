using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models;

namespace Project.Controllers
{
    public class UserController : Controller
    {
        private readonly DatabaseContext _databaseContext;
        private readonly ILogger<UserController> _logger;
        public UserController (DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        //public UserController(ILogger<UserController> logger)
        //{
        //    _logger = logger;
        //}

        public IActionResult Index()
        {
            var user = _databaseContext.User.ToList();
            return View(user);
        }

        [HttpPost]
        public async Task<IActionResult> Search(string name)
        {
            // Call the stored procedure
            var users = await _databaseContext.SearchUsersByNameAsync(name);
            //_logger.LogInformation(name);
            // Pass the results to the view
            return View("Index", users);
        }


    }
}
