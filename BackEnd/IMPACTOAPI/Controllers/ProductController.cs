using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Infra;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ConectionContext _context;

        public ProductController(ConectionContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<Product>> Get()
        {
            var products = _context.Products.ToList();
            return Ok(products);
        }
        
        [HttpGet("{id}")]
        public ActionResult<Product> GetById(int id)
        {
            var product = _context.Products.AsNoTracking().FirstOrDefault(p => p.Id == id);
            if (product == null)
                return NotFound("Produto não encontrado.");
            return Ok(product);
        }
        
        [HttpPost]
        public ActionResult<Product> Create(Product product)
        {
            if (product == null)
                return BadRequest("Produto inválido.");

            _context.Products.Add(product);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }
        
        [HttpPut("{id}")]
        public ActionResult Update(int id, Product product)
        {
            if (id != product.Id)
                return BadRequest("O ID fornecido não corresponde ao produto.");

            var existingProduct = _context.Products.Find(id);
            if (existingProduct == null)
                return NotFound("Produto não encontrado.");

            // Atualiza as propriedades do produto
            existingProduct.Name = product.Name;
            existingProduct.Description = product.Description;
            existingProduct.Price = product.Price;

            _context.SaveChanges();
            return NoContent();
        }

        // DELETE: api/product/{id}
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
                return NotFound("Produto não encontrado.");

            _context.Products.Remove(product);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
