import streamlit as st
import hashlib
import sqlite3
import os
from datetime import datetime
import pandas as pd

# Initialize database
def init_db():
    """Initialize the user database with proper schema"""
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    
    # Create users table with hashed passwords
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            email TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP
        )
    ''')
    
    # Create login attempts table for security monitoring
    c.execute('''
        CREATE TABLE IF NOT EXISTS login_attempts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            success BOOLEAN,
            ip_address TEXT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

def hash_password(password):
    """Hash password using SHA-256 with salt"""
    salt = "your_app_salt_here"  # In production, use a random salt per user
    return hashlib.sha256((password + salt).encode()).hexdigest()

def verify_password(password, hashed):
    """Verify password against hash"""
    return hash_password(password) == hashed

def register_user(username, password, email=""):
    """Register a new user with hashed password"""
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    
    try:
        password_hash = hash_password(password)
        c.execute(
            "INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)",
            (username, password_hash, email)
        )
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        return False  # Username already exists
    finally:
        conn.close()

def authenticate_user(username, password):
    """Authenticate user and log attempt"""
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    
    # Get user data
    c.execute("SELECT password_hash FROM users WHERE username = ?", (username,))
    result = c.fetchone()
    
    success = False
    if result and verify_password(password, result[0]):
        success = True
        # Update last login
        c.execute(
            "UPDATE users SET last_login = ? WHERE username = ?",
            (datetime.now(), username)
        )
    
    # Log login attempt
    c.execute(
        "INSERT INTO login_attempts (username, success) VALUES (?, ?)",
        (username, success)
    )
    
    conn.commit()
    conn.close()
    return success

def get_user_data():
    """Get user data for admin view (passwords not included)"""
    conn = sqlite3.connect('users.db')
    df = pd.read_sql_query(
        "SELECT id, username, email, created_at, last_login FROM users",
        conn
    )
    conn.close()
    return df

def get_login_attempts():
    """Get login attempts for security monitoring"""
    conn = sqlite3.connect('users.db')
    df = pd.read_sql_query(
        "SELECT username, success, timestamp FROM login_attempts ORDER BY timestamp DESC LIMIT 100",
        conn
    )
    conn.close()
    return df

# Initialize database
init_db()

# Streamlit App Configuration
st.set_page_config(
    page_title="Secure Login System",
    page_icon="🔐",
    layout="wide"
)

