using System.ComponentModel.DataAnnotations.Schema;

namespace InvoiceApp
{
    public class Item
    {
        public int Id { get; set; }
        [ForeignKey("Client")]
        public int ClientId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Quantity { get; set; } = 0;
        public double Price { get; set; } = 0;
        public double TotalPrice { get; set; } = 0;


    }
}
