using Backend.Models;

namespace Backend.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllEmployees();
        Task<Employee> GetEmployeeById(int id);
        Task AddEmployee(Employee employee);
        Task UpdateEmployee(Employee employee);
        Task DeleteEmployee(int id);
        Task<Employee> GetEmployeeByEmail(string email);
    }
}
