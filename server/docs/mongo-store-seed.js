// MongoDB Seed Script for Chinese Auction Store
// Run this in MongoDB Compass Playground or mongosh

const db = db.getSiblingDB('ChineseAuctionDB');

// ===== Drop existing collections =====
const collections = ['users', 'donors', 'giftCategories', 'gifts', 'packages', 'orders', 'cards', 'orderGifts'];
collections.forEach(name => {
  if (db.getCollectionNames().includes(name)) {
    db.getCollection(name).drop();
  }
});

// ===== Users Collection =====
db.users.insertMany([
  {
    _id: 1,
    identity: '123456789',
    firstName: 'דנה',
    lastName: 'כהן',
    email: 'dana.cohen@example.com',
    phoneNumber: '+972501234567',
    city: 'תל אביב',
    address: 'רחוב רבי עקיבא 10',
    role: 'Admin',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01')
  },
  {
    _id: 2,
    identity: '987654321',
    firstName: 'אלי',
    lastName: 'לוי',
    email: 'eli.levi@example.com',
    phoneNumber: '+972522345678',
    city: 'ירושלים',
    address: 'רחוב ביאליק 15',
    role: 'User',
    createdAt: new Date('2026-01-05'),
    updatedAt: new Date('2026-01-05')
  },
  {
    _id: 3,
    identity: '555666777',
    firstName: 'שרה',
    lastName: 'ישראלי',
    email: 'sarah.israeli@example.com',
    phoneNumber: '+972533456789',
    city: 'חיפה',
    address: 'רחוב הרצל 20',
    role: 'User',
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-10')
  }
]);

// ===== Donors Collection =====
db.donors.insertMany([
  {
    _id: 1,
    identity: '111222333',
    firstName: 'יוחנן',
    lastName: 'הלוי',
    email: 'yochanan@gmail.com',
    phoneNumber: '+972501111111',
    city: 'תל אביב',
    address: 'רחוב בן גוריון 5',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01')
  },
  {
    _id: 2,
    identity: '444555666',
    firstName: 'מיכל',
    lastName: 'גולדמן',
    email: 'michal.goldman@gmail.com',
    phoneNumber: '+972502222222',
    city: 'ראמת גן',
    address: 'רחוב שרונה 12',
    createdAt: new Date('2026-01-03'),
    updatedAt: new Date('2026-01-03')
  },
  {
    _id: 3,
    identity: '777888999',
    firstName: 'דוד',
    lastName: 'כץ',
    email: 'david.katz@gmail.com',
    phoneNumber: '+972503333333',
    city: 'פתח תקווה',
    address: 'רחוב ירמיהו 8',
    createdAt: new Date('2026-01-07'),
    updatedAt: new Date('2026-01-07')
  },
  {
    _id: 4,
    identity: '101112131',
    firstName: 'רחל',
    lastName: 'שחר',
    email: 'rachel.shahar@yahoo.com',
    phoneNumber: '+972504444444',
    city: 'בני ברק',
    address: 'רחוב סוקולוב 3',
    createdAt: new Date('2026-01-12'),
    updatedAt: new Date('2026-01-12')
  }
]);

// ===== Gift Categories Collection =====
db.giftCategories.insertMany([
  {
    _id: 1,
    name: 'אלקטרוניקה',
    description: 'מכשירים אלקטרוניים וטכנולוגיה',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01')
  },
  {
    _id: 2,
    name: 'בגדים',
    description: 'ביגוד וגימורים',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01')
  },
  {
    _id: 3,
    name: 'ספרים',
    description: 'ספרים וחומרי קריאה',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01')
  },
  {
    _id: 4,
    name: 'תכשיטים',
    description: 'תכשיטים וכלים יפים',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01')
  },
  {
    _id: 5,
    name: 'שונות',
    description: 'מתנות שונות ומגוונות',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01')
  }
]);

// ===== Gifts Collection =====
db.gifts.insertMany([
  {
    _id: 1,
    categoryId: 1,
    donorId: 1,
    name: 'מחשב נייד HP',
    description: 'מחשב נייד HP עם מעבד i7',
    basePrice: 3500,
    amount: 2,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01')
  },
  {
    _id: 2,
    categoryId: 1,
    donorId: 2,
    name: 'טאבלט Samsung',
    description: 'טאבלט Samsung Galaxy Tab S8',
    basePrice: 1200,
    amount: 1,
    createdAt: new Date('2026-01-02'),
    updatedAt: new Date('2026-01-02')
  },
  {
    _id: 3,
    categoryId: 2,
    donorId: 3,
    name: 'חליפה זכרים',
    description: 'חליפה זכרים מעוצבת',
    basePrice: 450,
    amount: 5,
    createdAt: new Date('2026-01-03'),
    updatedAt: new Date('2026-01-03')
  },
  {
    _id: 4,
    categoryId: 3,
    donorId: 1,
    name: 'סט ספרים בנושא עסקים',
    description: 'סט 3 ספרים במנהל עסקים',
    basePrice: 150,
    amount: 10,
    createdAt: new Date('2026-01-04'),
    updatedAt: new Date('2026-01-04')
  },
  {
    _id: 5,
    categoryId: 4,
    donorId: 4,
    name: 'שרשרת זהב',
    description: 'שרשרת זהב עם תליון',
    basePrice: 800,
    amount: 1,
    createdAt: new Date('2026-01-05'),
    updatedAt: new Date('2026-01-05')
  },
  {
    _id: 6,
    categoryId: 1,
    donorId: 2,
    name: 'אוזניות Bose',
    description: 'אוזניות Bose QuietComfort',
    basePrice: 350,
    amount: 3,
    createdAt: new Date('2026-01-06'),
    updatedAt: new Date('2026-01-06')
  },
  {
    _id: 7,
    categoryId: 5,
    donorId: 3,
    name: 'שעון יד עור',
    description: 'שעון יד עם רצועת עור',
    basePrice: 200,
    amount: 4,
    createdAt: new Date('2026-01-07'),
    updatedAt: new Date('2026-01-07')
  },
  {
    _id: 8,
    categoryId: 2,
    donorId: 4,
    name: 'נעליים ספורטיביות',
    description: 'נעליים ספורטיביות Nike',
    basePrice: 250,
    amount: 6,
    createdAt: new Date('2026-01-08'),
    updatedAt: new Date('2026-01-08')
  }
]);

