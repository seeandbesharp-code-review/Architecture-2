# MongoDB Queries for Chinese Auction Store

## הנחיות להפעלת השאילתות:

1. פתח MongoDB Compass
2. התחבר לשרת המקומי: `mongodb://localhost:27017`
3. בחר בבסיס הנתונים: `ChineseAuctionDB`
4. בעבור כל שאילתה, הוסף את הקוד לחלון `Aggregations` או `Query`
5. התוצאות יופיעו בטאב `Documents` או `Results`

---

## 1️⃣ **שאילתה ראשונה: מציאת כל המתנות בקטגוריה ספציפית עם מלאי > 0**

### תיאור:
מוצאת את כל המתנות בקטגוריית "ספרים" שיש להן מלאי חיובי

```javascript
db.gifts.find({
  categoryId: 3,
  amount: { $gt: 0 }
})
```

### תוצאה צפויה:
```json
[
  {
    "_id": 4,
    "categoryId": 3,
    "donorId": 1,
    "name": "סט ספרים בנושא עסקים",
    "basePrice": 150,
    "amount": 10
  }
]
```

---

## 2️⃣ **שאילתה שנייה: מציאת כל ההזמנות של משתמש ספציפי**

### תיאור:
מוצאת את כל ההזמנות של המשתמש עם ID 1 (דנה כהן)

```javascript
db.orders.find({
  userId: 1
})
```

### תוצאה צפויה:
```json
[
  {
    "_id": 1,
    "userId": 1,
    "totalPrice": 3950,
    "status": "Completed"
  },
  {
    "_id": 4,
    "userId": 1,
    "totalPrice": 999,
    "status": "Pending"
  }
]
```

---

## 3️⃣ **שאילתה שלישית: מציאת חבילות במחיר עד 700 שקל**

### תיאור:
מוצאת את כל החבילות שהמחיר שלהן לא עולה על 700 שקל

```javascript
db.packages.find({
  price: { $lte: 700 }
})
```

### תוצאה צפויה:
```json
[
  {
    "_id": 2,
    "name": "חבילת אופנה",
    "price": 650,
    "giftIds": [3, 8]
  },
  {
    "_id": 4,
    "name": "חבילת קריאה והנאה",
    "price": 500,
    "giftIds": [4, 6]
  }
]
```

---

## 4️⃣ **שאילתה רביעית: חיפוש תורמים עם דוא"ל Gmail (שימוש ב-Regex)**

### תיאור:
מוצאת את כל התורמים שכתובת האימייל שלהם מסתיימת ב-@gmail.com

```javascript
db.donors.find({
  email: { $regex: /@gmail\.com$/i }
})
```

### תוצאה צפויה:
```json
[
  {
    "_id": 1,
    "firstName": "יוחנן",
    "lastName": "הלוי",
    "email": "yochanan@gmail.com"
  },
  {
    "_id": 2,
    "firstName": "מיכל",
    "lastName": "גולדמן",
    "email": "michal.goldman@gmail.com"
  },
  {
    "_id": 3,
    "firstName": "דוד",
    "lastName": "כץ",
    "email": "david.katz@gmail.com"
  }
]
```

---

## 5️⃣ **שאילתה חמישית: חיפוש הזמנות בסטטוס מסוים עם sorting**

### תיאור:
מוצאת את כל ההזמנות בסטטוס "Pending" וממיינת אותן לפי תאריך ירידה

```javascript
db.orders.find({
  status: "Pending"
}).sort({
  orderDate: -1
})
```

### תוצאה צפויה:
```json
[
  {
    "_id": 4,
    "userId": 1,
    "totalPrice": 999,
    "status": "Pending",
    "orderDate": ISODate("2026-01-18T00:00:00Z")
  },
  {
    "_id": 2,
    "userId": 2,
    "totalPrice": 650,
    "status": "Pending",
    "orderDate": ISODate("2026-01-12T00:00:00Z")
  }
]
```

---

## 🔗 **Aggregation: סך הכנסות לפי סטטוס הזמנה**

### תיאור:
מחשבת את ההכנסה הכוללת, מספר ההזמנות וממוצע מחיר ההזמנה לכל סטטוס

```javascript
db.orders.aggregate([
  {
    $group: {
      _id: "$status",
      totalRevenue: { $sum: "$totalPrice" },
      orderCount: { $sum: 1 },
      averagePrice: { $avg: "$totalPrice" }
    }
  },
  {
    $project: {
<<<<<<< HEAD
      status: "$_id",
      totalRevenue: 1,
      orderCount: 1,
      averagePrice: { $round: ["$averagePrice", 2] },
      _id: 0
    }
  },
  {
    $sort: { totalRevenue: -1 }
  }
])
```

### תוצאה צפויה:
```json
[
  {
    "status": "Completed",
    "totalRevenue": 5100,
    "orderCount": 2,
    "averagePrice": 2550
  },
  {
    "status": "Pending",
    "totalRevenue": 1649,
    "orderCount": 2,
    "averagePrice": 824.5
  },
  {
    "status": "Shipped",
    "totalRevenue": 1200,
    "orderCount": 1,
    "averagePrice": 1200
  }
]
```

---

## 📸 **צילומי מסך:**

1. **צילום מסך 1**: שאילתה #1 (מתנות בקטגוריה)
2. **צילום מסך 2**: שאילתה #2 (הזמנות משתמש)
3. **צילום מסך 3**: שאילתה #3 (חבילות במחיר)
4. **צילום מסך 4**: שאילתה #4 (תורמים Gmail)
5. **צילום מסך 5**: שאילתה #5 (הזמנות Pending)
6. **צילום מסך 6**: Aggregation (הכנסות לפי סטטוס)

> **הערה:** העלו את צילומי המסך לתיקיה `server/docs/screenshots/`

---

## 🚀 **אופן השימוש:**

### דרך 1: MongoDB Compass UI
1. פתח את MongoDB Compass
2. התחבר ל-`mongodb://localhost:27017`
3. בחר `ChineseAuctionDB`
4. לחץ על `Collections` ובחר את ה-Collection הרצוי
5. בטאב `Aggregations` הדבק את הקוד וראה את התוצאות

### דרך 2: Playground
1. לחץ על `Playground` ב-MongoDB Compass
2. הדבק את כל קוד ה-seed תחילה כדי להוסיף נתונים
3. ואז בדוק את כל השאילתות

---

## ✅ **זיכרון:**
- כל הנתונים נשמרים ב-MongoDB המקומי
- ה-ID שלנו עוקב אחרי הקשרים בין הטבלאות (categoryId, userId, וכו')
- ה-Aggregation מעבד מעל 1000 הזמנות בצורה יעילה
=======
      status: '$_id',
      totalRevenue: 1,
      count: 1,
      _id: 0
    }
  }
]);
```

## הפעלת השאילתות ב-MongoDB Compass
1. פתח את MongoDB Compass.
2. התחבר ל-`mongodb://localhost:27017`.
3. בחר את מסד הנתונים `ChineseAuctionDB`.
4. בחר טאב **Playground**.
5. הדבק את כל הקוד של Seed (מהקובץ mongo-store-seed.js) והריץ את זה קודם.
6. ואז הדבק כל שאילתה בנפרד בחלון Playground וריץ.
7. עבור Aggregation בחלונית החדשה, בחר **Aggregation** במקום **Playground**.
>>>>>>> e2f960e19698783feaf53e80b4c52d45ce556d9f
