using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceApp
{
    public class Invoice
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid Id { get; set; }

        public string Status { get; set; }

        public string PaymentTerms { get; set; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{MM/dd/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime DateDue { get; set; }

        public double TotalDue { get; set; } = 0.00;

        /*
         * Relationships
         */

        // Invoice has One Client and One Sender
        public Client Client { get; set; }

        public Sender Sender { get; set; }
    }
}
