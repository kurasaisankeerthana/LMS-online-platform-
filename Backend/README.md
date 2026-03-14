# Backend Structure

## Folder Organization

```
Backend/
├── Models/              # Database schemas
│   ├── User.js         # User model (authentication)
│   ├── Course.js       # Course model
│   └── Enrollment.js   # Enrollment model
│
├── controllers/         # Business logic
│   ├── courseController.js      # Course CRUD operations
│   └── enrollmentController.js  # Enrollment CRUD operations
│
├── routes/             # API endpoints
│   ├── auth.js         # Authentication routes
│   ├── courses.js      # Course routes
│   └── enrollments.js  # Enrollment routes
│
├── middleware/         # Custom middleware
│   └── authMiddleware.js  # JWT verification
│
├── .env               # Environment variables
├── Server.js          # Main application entry point
├── seedCourses.js     # Database seeding script
└── package.json       # Dependencies
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/mycourses` - Protected route (requires token)

### Courses
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get single course
- `POST /courses` - Create new course
- `PUT /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course

### Enrollments
- `GET /enrollments` - Get all enrollments
- `POST /enrollments` - Create enrollment
- `PATCH /enrollments/:id` - Update enrollment
- `DELETE /enrollments/:id` - Delete enrollment

## Models

### User
- username: String
- email: String
- password: String (hashed)

### Course
- id: String
- title: String
- instructor: String
- price: Number
- thumbnail: String
- videoUrl: String
- duration: String
- lessons: [String]

### Enrollment
- studentName: String
- courseId: String
- courseTitle: String
- progress: Number
- assessmentScore: Number

## Running the Server

```bash
# Install dependencies
npm install

# Seed courses data
node seedCourses.js

# Start server
npm start
```

Server runs on: http://localhost:5000
