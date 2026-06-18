# הוראות צילום מסך - שאילתות MongoDB

## 📸 מדריך צילום מסך של שאילתות MongoDB Compass

עקוב אחרי ההנחיות כדי לצלם ולשמור צילומי מסך של כל שאילתה.

---

## שלב 1: הכנה

### התקן MongoDB Compass
1. ירד את MongoDB Compass מ: https://www.mongodb.com/try/download/compass
2. התקן את האפליקציה

### התחבר לשרת
1. פתח MongoDB Compass
2. בחלון ה-Connection String הכנס: `mongodb://localhost:27017`
3. לחץ על `Connect`

### בחר את בסיס הנתונים
1. בעמודה השמאלית, חפש את `ChineseAuctionDB`
2. אם לא קיים, תחילה הרץ את ה-Seed Script

---

## שלב 2: הרצת ה-Seed Script

1. לחץ על `+` ליד `Databases` בעמודה השמאלית
2. בחר `Create Database`
3. שם: `ChineseAuctionDB`
4. Collection: `_setup`
5. לחץ `Create`

### הוסף נתונים:
1. בעמודה השמאלית, בחר `ChineseAuctionDB`
2. לחץ על `+` ליד `Collections`
3. בטאב `Aggregations` הדבק את כל הקוד מ- `mongo-store-seed.js`
4. לחץ `Run`
5. בדוק שהנתונים נוצרו בהצלחה

---

## שלב 3: צילום כל שאילתה

### צילום מסך 1️⃣ - שאילתה #1 (מתנות בקטגוריה)

```javascript
db.gifts.find({
  categoryId: 3,
  amount: { $gt: 0 }
})
```

**צעדים:**
1. בטאב `Collections` בחר `gifts`
2. בטאב `Query` הדבק את הקוד
3. לחץ `Apply`
4. בטאב `Documents` תראה את התוצאות
5. **צלם מסך** (Print Screen / Ctrl+Shift+S)
6. **שם הקובץ**: `1_gifts_by_category.png`

---

### צילום מסך 2️⃣ - שאילתה #2 (הזמנות משתמש)

```javascript
db.orders.find({
  userId: 1
})
```

**צעדים:**
1. בחר `orders` collection
2. בטאב `Query` הדבק את הקוד
3. לחץ `Apply`
4. **צלם מסך**
5. **שם הקובץ**: `2_user_orders.png`

---

### צילום מסך 3️⃣ - שאילתה #3 (חבילות במחיר)

```javascript
db.packages.find({
  price: { $lte: 700 }
})
```

**צעדים:**
1. בחר `packages` collection
2. בטאב `Query` הדבק את הקוד
3. לחץ `Apply`
4. **צלם מסך**
5. **שם הקובץ**: `3_packages_by_price.png`

---

### צילום מסך 4️⃣ - שאילתה #4 (תורמים Gmail)

```javascript
db.donors.find({
  email: { $regex: /@gmail\.com$/i }
})
```

**צעדים:**
1. בחר `donors` collection
2. בטאב `Query` הדבק את הקוד
3. לחץ `Apply`
4. **צלם מסך**
5. **שם הקובץ**: `4_donors_gmail.png`

---

### צילום מסך 5️⃣ - שאילתה #5 (הזמנות Pending)

```javascript
db.orders.find({
  status: "Pending"
}).sort({
  orderDate: -1
})
```

**צעדים:**
1. בחר `orders` collection
2. בטאב `Query` הדבק את הקוד
3. לחץ `Apply`
4. **צלם מסך**
5. **שם הקובץ**: `5_pending_orders.png`

---

### צילום מסך 6️⃣ - Aggregation (הכנסות לפי סטטוס)

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

**צעדים:**
1. בחר `orders` collection
2. לחץ על `Aggregations`
3. הדבק את הקוד
4. לחץ `Run`
5. **צלם מסך**
6. **שם הקובץ**: `6_aggregation_revenue.png`

---

## שלב 4: שמירת הצילומים

### מיקום השמירה:
```
Archiakture/
└── server/
    └── docs/
        └── screenshots/
            ├── 1_gifts_by_category.png
            ├── 2_user_orders.png
            ├── 3_packages_by_price.png
            ├── 4_donors_gmail.png
            ├── 5_pending_orders.png
            └── 6_aggregation_revenue.png
```

### איך לשמור צילום מסך:

#### ווינדוז:
1. לחץ `Print Screen` או `Ctrl+Shift+S`
2. בחר את האזור שרוצה לצלם
3. צילום אוטומטי עובר ל-Clipboard
4. פתח Paint או תוכנת ערך תמונות
5. צמד (`Ctrl+V`)
6. שמור כ- PNG

#### Mac:
1. לחץ `Cmd+Shift+4`
2. בחר את האזור
3. צילום נשמר ל-Desktop
4. העבר לתיקיית `screenshots`

#### Linux:
1. השתמש ב-`gnome-screenshot` או `flameshot`
2. שמור כ- PNG

---

## ✅ רשימת בדיקה

- [ ] MongoDB Compass מותקן
- [ ] ChineseAuctionDB נוצר
- [ ] Seed script הרץ בהצלחה
- [ ] צילום מסך #1 - מתנות בקטגוריה
- [ ] צילום מסך #2 - הזמנות משתמש
- [ ] צילום מסך #3 - חבילות במחיר
- [ ] צילום מסך #4 - תורמים Gmail
- [ ] צילום מסך #5 - הזמנות Pending
- [ ] צילום מסך #6 - Aggregation
- [ ] כל הצילומים בתיקיית `screenshots`
- [ ] שמות הקבצים נכונים
- [ ] הצילומים בפורמט PNG

---

## 💡 טיפים שימושיים

### צפייה בתוצאות:
- לחץ על כל document כדי לראות את כל הפרטים
- השתמש בעמוד Down/Up כדי לגלול בין documents
- בטאב `Results` תראה סטטיסטיקות (מספר documents)

### עזרה בשאילתות:
- MongoDB Compass מספקת הדגמה עם שגיאה אם הקוד לא תקין
- שתמש בעזר עם Ctrl+Space כדי לראות שדות זמינים

### אם משהו לא עובד:
1. בדוק שמונגו דב ורץ (redis-cli ping)
2. בדוק שניתן להתחבר (Try Connection)
3. הרץ את הSeed script מחדש

---

## תוצאות צפויות

### שאילתה 1:
- מוצא 1 ספר בקטגוריה 3

### שאילתה 2:
- מוצא 2 הזמנות עבור משתמש 1

### שאילתה 3:
- מוצא 2 חבילות עם מחיר <= 700

### שאילתה 4:
- מוצא 3 תורמים עם דוא"ל Gmail

### שאילתה 5:
- מוצא 2 הזמנות בסטטוס Pending

### Aggregation:
- מוצא 3 קבוצות: Completed, Pending, Shipped
- עם סך הכנסות וממוצע מחיר לכל קבוצה

---

**סיום!** 🎉

לאחר שהושלם, הצילומים הם חלק מהדוח הסופי שלך!
