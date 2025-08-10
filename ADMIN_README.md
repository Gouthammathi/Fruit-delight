# Fruit Delight Admin Dashboard

A comprehensive admin dashboard for managing the logistics of the Fruit Delight business, built with React and Firebase.

## Features

### 🔐 Authentication
- Secure login system using Firebase Authentication
- Protected admin routes
- User session management

### 📊 Dashboard
- Overview of key business metrics
- Real-time statistics for customers, stock, employees, and orders
- Recent activity tracking
- Visual representation of business data

### 👥 Customer Management
- View all customers with detailed information
- Add new customers
- Edit existing customer details
- Delete customers
- Customer statistics and analytics
- Filter customers by status (active/inactive)

### 📦 Stock Management
- Track individual fruit inventory
- Monitor stock levels and costs
- Set minimum quantity thresholds
- Supplier information management
- Stock value calculations
- Low stock alerts

### 👨‍💼 Employee Management
- Employee profiles and contact information
- Track work days and salary information
- Department and position management
- Employee status tracking (active/inactive)
- Work history and performance metrics

### 🛒 Bulk Orders
- Create and manage bulk orders
- Customer order details and requirements
- Order status tracking (pending, processing, completed, cancelled)
- Print-friendly order invoices
- Delivery scheduling and tracking
- Revenue calculations

## Technical Stack

- **Frontend**: React 19, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Icons**: React Icons
- **Routing**: React Router DOM

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Firebase Configuration**
   - The Firebase configuration is already set up in the Admin.jsx file
   - Ensure your Firebase project has Firestore and Authentication enabled
   - Create the following collections in Firestore:
     - `customers`
     - `stock`
     - `employees`
     - `bulkOrders`

3. **Run the Application**
   ```bash
   npm run dev
   ```

4. **Access Admin Dashboard**
   - Navigate to `/admin` in your browser
   - Use your Firebase authentication credentials to log in

## Firebase Collections Structure

### Customers Collection
```javascript
{
  name: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  status: 'active' | 'inactive',
  createdAt: timestamp,
  avatar: string (optional)
}
```

### Stock Collection
```javascript
{
  name: string,
  category: string,
  quantity: number,
  minQuantity: number,
  costPerKg: number,
  supplier: string,
  image: string (optional),
  lastUpdated: timestamp
}
```

### Employees Collection
```javascript
{
  name: string,
  position: string,
  department: string,
  email: string,
  phone: string,
  salary: number,
  workDays: number,
  joinDate: timestamp,
  status: 'active' | 'inactive',
  avatar: string (optional)
}
```

### Bulk Orders Collection
```javascript
{
  customerName: string,
  customerPhone: string,
  customerEmail: string,
  deliveryAddress: string,
  orderDate: timestamp,
  deliveryDate: timestamp,
  items: array,
  totalAmount: number,
  deliveryCharge: number,
  specialInstructions: string,
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
}
```

## Usage Guide

### Adding New Records
1. Click the "Add" button in any section
2. Fill out the required form fields
3. Click "Save" to create the record

### Editing Records
1. Click the edit icon (pencil) next to any record
2. Modify the information in the form
3. Click "Update" to save changes

### Deleting Records
1. Click the delete icon (trash) next to any record
2. Confirm the deletion in the popup dialog

### Printing Orders
1. In the Bulk Orders section, click the print icon (printer)
2. A new window will open with a formatted invoice
3. Use your browser's print function to print or save as PDF

## Security Features

- Firebase Authentication for user verification
- Protected admin routes
- Secure data access through Firebase security rules
- Input validation and sanitization

## Responsive Design

The dashboard is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Ensure Firebase Authentication is enabled
   - Check if the user account exists in Firebase

2. **Data Not Loading**
   - Verify Firestore rules allow read/write access
   - Check browser console for error messages

3. **Form Submission Issues**
   - Ensure all required fields are filled
   - Check internet connection
   - Verify Firebase configuration

### Support

For technical support or questions, please check:
1. Firebase console for configuration issues
2. Browser console for JavaScript errors
3. Network tab for API request failures

## Future Enhancements

- Real-time notifications
- Advanced analytics and reporting
- Export functionality (CSV, PDF)
- Bulk import operations
- Advanced search and filtering
- Dashboard customization options
- Mobile app version 