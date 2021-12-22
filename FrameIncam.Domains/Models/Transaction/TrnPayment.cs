using FrameIncam.Domains.Repositories.Transaction;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;


namespace FrameIncam.Domains.Models.Transaction
{
    [Table("trn_payments")]
    public class TrnPayment : LogModel
    {
            [Column("receipt_id")]
            public string ReceiptId { get; set; }
            [Column("order_id")]
            public string OrderId { get; set; }
            [Column("payment_id")]
            public string PaymentId { get; set; }
            [Column("status")]
            public string Status { get; set; }
            [Column("response")]
            public string Response { get; set; }
    }
}