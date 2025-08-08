import streamlit as st
import requests
import json
import time
import random
from datetime import datetime
import base64
from io import BytesIO
from PIL import Image
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Page configuration
st.set_page_config(
    page_title="Fashion AI Studio",
    page_icon="✨",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS for attractive styling
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    
    * {
        font-family: 'Poppins', sans-serif;
    }
    
    .stApp {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    /* Login Page Styles */
    .login-container {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 3rem 2rem;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        text-align: center;
        max-width: 450px;
        margin: 2rem auto;
        animation: fadeInUp 0.8s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .login-title {
        font-size: 2.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 0.5rem;
        animation: glow 2s ease-in-out infinite alternate;
    }
    
    @keyframes glow {
        from { text-shadow: 0 0 20px rgba(102, 126, 234, 0.5); }
        to { text-shadow: 0 0 30px rgba(118, 75, 162, 0.8); }
    }
    
    .login-subtitle {
        color: #666;
        font-size: 1.1rem;
        margin-bottom: 2rem;
    }
    
    .floating-elements {
        position: fixed;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    }
    
    .floating-shape {
        position: absolute;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        border-radius: 50%;
        animation: float 6s ease-in-out infinite;
    }
    
    .shape1 {
        width: 80px;
        height: 80px;
        top: 20%;
        left: 10%;
        animation-delay: 0s;
    }
    
    .shape2 {
        width: 60px;
        height: 60px;
        top: 60%;
        right: 10%;
        animation-delay: -2s;
    }
    
    .shape3 {
        width: 100px;
        height: 100px;
        top: 40%;
        left: 80%;
        animation-delay: -4s;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    /* Main Page Styles */
    .main-header {
        text-align: center;
        color: white;
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        animation: slideInDown 0.8s ease-out;
    }
    
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .main-subtitle {
        text-align: center;
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.3rem;
        margin-bottom: 3rem;
        animation: fadeIn 1s ease-out 0.3s both;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .service-card {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 2rem;
        margin: 1rem 0;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        animation: fadeInUp 0.8s ease-out;
    }
    
    .service-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
    }
    
    .service-icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin: 0 auto 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: white;
        animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .marketing-icon {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .design-icon {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }
    
    .development-icon {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }
    
    .get-started-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 15px 40px;
        border-radius: 50px;
        font-size: 1.2rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        animation: bounce 2s ease-in-out infinite;
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }
    
    .get-started-btn:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
    }
    
    /* Chat Page Styles */
    .chat-container {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 2rem;
        margin: 1rem 0;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        animation: slideInLeft 0.5s ease-out;
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .chat-message {
        padding: 1rem 1.5rem;
        border-radius: 20px;
        margin: 1rem 0;
        animation: fadeInUp 0.3s ease-out;
    }
    
    .user-message {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        margin-left: 20%;
    }
    
    .ai-message {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        color: white;
        margin-right: 20%;
    }
    
    .typing-indicator {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        animation: typing 1.4s infinite ease-in-out;
        margin-right: 5px;
    }
    
    .typing-indicator:nth-child(2) { animation-delay: 0.2s; }
    .typing-indicator:nth-child(3) { animation-delay: 0.4s; }
    
    @keyframes typing {
        0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
        40% { transform: scale(1); opacity: 1; }
    }
    
    .generated-image {
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        max-width: 100%;
        margin: 1rem 0;
        animation: zoomIn 0.5s ease-out;
    }
    
    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .color-palette {
        display: flex;
        gap: 10px;
        margin: 1rem 0;
        animation: slideInRight 0.5s ease-out;
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .color-swatch {
        width: 60px;
        height: 60px;
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease;
        cursor: pointer;
    }
    
    .color-swatch:hover {
        transform: scale(1.1);
    }
    
    /* Hide Streamlit elements */
    .stDeployButton {display:none;}
    footer {visibility: hidden;}
    .stApp > header {visibility: hidden;}
    
</style>
""", unsafe_allow_html=True)

# Add floating shapes
st.markdown("""
<div class="floating-elements">
    <div class="floating-shape shape1"></div>
    <div class="floating-shape shape2"></div>
    <div class="floating-shape shape3"></div>
</div>
""", unsafe_allow_html=True)

# Initialize session state
if 'page' not in st.session_state:
    st.session_state.page = 'login'
if 'user_logged_in' not in st.session_state:
    st.session_state.user_logged_in = False
if 'chat_messages' not in st.session_state:
    st.session_state.chat_messages = []

# API Configuration using environment variables (more secure)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "demo_key")
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY", "demo_key")

# Alternative: Use environment variables (recommended for security)
# import os
# GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "default_key")
# DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY", "default_key")

class FashionAI:
    def _init_(self):
        # Check if API keys are properly set
        if GEMINI_API_KEY == "your_gemini_api_key_here":
            st.warning("⚠ Please set your actual Gemini API key for full functionality!")
        
        if DEEPSEEK_API_KEY == "your_deepseek_api_key_here":
            st.warning("⚠ Please set your actual DeepSeek API key for image generation!")
        
        self.gemini_api_key = GEMINI_API_KEY
        self.deepseek_api_key = DEEPSEEK_API_KEY
    
    def get_gemini_response(self, prompt):
        """Get response from Gemini API"""
        try:
            # Simulated response for demo (replace with actual Gemini API call)
            fashion_responses = [
                f"Great question about {prompt[:20]}...! For fashion styling, I'd recommend considering your body type, color palette, and the occasion. Here are some personalized suggestions based on current trends...",
                f"Absolutely! When it comes to {prompt[:20]}..., the key is to balance proportions and choose colors that complement your skin tone. Let me share some expert tips...",
                f"I love this question about {prompt[:20]}...! Fashion is all about expressing your unique style. Based on the latest trends and timeless principles, here's what I suggest...",
            ]
            return random.choice(fashion_responses)
            
            # Uncomment below for actual API call:
            """
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {self.gemini_api_key}'
            }
            
            data = {
                'model': 'gemini-pro',
                'messages': [
                    {
                        'role': 'user',
                        'content': f"You are a fashion expert and stylist. Answer this fashion-related question: {prompt}"
                    }
                ],
                'max_tokens': 500,
                'temperature': 0.7
            }
            
            response = requests.post(
                'https://api.gemini.com/v1/chat/completions',  # Replace with actual Gemini API endpoint
                headers=headers,
                json=data
            )
            
            if response.status_code == 200:
                return response.json()['choices'][0]['message']['content']
            else:
                return "I apologize, but I'm having trouble connecting to my fashion database right now. Please try again!"
            """
        except Exception as e:
            return "I'm having some technical difficulties. Let me help you with general fashion advice instead!"
    
    def generate_fashion_image(self, prompt):
        """Generate fashion image using DeepSeek API"""
        try:
            # For demo purposes, return a placeholder
            # Replace this with actual DeepSeek API call
            return "https://via.placeholder.com/512x512/667eea/ffffff?text=Fashion+Look+Generated"
            
            # Uncomment below for actual API call:
            """
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {self.deepseek_api_key}'
            }
            
            data = {
                'prompt': f"Fashion outfit, {prompt}, high quality, professional photography, fashion magazine style",
                'size': '512x512',
                'style': 'fashion',
                'quality': 'high'
            }
            
            response = requests.post(
                'https://api.deepseek.com/v1/images/generate',  # Replace with actual DeepSeek API endpoint
                headers=headers,
                json=data
            )
            
            if response.status_code == 200:
                return response.json()['data'][0]['url']
            else:
                return None
            """
        except Exception as e:
            return None

# Initialize AI
fashion_ai = FashionAI()

def show_login_page():
    """Display the login page with animations"""
    
    col1, col2, col3 = st.columns([1, 2, 1])
    
    with col2:
        st.markdown("""
        <div class="login-container">
            <div class="login-title">✨ Fashion AI</div>
            <div class="login-subtitle">Your Personal Style Assistant</div>
        """, unsafe_allow_html=True)
        
        # Login form
        with st.form("login_form"):
            username = st.text_input("👤 Username", placeholder="Enter your username")
            password = st.text_input("🔒 Password", type="password", placeholder="Enter your password")
            
            col_a, col_b, col_c = st.columns([1, 2, 1])
            with col_b:
                login_clicked = st.form_submit_button("✨ Enter Fashion World", use_container_width=True)
            
            if login_clicked and username and password:
                st.session_state.user_logged_in = True
                st.session_state.username = username
                st.session_state.page = 'main'
                st.rerun()
            elif login_clicked:
                st.error("Please enter both username and password!")
        
        st.markdown("</div>", unsafe_allow_html=True)
        
        # Demo credentials
        st.markdown("""
        <div style="text-align: center; margin-top: 2rem; color: rgba(255, 255, 255, 0.8);">
            <small>💡 Demo: Use any username and password to continue</small>
        </div>
        """, unsafe_allow_html=True)

def show_main_page():
    """Display the main page similar to the provided screenshot"""
    
    # Header section
    st.markdown('<h1 class="main-header">Hello, We Are</h1>', unsafe_allow_html=True)
    st.markdown('<h1 class="main-header">FASHION DESIGN</h1>', unsafe_allow_html=True)
    st.markdown('<p class="main-subtitle">And Trust Us, You Want To Hire Us.</p>', unsafe_allow_html=True)
    
    # Services section
    st.markdown('<h2 style="color: white; text-align: center; margin: 3rem 0 2rem 0; font-size: 2.5rem;">SERVICES</h2>', unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("""
        <div class="service-card">
            <div class="service-icon marketing-icon">🎯</div>
            <h3 style="text-align: center; color: #333; margin-bottom: 1rem;">MARKETING</h3>
            <p style="text-align: center; color: #666; line-height: 1.6;">
                Strategic fashion marketing solutions that elevate your brand presence. 
                From social media campaigns to influencer partnerships, we create buzz 
                around your fashion collections.
            </p>
            <div style="text-align: center; margin-top: 1.5rem;">
                <button style="background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer;">View More</button>
            </div>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div class="service-card">
            <div class="service-icon design-icon">🎨</div>
            <h3 style="text-align: center; color: #333; margin-bottom: 1rem;">DESIGN</h3>
            <p style="text-align: center; color: #666; line-height: 1.6;">
                Innovative fashion design services from concept to creation. 
                Our AI-powered design tools help bring your fashion vision to life 
                with cutting-edge creativity.
            </p>
            <div style="text-align: center; margin-top: 1.5rem;">
                <button style="background: #f5576c; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer;">View More</button>
            </div>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown("""
        <div class="service-card">
            <div class="service-icon development-icon">💻</div>
            <h3 style="text-align: center; color: #333; margin-bottom: 1rem;">DEVELOPMENT</h3>
            <p style="text-align: center; color: #666; line-height: 1.6;">
                Custom fashion technology solutions including e-commerce platforms, 
                virtual try-on experiences, and AI-powered styling recommendations 
                for your fashion business.
            </p>
            <div style="text-align: center; margin-top: 1.5rem;">
                <button style="background: #00f2fe; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer;">View More</button>
            </div>
        </div>
        """, unsafe_allow_html=True)
    
    # Color palette section (similar to screenshot)
    st.markdown('<h2 style="color: white; text-align: center; margin: 4rem 0 2rem 0; font-size: 2.5rem;">COLOR PALETTE</h2>', unsafe_allow_html=True)
    
    # Create color swatches similar to the screenshot
    col1, col2 = st.columns([2, 1])
    
    with col1:
        # Blue and pink gradient similar to the screenshot
        st.markdown("""
        <div style="background: linear-gradient(to right, #4E9BFC, #9BC8FC, #C2E1FC, #FFC2D9, #FF9BE9); 
                    height: 200px; 
                    border-radius: 15px; 
                    display: flex; 
                    align-items: flex-end; 
                    padding: 20px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    animation: slideInLeft 0.8s ease-out;">
            <div style="color: white; font-weight: 600;">
                <div>#4E9BFC</div>
                <div style="margin-left: 80px; margin-top: -20px;">#9BC8FC</div>
                <div style="margin-left: 160px; margin-top: -20px;">#C2E1FC</div>
                <div style="margin-left: 240px; margin-top: -20px;">#FFC2D9</div>
                <div style="margin-left: 320px; margin-top: -20px;">#FF9BE9</div>
            </div>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div style="color: white; font-size: 1.2rem; margin-top: 2rem;">
            <h3>Blue and Pink Color Palette</h3>
            <p style="color: rgba(255,255,255,0.8); line-height: 1.6;">
                Color palette pink, Blue colour palette for modern fashion designs and trendy outfits.
            </p>
        </div>
        """, unsafe_allow_html=True)
    
    # Get Started button
    st.markdown("<br><br>", unsafe_allow_html=True)
    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        if st.button("🚀 Get Started with AI Fashion Assistant", key="get_started", use_container_width=True):
            st.session_state.page = 'chat'
            st.rerun()

def show_chat_page():
    """Display the AI chat interface"""
    
    # Header with back button
    col1, col2, col3 = st.columns([1, 6, 1])
    with col1:
        if st.button("← Back", key="back_btn"):
            st.session_state.page = 'main'
            st.rerun()
    
    with col2:
        st.markdown('<h1 style="color: white; text-align: center; font-size: 2.5rem;">AI Fashion Assistant</h1>', unsafe_allow_html=True)
        st.markdown('<p style="color: rgba(255,255,255,0.8); text-align: center; font-size: 1.2rem;">Ask me anything about fashion, or request custom looks!</p>', unsafe_allow_html=True)
    
    # Chat container
    chat_container = st.container()
    
    with chat_container:
        st.markdown('<div class="chat-container">', unsafe_allow_html=True)
        
        # Display chat messages
        for message in st.session_state.chat_messages:
            if message['role'] == 'user':
                st.markdown(f'<div class="chat-message user-message">👤 {message["content"]}</div>', unsafe_allow_html=True)
            else:
                st.markdown(f'<div class="chat-message ai-message">🤖 {message["content"]}</div>', unsafe_allow_html=True)
                
                # Display image if present
                if 'image_url' in message and message['image_url']:
                    st.image(message['image_url'], caption="Generated Fashion Look", use_column_width=True)
        
        st.markdown('</div>', unsafe_allow_html=True)
    
    # Chat input
    st.markdown("<br>", unsafe_allow_html=True)
    
    # Sample prompts
    st.markdown("💡 *Try these prompts:*")
    col1, col2, col3 = st.columns(3)
    
    with col1:
        if st.button("Show me summer outfits"):
            handle_user_input("Show me some trendy summer outfits")
    
    with col2:
        if st.button("Casual office looks"):
            handle_user_input("Create casual office looks for me")
    
    with col3:
        if st.button("Evening party styles"):
            handle_user_input("Show me elegant evening party styles")
    
    # Main chat input
    user_input = st.text_input("💬 Ask me about fashion or request custom looks:", 
                              placeholder="e.g., 'Show me boho chic outfits' or 'What should I wear for a date night?'",
                              key="chat_input")
    
    col1, col2 = st.columns([4, 1])
    with col2:
        if st.button("Send ✨", key="send_btn") and user_input:
            handle_user_input(user_input)

def handle_user_input(user_input):
    """Process user input and generate AI response"""
    
    # Add user message
    st.session_state.chat_messages.append({
        'role': 'user',
        'content': user_input
    })
    
    # Show typing indicator
    with st.spinner("AI is thinking..."):
        time.sleep(1)  # Simulate processing time
        
        # Check if user wants to see looks/images
        image_keywords = ['show me', 'create', 'generate', 'looks', 'outfits', 'styles', 'design']
        should_generate_image = any(keyword in user_input.lower() for keyword in image_keywords)
        
        # Get AI response
        ai_response = fashion_ai.get_gemini_response(user_input)
        
        # Create response message
        response_message = {
            'role': 'assistant',
            'content': ai_response
        }
        
        # Generate image if requested
        if should_generate_image:
            with st.spinner("Creating your fashion look..."):
                time.sleep(2)  # Simulate image generation time
                image_url = fashion_ai.generate_fashion_image(user_input)
                if image_url:
                    response_message['image_url'] = image_url
                    response_message['content'] += "\n\n✨ I've created a custom fashion look for you based on your request!"
        
        st.session_state.chat_messages.append(response_message)
    
    st.rerun()

# Main app logic
def main():
    if st.session_state.page == 'login' and not st.session_state.user_logged_in:
        show_login_page()
    elif st.session_state.page == 'main':
        show_main_page()
    elif st.session_state.page == 'chat':
        show_chat_page()

if _name_ == "_main_":
    main()
