# Streamlit Authentication App

## ⚠️ CRITICAL SECURITY WARNING

**This application is for DEMONSTRATION PURPOSES ONLY and is EXTREMELY INSECURE!**

This app stores usernames and passwords in plain text, which is a severe security vulnerability. **NEVER use this approach in production or real-world applications.**

## What This App Does

- Provides a login form that captures usernames and passwords
- Stores all login attempts in a plain text file (`users.txt`)
- Includes an admin view to see all captured credentials
- Demonstrates how user input can be captured in Streamlit

## Setup Instructions

1. **Install Python 3.7 or higher**

2. **Install Streamlit:**
   ```bash
   pip install streamlit
   ```

3. **Run the application:**
   ```bash
   streamlit run streamlit_auth_app.py
   ```

4. **Access the app:**
   - The app will open in your browser at `http://localhost:8501`
   - If it doesn't open automatically, navigate to that URL

## How to Use

### User Login Tab
1. Enter any username and password
2. Click "Login"
3. The credentials will be captured and stored in `users.txt`
4. You'll see a success message

### Admin View Tab
1. Click on the "Admin View" tab
2. View all captured credentials
3. Use "Refresh Credentials" to update the display
4. Use "Clear All Data" to delete all stored credentials

## File Structure

```
.
├── streamlit_auth_app.py    # Main application file
├── requirements.txt         # Python dependencies
├── users.txt               # Generated file containing captured credentials
└── README.md               # This file
```

## Security Considerations for Real Applications

If you were to build a real authentication system, you should:

1. **Hash passwords** using bcrypt, scrypt, or similar
2. **Use salts** for each password
3. **Store data in a secure database**, not plain text files
4. **Use HTTPS** for all communications
5. **Implement rate limiting** to prevent brute force attacks
6. **Use proper session management**
7. **Follow OWASP security guidelines**

## Deployment Options

### Local Development
- Run with `streamlit run streamlit_auth_app.py`
- Access at `http://localhost:8501`

### Cloud Deployment
- Can be deployed to Streamlit Cloud, Heroku, or other platforms
- Remember: This is insecure and should not be deployed publicly

## Legal and Ethical Notice

This application is intended for educational purposes only. Capturing user credentials without proper security measures and user consent may violate privacy laws and ethical guidelines. Always ensure you have proper authorization and implement appropriate security measures in real applications.

