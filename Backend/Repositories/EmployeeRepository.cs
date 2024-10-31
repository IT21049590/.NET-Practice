using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDbContext _context;

        public EmployeeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Employee>> GetAllEmployees() => await _context.Employees.Include(e => e.department).ToListAsync();

        public async Task<Employee> GetEmployeeById(int id) => await _context.Employees.Include(e => e.department).FirstOrDefaultAsync(e => e.employeeId == id);

        public async Task AddEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateEmployee(Employee employee)
        {
            _context.Entry(employee).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee != null)
            {
                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<Employee> GetEmployeeByEmail(string email)
        {
            return await _context.Employees.Include(e => e.department).FirstOrDefaultAsync(e => e.email == email);
        }
    }
}
