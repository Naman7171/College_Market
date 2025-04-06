
# CollegeMarket

> A simple and efficient College Marketplace web application for students to buy, sell, and exchange items within their campus community.

---

## Overview

CollegeMarket is a platform built to create a trusted marketplace exclusively for college students. It enables students to list items for sale, browse products, and connect with other students within the same campus.  

The primary goal is to simplify the buying and selling process inside a college ecosystem, focusing on safety, ease of use, and local availability.

---

## Features

- User Authentication (Signup/Login)
- Product Listings (Add, Edit, Delete Items)
- Search & Filter Products
- Responsive Design (Mobile Friendly)
- Clean & Minimal User Interface
- Easy Communication Between Buyers and Sellers

---

## Tech Stack

| Technology | Purpose        |
|------------|----------------|
| React.js   | Frontend UI    |
| Django     | Backend API    |
| SQLite     | Database       |
| TailwindCSS| Styling        |
| Vite       | React Dev Tool |
| REST API   | Data Handling  |

---

## Installation & Setup Instructions

### Clone the Repository
```bash
git clone https://github.com/your-username/CollegeMarket.git
cd CollegeMarket
```

### Backend Setup (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate   # or venv\Scripts\activate (Windows)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Setup (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

---

## Usage

1. Register or Login as a student.
2. Post your item for sale with price & description.
3. Browse products listed by other students.
4. Contact the seller and close the deal!

---

## Folder Structure
```
CollegeMarket/
│
├── backend/        # Django Backend
│   ├── manage.py
│   └── app/
│
├── frontend/       # React Frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Future Enhancements
- Chat System for Buyers & Sellers
- Admin Dashboard
- Product Categorization
- Notification System
- Payment Gateway Integration

---

## Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

Made with ❤️ by Naman Joshi  

