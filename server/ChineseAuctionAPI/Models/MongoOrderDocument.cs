// MongoOrderDocument.cs - מודל מסמך MongoDB להזמנות
// קובץ זה מגדיר את מבנה המסמך ב-MongoDB עבור הזמנות
// במקום טבלאות מקושרות ב-SQL, כאן יש מסמך אחד עם מערכים משובצים
// של מתנות וחבילות. זה מאפשר שאילתות מהירות יותר ומודל נתונים גמיש יותר

using MongoDB.Bson.Serialization.Attributes;

namespace ChineseAuctionAPI.Models
{
    public class MongoOrderDocument
    {
        [BsonId]
        public int IdOrder { get; set; }
        public int IdUser { get; set; }
        public DateTime OrderDate { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Draft;
        public int Price { get; set; }
        public List<MongoOrderGift> OrdersGift { get; set; } = new();
        public List<MongoOrderPackage> OrdersPackage { get; set; } = new();
    }

    public class MongoOrderGift
    {
        public int IdOrdersGift { get; set; }
        public int IdGift { get; set; }
        public int Amount { get; set; }
    }

    public class MongoOrderPackage
    {
        public int IdPackageOrder { get; set; }
        public int IdPackage { get; set; }
        public int Quantity { get; set; }
        public int PriceAtPurchase { get; set; }
    }
}
