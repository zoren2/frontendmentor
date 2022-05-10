using Microsoft.EntityFrameworkCore;
using InvoiceApp;

namespace InvoiceApp.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        public DbSet<Client>? Client { get; set; }
        public DbSet<Invoice>? Invoice { get; set; }
        public DbSet<PaymentTerms>? PaymentTerms { get; set; }
        public DbSet<Sender>? Sender { get; set; }
        public DbSet<Status>? Status { get; set; }
        //public DbSet<Address>? Address { get; set; }
        public DbSet<Item>? Item { get; set; }

    }
}
