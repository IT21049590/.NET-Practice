namespace Backend.Models;

public class Employee
{
    public int employeeId { get; set; }
    public string firstName { get; set; }
    public string lastName { get; set; }
    public string email { get; set; }
    public DateTime dateOfBirth { get; set; }
    public int age { get; set; }
    public double salary { get; set; }
    public string departmentId { get; set; }
    public Department department { get; set; }
}