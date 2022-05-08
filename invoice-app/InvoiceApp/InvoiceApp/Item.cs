using System.ComponentModel.DataAnnotations.Schema;

namespace InvoiceApp
{
    public class Item
    {
        public int ItemId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Quantity { get; set; } = 0;
        public double Price { get; set; } = 0;
        public double TotalPrice { get; set; } = 0;
    }
}
