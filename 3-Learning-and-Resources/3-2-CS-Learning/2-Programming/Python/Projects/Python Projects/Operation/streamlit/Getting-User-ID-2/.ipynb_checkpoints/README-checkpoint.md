# 🔐 Secure Streamlit Login System

A comprehensive user authentication system built with Streamlit, featuring secure password hashing, login monitoring, and admin panel functionality.

## 📁 Project Structure

```
your_project_folder/
├── streamlit_app.py          # Main Streamlit application
├── database_access.py        # Database management script
├── requirements.txt          # Python dependencies
├── README.md                # This documentation
├── users.db                 # SQLite database (created automatically)
├── users_export.csv         # User data export (created when exported)
└── login_attempts_export.csv # Login attempts export (created when exported)
```

## 🚀 Quick Start

### 1. Installation

```bash
# Install required packages
pip install -r requirements.txt
```

### 2. Run the Application

```bash
# Start the Streamlit app
streamlit run streamlit_app.py
```

### 3. Access the Application

- Open your browser to `http://localhost:8501`
- Register a new user account
- Login with your credentials
- Use username "admin" for administrator access

## ✨ Features

### 🔐 Security Features
- **Password Hashing**: SHA-256 with salt for secure password storage
- **Login Monitoring**: Track all authentication attempts
- **Session Management**: Secure user session handling
- **Input Validation**: Comprehensive form validation

### 👥 User Management
- **User Registration**: Create new accounts with email
- **User Authentication**: Secure login system
- **Profile Management**: Basic user profile information
- **Admin Panel**: Administrative user management

### 📊 Admin Dashboard
- **User Overview**: View all registered users
- **Security Logs**: Monitor login attempts
- **System Statistics**: User and login metrics
- **Data Export**: Export user data to CSV

### 🎯 Interactive Features
- **Data Visualization**: Sample charts and graphs
- **Calculator**: Interactive calculator demo
- **Responsive Design**: Mobile-friendly interface

## 🗄️ Database Management

### Using the Database Access Script

```bash
# Run the interactive database management tool
python database_access.py
```

### Available Operations
1. **View All Users** - Display user information
2. **View Login Attempts** - Show authentication logs
3. **Database Statistics** - System metrics and stats
4. **Search Users** - Find specific user information
5. **Export Data** - Export to CSV files
6. **Delete Users** - Remove user accounts

### Direct Database Access

```python
import sqlite3

# Connect to database
conn = sqlite3.connect('users.db')

# Query users (passwords are hashed)
cursor = conn.cursor()
cursor.execute("SELECT username, email, created_at FROM users")
users = cursor.fetchall()

conn.close()
```

## 🛡️ Security Considerations

### ✅ Implemented Security Measures
- Passwords stored as hashed values (SHA-256 + salt)
- Login attempt logging for security monitoring
- Session state management
- Input validation and sanitization
- Admin role separation

### ⚠️ Production Recommendations
- Use environment variables for salts and secrets
- Implement rate limiting for login attempts
- Add CAPTCHA for repeated failed attempts
- Use HTTPS in production
- Consider more robust libraries like `streamlit-authenticator`
- Implement proper database encryption at rest
- Add password complexity requirements
- Implement account lockout policies

## 📋 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);
```

### Login Attempts Table
```sql
CREATE TABLE login_attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    success BOOLEAN,
    ip_address TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Configuration

### Environment Variables (Recommended for Production)
```bash
# Add to .env file
DATABASE_PATH=users.db
PASSWORD_SALT=your_secure_salt_here
ADMIN_USERNAME=admin
```

### Customization Options
- Modify password requirements in `streamlit_app.py`
- Change database location in connection strings
- Customize UI themes and styling
- Add additional user fields
- Implement custom authentication logic

## 🐛 Troubleshooting

### Common Issues

**Database not found**
```bash
# Run the Streamlit app first to create the database
streamlit run streamlit_app.py
```

**Permission errors**
```bash
# Check file permissions
chmod 644 users.db
```

**Module not found**
```bash
# Install requirements
pip install -r requirements.txt
```

## 📊 Monitoring and Maintenance

### Regular Tasks
1. **Monitor Login Attempts** - Check for suspicious activity
2. **Backup Database** - Regular `users.db` backups
3. **Update Dependencies** - Keep packages current
4. **Review Logs** - Analyze user patterns
5. **Clean Old Data** - Archive old login attempts

### Performance Optimization
- Index frequently queried columns
- Archive old login attempts
- Optimize database queries
- Monitor memory usage

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For questions or issues:
1. Check the troubleshooting section
2. Review the database management script
3. Check Streamlit documentation
4. Submit an issue with detailed information

---

**Note**: This is a demonstration system. For production use, implement additional security measures and follow security best practices.