#!/usr/bin/env python3
"""
Easy startup script for the Streamlit Login System
Run this script to start the application with proper setup
"""

import os
import sys
import subprocess
import sqlite3
from pathlib import Path

def check_requirements():
    """Check if required packages are installed"""
    required_packages = ['streamlit', 'pandas']
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package)
        except ImportError:
            missing_packages.append(package