def main():
    st.title("🔐 Secure Login System")
    
    # Initialize session state
    if 'logged_in' not in st.session_state:
        st.session_state.logged_in = False
    if 'username' not in st.session_state:
        st.session_state.username = ""
    if 'is_admin' not in st.session_state:
        st.session_state.is_admin = False

    # Sidebar for login/register
    with st.sidebar:
        if not st.session_state.logged_in:
            st.header("🚪 Authentication")
            
            # Toggle between login and register
            auth_mode = st.radio("Choose action:", ["Login", "Register"])
            
            username = st.text_input("👤 Username")
            password = st.text_input("🔒 Password", type="password")
            
            if auth_mode == "Register":
                email = st.text_input("📧 Email (optional)")
                confirm_password = st.text_input("🔒 Confirm Password", type="password")
                
                if st.button("✅ Register", type="primary"):
                    if not username or not password:
                        st.error("Username and password are required!")
                    elif password != confirm_password:
                        st.error("Passwords don't match!")
                    elif len(password) < 6:
                        st.error("Password must be at least 6 characters!")
                    elif register_user(username, password, email):
                        st.success("🎉 Registration successful! Please login.")
                    else:
                        st.error("❌ Username already exists!")
            
            else:  # Login mode
                if st.button("🔓 Login", type="primary"):
                    if not username or not password:
                        st.error("Please enter username and password!")
                    elif authenticate_user(username, password):
                        st.session_state.logged_in = True
                        st.session_state.username = username
                        # Simple admin check (in production, use proper role management)
                        if username.lower() == "admin":
                            st.session_state.is_admin = True
                        st.success("✅ Login successful!")
                        st.rerun()
                    else:
                        st.error("❌ Invalid username or password!")
        
        else:
            st.success(f"👋 Welcome, **{st.session_state.username}**!")
            st.write("---")
            if st.session_state.is_admin:
                st.write("🛡️ **Admin Access**")
            
            if st.button("🚪 Logout", type="secondary"):
                st.session_state.logged_in = False
                st.session_state.username = ""
                st.session_state.is_admin = False
                st.success("👋 Logged out successfully!")
                st.rerun()

    # Main content area
    if st.session_state.logged_in:
        # Admin panel
        if st.session_state.is_admin:
            st.header("🛡️ Admin Panel")
            
            tab1, tab2, tab3 = st.tabs(["👥 User Management", "🔍 Security Logs", "📊 Statistics"])
            
            with tab1:
                st.subheader("📋 Registered Users")
                user_data = get_user_data()
                if not user_data.empty:
                    st.dataframe(user_data, use_container_width=True)
                    st.info(f"Total users: {len(user_data)}")
                else:
                    st.info("No users registered yet.")
            
            with tab2:
                st.subheader("🔍 Recent Login Attempts")
                login_attempts = get_login_attempts()
                if not login_attempts.empty:
                    # Color code the success column
                    styled_df = login_attempts.copy()
                    st.dataframe(styled_df, use_container_width=True)
                else:
                    st.info("No login attempts recorded yet.")
            
            with tab3:
                st.subheader("📊 System Statistics")
                user_data = get_user_data()
                login_attempts = get_login_attempts()
                
                col1, col2, col3, col4 = st.columns(4)
                
                with col1:
                    st.metric("👥 Total Users", len(user_data))
                
                with col2:
                    st.metric("🔍 Login Attempts", len(login_attempts))
                
                with col3:
                    if not login_attempts.empty:
                        success_rate = login_attempts['success'].mean() * 100
                        st.metric("✅ Success Rate", f"{success_rate:.1f}%")
                    else:
                        st.metric("✅ Success Rate", "0%")
                
                with col4:
                    if not login_attempts.empty:
                        failed_attempts = len(login_attempts[login_attempts['success'] == False])
                        st.metric("❌ Failed Attempts", failed_attempts)
                    else:
                        st.metric("❌ Failed Attempts", "0")
        
        # Regular user content
        st.header("🏠 Welcome to the Application")
        st.success(f"You are successfully logged in as: **{st.session_state.username}**")
        
        col1, col2 = st.columns([2, 1])
        
        with col1:
            st.write("### 📱 Main Features")
            st.write("This is the main application content that users see after logging in.")
            st.write("- ✅ Secure authentication system")
            st.write("- 🔒 Password hashing and protection")
            st.write("- 📊 Login attempt monitoring")
            st.write("- 👤 User session management")
            st.write("- 🛡️ Admin panel for system monitoring")
        
        with col2:
            # Example protected content
            with st.expander("👤 User Profile"):
                st.write(f"**Username:** {st.session_state.username}")
                st.write(f"**Login Status:** Active")
                st.write(f"**User Type:** {'Administrator' if st.session_state.is_admin else 'Regular User'}")
                st.write("Profile settings and user data would go here.")
        
        # Sample interactive content
        st.write("### 🎯 Interactive Demo")
        with st.container():
            demo_tab1, demo_tab2 = st.tabs(["📊 Data Visualization", "🧮 Calculator"])
            
            with demo_tab1:
                import numpy as np
                chart_data = pd.DataFrame(
                    np.random.randn(20, 3),
                    columns=['Series A', 'Series B', 'Series C']
                )
                st.line_chart(chart_data)
            
            with demo_tab2:
                col1, col2 = st.columns(2)
                with col1:
                    num1 = st.number_input("First number", value=0.0)
                    num2 = st.number_input("Second number", value=0.0)
                with col2:
                    operation = st.selectbox("Operation", ["+", "-", "*", "/"])
                    if st.button("Calculate"):
                        if operation == "+":
                            result = num1 + num2
                        elif operation == "-":
                            result = num1 - num2
                        elif operation == "*":
                            result = num1 * num2
                        elif operation == "/" and num2 != 0:
                            result = num1 / num2
                        else:
                            result = "Error"
                        st.success(f"Result: {result}")
    
    else:
        # Landing page for non-logged-in users
        st.info("🔒 Please login or register to access the application.")
        
        col1, col2 = st.columns([2, 1])
        
        with col1:
            st.write("### 🌟 Application Features")
            st.write("This secure application demonstrates:")
            st.write("- 🔐 **Secure Authentication** - Hashed password storage")
            st.write("- 📊 **Login Monitoring** - Track all authentication attempts")
            st.write("- 🛡️ **Admin Panel** - User management and system monitoring")
            st.write("- 💾 **Data Persistence** - SQLite database storage")
            st.write("- 🎯 **Session Management** - Secure user sessions")
        
        with col2:
            st.write("### 🚀 Quick Start")
            st.write("1. **Register** a new account")
            st.write("2. **Login** with your credentials")
            st.write("3. **Explore** the application features")
            st.write("4. Use username '**admin**' for admin access")

if __name__ == "__main__":
    main()