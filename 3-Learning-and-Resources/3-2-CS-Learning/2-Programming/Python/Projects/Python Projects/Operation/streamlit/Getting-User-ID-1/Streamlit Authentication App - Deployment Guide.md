# Streamlit Authentication App - Deployment Guide

## 🚨 CRITICAL SECURITY WARNING

**This application is for DEMONSTRATION PURPOSES ONLY and contains SEVERE SECURITY VULNERABILITIES!**

- Stores passwords in plain text
- No encryption or hashing
- No secure authentication mechanisms
- Vulnerable to data breaches and attacks

**NEVER deploy this to production or use with real user data!**

## Application Overview

The Streamlit authentication app successfully captures and stores user login credentials with the following features:

- **Login Form**: Clean interface for username/password input
- **Credential Capture**: Automatically saves all login attempts to `users.txt`
- **Admin View**: Displays all captured credentials with timestamps
- **Real-time Updates**: Shows login attempts counter and refresh functionality
- **Data Management**: Option to clear all stored data

## File Structure

```
streamlit-auth-app/
├── streamlit_auth_app.py    # Main application file
├── requirements.txt         # Python dependencies
├── users.txt               # Generated file with captured credentials
├── README.md               # Setup and usage instructions
├── design_document.md      # Architecture and security warnings
└── deployment_guide.md     # This file
```

## Local Deployment

### Prerequisites
- Python 3.7 or higher
- pip package manager

### Setup Steps

1. **Install Streamlit:**
   ```bash
   pip install streamlit
   ```

2. **Run the application:**
   ```bash
   streamlit run streamlit_auth_app.py
   ```

3. **Access the app:**
   - Open browser to `http://localhost:8501`
   - The app will automatically open in your default browser

### Testing the Application

1. **Test Login Functionality:**
   - Enter any username and password
   - Click "Login" button
   - Verify success message appears
   - Check that credentials are captured

2. **Test Admin View:**
   - Click "Admin View" tab
   - Verify captured credentials are displayed
   - Check timestamp and formatting
   - Test "Refresh Credentials" button
   - Test "Clear All Data" functionality

## Cloud Deployment Options

### Option 1: Streamlit Cloud (Recommended for Demo)
1. Push code to GitHub repository
2. Connect to Streamlit Cloud
3. Deploy directly from repository
4. **Warning**: Do not use for real applications due to security issues

### Option 2: Heroku
1. Create `Procfile`:
   ```
   web: streamlit run streamlit_auth_app.py --server.port=$PORT --server.address=0.0.0.0
   ```
2. Deploy to Heroku
3. **Warning**: Insecure for production use

### Option 3: Docker Deployment
1. Create `Dockerfile`:
   ```dockerfile
   FROM python:3.9-slim
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   COPY . .
   EXPOSE 8501
   CMD ["streamlit", "run", "streamlit_auth_app.py", "--server.address=0.0.0.0"]
   ```
2. Build and run container
3. **Warning**: Still insecure regardless of deployment method

## How Credential Capture Works

### Backend Logic
1. **Form Submission**: When user clicks "Login", Streamlit captures form data
2. **Data Processing**: Username and password are extracted from form inputs
3. **File Storage**: Credentials are appended to `users.txt` with timestamp
4. **User Feedback**: Success message displayed to user
5. **Admin Access**: Stored data viewable in Admin View tab

### Data Format
```
2025-08-02 21:43:03 | Username: testuser123 | Password: mypassword456
```

### Key Code Components

**Credential Capture Function:**
```python
def save_credentials(username, password):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open("users.txt", "a") as f:
        f.write(f"{timestamp} | Username: {username} | Password: {password}\n")
    return True
```

**Form Processing:**
```python
with st.form("login_form"):
    username = st.text_input("Username")
    password = st.text_input("Password", type="password")
    submit_button = st.form_submit_button("Login")
    
    if submit_button and username and password:
        save_credentials(username, password)
        st.success(f"Login attempt recorded for user: {username}")
```

## Security Considerations for Real Applications

If you were to build a secure authentication system, implement:

1. **Password Hashing**: Use bcrypt, scrypt, or Argon2
2. **Salting**: Unique salts for each password
3. **Secure Storage**: Database with encryption at rest
4. **HTTPS**: Encrypted communication
5. **Rate Limiting**: Prevent brute force attacks
6. **Session Management**: Secure session handling
7. **Input Validation**: Sanitize all user inputs
8. **Audit Logging**: Secure logging of authentication events

## Legal and Ethical Considerations

- Only use for educational/demonstration purposes
- Obtain proper consent before capturing any credentials
- Comply with data protection regulations (GDPR, CCPA, etc.)
- Implement proper data retention and deletion policies
- Consider privacy implications of credential storage

## Troubleshooting

### Common Issues
1. **Port Already in Use**: Change port with `--server.port 8502`
2. **Permission Errors**: Ensure write permissions for `users.txt`
3. **Module Not Found**: Install requirements with `pip install -r requirements.txt`

### Performance Notes
- File-based storage is not suitable for high-traffic applications
- Consider database solutions for production use
- Monitor file size growth with multiple users

## Conclusion

This Streamlit application successfully demonstrates credential capture functionality as requested. However, it serves as an example of what NOT to do in production environments. Always prioritize security and user privacy in real applications.

