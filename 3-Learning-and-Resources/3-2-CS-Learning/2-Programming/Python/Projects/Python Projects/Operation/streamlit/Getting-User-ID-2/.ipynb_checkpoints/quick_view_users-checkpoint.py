#!/usr/bin/env python3
"""
快速查看用户数据库的脚本
直接显示 users.db 中的所有用户信息
"""

import sqlite3
import os
from datetime import datetime

def view_users_data():
    """查看用户数据库中的所有信息"""
    
    # 检查数据库文件是否存在
    if not os.path.exists('users.db'):
        print("❌ 数据库文件 'users.db' 不存在")
        print("请先运行 Streamlit 应用并注册至少一个用户")
        return
    
    try:
        # 连接数据库
        conn = sqlite3.connect('users.db')
        cursor = conn.cursor()
        
        print("🗄️ 用户数据库内容")
        print("="*80)
        
        # 查询所有用户
        cursor.execute("""
            SELECT id, username, password_hash, email, created_at, last_login 
            FROM users 
            ORDER BY created_at DESC
        """)
        
        users = cursor.fetchall()
        
        if not users:
            print("📝 数据库中暂无用户数据")
        else:
            print(f"👥 找到 {len(users)} 个用户:")
            print("-"*80)
            
            for user in users:
                user_id, username, password_hash, email, created_at, last_login = user
                
                print(f"🆔 用户ID: {user_id}")
                print(f"👤 用户名: {username}")
                print(f"🔒 密码哈希: {password_hash}")
                print(f"📧 邮箱: {email if email else '未提供'}")
                print(f"📅 注册时间: {created_at}")
                print(f"🕐 最后登录: {last_login if last_login else '从未登录'}")
                print("-"*80)
        
        # 查询登录记录
        cursor.execute("""
            SELECT username, success, timestamp 
            FROM login_attempts 
            ORDER BY timestamp DESC 
            LIMIT 10
        """)
        
        attempts = cursor.fetchall()
        
        print(f"\n🔍 最近10次登录尝试:")
        print("-"*80)
        
        if not attempts:
            print("📝 暂无登录记录")
        else:
            for attempt in attempts:
                username, success, timestamp = attempt
                status = "✅ 成功" if success else "❌ 失败"
                print(f"👤 {username} | {status} | 🕐 {timestamp}")
        
        # 统计信息
        cursor.execute("SELECT COUNT(*) FROM users")
        total_users = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM login_attempts")
        total_attempts = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM login_attempts WHERE success = 1")
        successful_attempts = cursor.fetchone()[0]
        
        print(f"\n📊 数据库统计:")
        print("-"*80)
        print(f"👥 总用户数: {total_users}")
        print(f"🔍 总登录尝试: {total_attempts}")
        print(f"✅ 成功登录: {successful_attempts}")
        print(f"❌ 失败登录: {total_attempts - successful_attempts}")
        
        if total_attempts > 0:
            success_rate = (successful_attempts / total_attempts) * 100
            print(f"📈 成功率: {success_rate:.1f}%")
        
        conn.close()
        
    except Exception as e:
        print(f"❌ 读取数据库时出错: {e}")

def export_to_readable_format():
    """导出用户数据到可读的文本文件"""
    
    if not os.path.exists('users.db'):
        print("❌ 数据库文件不存在")
        return
    
    try:
        conn = sqlite3.connect('users.db')
        cursor = conn.cursor()
        
        # 创建用户数据报告
        with open('user_data_report.txt', 'w', encoding='utf-8') as f:
            f.write("用户数据报告\n")
            f.write("="*50 + "\n")
            f.write(f"生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
            
            # 用户信息
            cursor.execute("SELECT id, username, email, created_at, last_login FROM users")
            users = cursor.fetchall()
            
            f.write(f"注册用户总数: {len(users)}\n\n")
            
            for user in users:
                user_id, username, email, created_at, last_login = user
                f.write(f"用户ID: {user_id}\n")
                f.write(f"用户名: {username}\n")
                f.write(f"邮箱: {email if email else '未提供'}\n")
                f.write(f"注册时间: {created_at}\n")
                f.write(f"最后登录: {last_login if last_login else '从未登录'}\n")
                f.write("-" * 30 + "\n")
            
            # 登录记录
            cursor.execute("SELECT username, success, timestamp FROM login_attempts ORDER BY timestamp DESC")
            attempts = cursor.fetchall()
            
            f.write(f"\n登录记录总数: {len(attempts)}\n\n")
            
            for attempt in attempts:
                username, success, timestamp = attempt
                status = "成功" if success else "失败"
                f.write(f"{timestamp} | {username} | {status}\n")
        
        conn.close()
        print("✅ 用户数据已导出到 'user_data_report.txt'")
        
    except Exception as e:
        print(f"❌ 导出数据时出错: {e}")

if __name__ == "__main__":
    print("🔍 用户数据查看器")
    print("="*50)
    
    while True:
        print("\n选择操作:")
        print("1. 📋 查看所有用户数据")
        print("2. 📄 导出数据到文本文件")
        print("3. 🚪 退出")
        
        choice = input("\n请输入选择 (1-3): ").strip()
        
        if choice == '1':
            view_users_data()
        elif choice == '2':
            export_to_readable_format()
        elif choice == '3':
            print("👋 再见!")
            break
        else:
            print("❌ 无效选择，请输入 1-3")