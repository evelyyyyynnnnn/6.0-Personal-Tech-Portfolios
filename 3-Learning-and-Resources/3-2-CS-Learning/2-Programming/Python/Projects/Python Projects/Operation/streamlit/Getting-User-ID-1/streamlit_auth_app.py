import streamlit as st
import os
from datetime import datetime

# Set page configuration
st.set_page_config(
    page_title="User Authentication System",
    page_icon="🔐",
    layout="centered"
)

def save_credentials(username, password):
    """
    Save user credentials to a text file.
    WARNING: This is for demonstration purposes only and is NOT secure!
    """
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Create the credentials file if it doesn't exist
    credentials_file = "users.txt"
    
    # Append the credentials to the file
    with open(credentials_file, "a") as f:
        f.write(f"{timestamp} | Username: {username} | Password: {password}\n")
    
    return True

def load_stored_credentials():
    """
    Load and display stored credentials (for demonstration purposes)
    """
    credentials_file = "users.txt"
    if os.path.exists(credentials_file):
        with open(credentials_file, "r") as f:
            return f.read()
    return "No credentials stored yet."

def main():
    st.title("🔐 User Authentication System")
    
    # Security Warning
    st.error("""
    ⚠️ **SECURITY WARNING**: This application stores usernames and passwords in plain text for demonstration purposes only. 
    This is EXTREMELY INSECURE and should NEVER be used in production environments!
    """)
    
    # Create tabs for login and admin view
    tab1, tab2 = st.tabs(["Login", "Admin View"])
    
    with tab1:
        st.header("User Login")
        
        # Create login form
        with st.form("login_form"):
            st.subheader("Please enter your credentials:")
            
            username = st.text_input("Username", placeholder="Enter your username")
            password = st.text_input("Password", type="password", placeholder="Enter your password")
            
            submit_button = st.form_submit_button("Login")
            
            if submit_button:
                if username and password:
                    # Save the credentials
                    if save_credentials(username, password):
                        st.success(f"✅ Login attempt recorded for user: {username}")
                        st.info("Your credentials have been captured and stored.")
                        
                        # Simulate a login process
                        st.balloons()
                        
                        # Display a fake success message
                        st.write("---")
                        st.write(f"Welcome, {username}! You have successfully logged in.")
                        st.write("🎉 Access granted to the system.")
                    else:
                        st.error("❌ Failed to record login attempt.")
                else:
                    st.warning("⚠️ Please enter both username and password.")
    
    with tab2:
        st.header("Admin View - Captured Credentials")
        st.warning("This tab shows all captured user credentials for demonstration purposes.")
        
        if st.button("Refresh Credentials"):
            st.rerun()
        
        # Display stored credentials
        credentials_data = load_stored_credentials()
        
        if credentials_data.strip():
            st.subheader("Stored User Credentials:")
            st.text_area("Captured Data", credentials_data, height=300)
            
            # Count total login attempts
            lines = credentials_data.strip().split('\n')
            if lines and lines[0]:  # Check if there's actual content
                st.metric("Total Login Attempts", len(lines))
        else:
            st.info("No login attempts recorded yet.")
        
        # Option to clear all data
        if st.button("Clear All Data", type="secondary"):
            if os.path.exists("users.txt"):
                os.remove("users.txt")
                st.success("All stored credentials have been cleared.")
                st.rerun()

if __name__ == "__main__":
    main()