// ===== Packages Collection =====
db.packages.insertMany([
  {
    _id: 1,
    name: 'חבילת טכנולוגיה',
    description: 'חבילה עם מוצרי טכנולוגיה',
    price: 3800,
    giftIds: [1, 2],
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01')
  },
  {
    _id: 2,
    name: 'חבילת אופנה',
    description: 'חבילה עם ביגוד ונעליים',
    price: 650,
    giftIds: [3, 8],
    createdAt: new Date('2026-01-02'),
    updatedAt: new Date('2026-01-02')
  },
  {
    _id: 3,
    name: 'חבילת יוקרה',
    description: 'חבילה עם תכשיטים ושעון',
    price: 999,
    giftIds: [5, 7],
    createdAt: new Date('2026-01-03'),
    updatedAt: new Date('2026-01-03')
  },
  {
    _id: 4,
    name: 'חבילת קריאה והנאה',
    description: 'ספרים עם אוזניות',
    price: 500,
    giftIds: [4, 6],
    createdAt: new Date('2026-01-04'),
    updatedAt: new Date('2026-01-04')
  }
]);

// ===== Orders Collection =====
db.orders.insertMany([
  {
    _id: 1,
    userId: 1,
    orderItems: [
      { giftId: 1, quantity: 1, price: 3500 },
      { giftId: 3, quantity: 1, price: 450 }
    ],
    totalPrice: 3950,
    status: 'Completed',
    orderDate: new Date('2026-01-10'),
    completedDate: new Date('2026-01-15'),
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-15')
  },
  {
    _id: 2,
    userId: 2,
    orderItems: [
      { packageId: 2, quantity: 1, price: 650 }
    ],
    totalPrice: 650,
    status: 'Pending',
    orderDate: new Date('2026-01-12'),
    createdAt: new Date('2026-01-12'),
    updatedAt: new Date('2026-01-12')
  },
  {
    _id: 3,
    userId: 3,
    orderItems: [
      { giftId: 5, quantity: 1, price: 800 },
      { giftId: 6, quantity: 1, price: 350 }
    ],
    totalPrice: 1150,
    status: 'Completed',
    orderDate: new Date('2026-01-08'),
    completedDate: new Date('2026-01-11'),
    createdAt: new Date('2026-01-08'),
    updatedAt: new Date('2026-01-11')
  },
  {
    _id: 4,
    userId: 1,
    orderItems: [
      { packageId: 3, quantity: 1, price: 999 }
    ],
    totalPrice: 999,
    status: 'Pending',
    orderDate: new Date('2026-01-18'),
    createdAt: new Date('2026-01-18'),
    updatedAt: new Date('2026-01-18')
  },
  {
    _id: 5,
    userId: 2,
    orderItems: [
      { giftId: 2, quantity: 1, price: 1200 }
    ],
    totalPrice: 1200,
    status: 'Shipped',
    orderDate: new Date('2026-01-14'),
    shippedDate: new Date('2026-01-16'),
    createdAt: new Date('2026-01-14'),
    updatedAt: new Date('2026-01-16')
  }
]);

// ===== Cards Collection =====
db.cards.insertMany([
  {
    _id: 1,
    userId: 1,
    cardNumber: '4111111111111111',
    cardHolder: 'Dana Cohen',
    expirationMonth: 12,
    expirationYear: 2027,
    isDefault: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01')
  },
  {
    _id: 2,
    userId: 2,
    cardNumber: '5500005555555559',
    cardHolder: 'Eli Levi',
    expirationMonth: 6,
    expirationYear: 2028,
    isDefault: true,
    createdAt: new Date('2026-01-05'),
    updatedAt: new Date('2026-01-05')
  },
  {
    _id: 3,
    userId: 3,
    cardNumber: '378282246310005',
    cardHolder: 'Sarah Israeli',
    expirationMonth: 3,
    expirationYear: 2026,
    isDefault: true,
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-10')
  }
]);

console.log('✅ Database seeding completed successfully!');
console.log('📊 Collections created:');
console.log(`   - Users: ${db.users.countDocuments()} documents`);
console.log(`   - Donors: ${db.donors.countDocuments()} documents`);
console.log(`   - Gift Categories: ${db.giftCategories.countDocuments()} documents`);
console.log(`   - Gifts: ${db.gifts.countDocuments()} documents`);
console.log(`   - Packages: ${db.packages.countDocuments()} documents`);
console.log(`   - Orders: ${db.orders.countDocuments()} documents`);
console.log(`   - Cards: ${db.cards.countDocuments()} documents`);
