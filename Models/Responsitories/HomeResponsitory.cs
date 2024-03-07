
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Project.Models;

public class HomeResponsitory : IHomeResponsitory
{
    private readonly DatabaseContext _context;
    public HomeResponsitory(DatabaseContext context)
    {
        _context = context;
    }
    public IEnumerable<Product> GetProducts() {
        return _context.Products.FromSqlRaw("EXEC sp_SelectProducts").ToList();
    }
    public IEnumerable<Category> GetCategories() { 
        return _context.Categories.FromSqlRaw("EXEC sp_SelectCategories").ToList();
    }

    public IEnumerable<Product> DisplayProductsPagination(int pageSize, int pageNumber)
    {
        SqlParameter pageSizeParam = new SqlParameter("@PageSize", pageSize);
        SqlParameter pageNumberParam = new SqlParameter("@PageNumber", pageNumber);
        return _context.Products.FromSqlRaw("EXEC sp_PaginationProducts @PageSize, @PageNumber", pageSizeParam, pageNumberParam);
    }
}
