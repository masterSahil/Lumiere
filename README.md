# Lumière Dining - Full Stack Restaurant Platform

Welcome to the **Lumière Dining** repository. This is a premium, full-stack web application designed for high-end restaurants, offering a seamless customer experience and a robust administrative backend. 

## 🚀 Features & Functionality

### Customer Facing (Front-End)
- **Dynamic Theming:** The platform's color palette (Primary Colors, Accent Glows, Surface Backdrops) updates dynamically via CSS variables based on the admin's branding configurations.
- **Menu & Cart:** Browse the culinary offerings with high-quality images. Add items to a persistent shopping cart with quantity controls.
- **Reservations:** Customers can book a table for future dates with dynamic form validation.
- **Checkout & Payments:** Secure payment gateway integration (Razorpay) capable of handling orders.
- **Customer Dashboard:** Registered users can track their active/past orders (with a live progress tracker) and manage their upcoming reservations.

### Administrative Backend
- **Live Order Management:** Real-time polling for new incoming orders, allowing staff to update statuses (`Pending` -> `Preparing` -> `Out for Delivery` -> `Delivered`).
- **Reservation Management:** Staff can confirm, complete, or reject table reservations.
- **Menu Management (CRUD):** Admins can add, edit, or remove dishes, marking them as Available or Sold Out.
- **Customer Management:** View all registered users and toggle their account status (Active/Inactive) to manage platform access.
- **Branding Management:** A live-preview configuration page allowing admins to update the global theme, wordmarks, and social links instantly.

---

## 🔒 Authentication & Role-Based Access Control (RBAC)

Authentication is handled securely using **JWT (JSON Web Tokens)** stored in HTTP-only cookies, combined with robust middleware for route protection.

The platform relies on three distinct user roles:
1. **Customer (`customer`):** The default role. Can browse the menu, book reservations, place orders, and view their personal dashboard.
2. **Admin (`admin`):** Staff members. Can access the `/admin/*` routes to manage orders, reservations, the menu, and view customers.
3. **Superadmin (`superadmin`):** Executive control. Inherits all Admin capabilities but also has exclusive rights to modify system configurations, global branding (`/admin/branding`), and edit employee/staff access (Settings).

### Security Measures:
- **Middleware Guarding:** `middleware.ts` intercepts requests. If a user tries to access `/admin/*` without an `admin` or `superadmin` role encoded in their JWT, they are intercepted and redirected.
- **API Guarding:** Critical API routes (like `/api/checkout` or `/api/branding`) verify the JWT server-side before executing database queries. It also checks if the user's `isActive` flag has been revoked by an admin, throwing a `403 Forbidden` if they are deactivated.

---

## 🛠️ Technical Stack & Architecture

- **Framework:** [Next.js (App Router)](https://nextjs.org/) - React framework for server-side rendering and static generation.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework (heavily utilizing `@theme` and CSS variables for the dynamic branding system).
- **Database:** [MongoDB](https://www.mongodb.com/) via Mongoose - NoSQL database for flexible data modeling (Orders, Users, Menu Items, Branding).
- **Payment Gateway:** [Razorpay](https://razorpay.com/) - Integrated for secure checkout. (Note: Fallback mocks are enabled in dev mode if keys are absent).
- **Icons & UI:** `lucide-react`, `react-icons`, `framer-motion` (for animations), and `sonner` (for toast notifications).

### Key Project Structure

```text
restro/
├── app/
│   ├── (customer)/        # Public and customer-facing routes (Dashboard, Orders, Reservations)
│   ├── admin/             # Secure administrative panel routes
│   ├── api/               # Next.js API Routes (Backend Controllers)
│   ├── login/ & signup/   # Authentication flows
│   ├── globals.css        # Global styles & glassmorphism utilities
│   └── layout.tsx         # Root layout wrapping the App in Context Providers (Cart, Branding)
├── component/             # Reusable UI components
│   ├── Home/              # Landing page sections (Hero, Promo, Stats, Sidebar)
│   └── BrandingProvider   # Context provider that fetches and injects dynamic CSS theme variables
├── libs/                  # Utility functions (DB connection, JWT auth verification, API error handlers)
└── model/                 # Mongoose Database Schemas (User, Order, Menu, Branding, Reservation)
```

## ⚙️ Setup & Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/restro
   JWT_SECRET=your_super_secret_jwt_key
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```
   *(Note: If Razorpay keys are omitted or set to `rzp_test_dummykey`, the checkout API will automatically mock successful transactions for local development).*

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Access the platform at `http://localhost:3000`.
