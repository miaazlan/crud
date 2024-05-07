using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI2.Models;

namespace WebAPI2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DEmployeesController : ControllerBase
    {
        private readonly EmployeeDBContext _context;

        public DEmployeesController(EmployeeDBContext context)
        {
            _context = context;
        }

        // GET: api/DEmployees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DEmployee>>> GetDEmployee()
        {
            return await _context.DEmployee.ToListAsync();
        }

        // GET: api/DEmployees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DEmployee>> GetDEmployee(int id)
        {
            var dEmployee = await _context.DEmployee.FindAsync(id);

            if (dEmployee == null)
            {
                return NotFound();
            }

            return dEmployee;
        }

        // PUT: api/DEmployees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDEmployee(int id, DEmployee dEmployee)
        {
            if (id != dEmployee.id)
            {
                return BadRequest();
            }

            _context.Entry(dEmployee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DEmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DEmployees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DEmployee>> PostDEmployee(DEmployee dEmployee)
        {
            _context.DEmployee.Add(dEmployee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDEmployee", new { id = dEmployee.id }, dEmployee);
        }

        // DELETE: api/DEmployees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDEmployee(int id)
        {
            var dEmployee = await _context.DEmployee.FindAsync(id);
            if (dEmployee == null)
            {
                return NotFound();
            }

            _context.DEmployee.Remove(dEmployee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DEmployeeExists(int id)
        {
            return _context.DEmployee.Any(e => e.id == id);
        }
    }
}
