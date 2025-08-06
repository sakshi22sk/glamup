# ✅ Full Streamlit app.py for Fashion Bot (Complete, Professional UI)
# Includes: Login ➤ About ➤ AI Chatbot ➤ Gemini + DeepAI Integration ➤ Filtered Words ➤ Saved Image History

import streamlit as st
import requests
import base64

# ------------------ CONFIG ------------------
GEMINI_API_KEY = "AIzaSyBHDMfsOya6pVQRA-RWsZqJSjV9fYKMisc"
DEEPAI_API_KEY = "3fdb33dd-28dc-47d5-9b8c-0ca25f9e1b71"

st.set_page_config(page_title="👗 Fashion Bot", layout="centered")

# ------------------ Blocked Word Filter ------------------
encoded_blocked_words = [
    "YmlraW5p", "dW5kZXJ3ZWFy", "bnVkZQ==", "Y2xldmFnZQ==", "dHJhbnNwYXJlbnQ=",
    "YnJh", "cGFudHk=", "bGluZ2VyaWU=", "c2VkdWN0aXZl", "aG90", "c2V4eQ==",
    "cmV2ZWFsaW5n", "c2hvcnQgc2tpcnQ=", "bG93IGN1dA==", "dGlnaHQgZHJlc3M=",
    "YmFyZSBjaGVzdA==", "c2VlLXRocm91Z2g=", "ZXhwbGljaXQ=", "cHJvdm9jYXRpdmU="
]
blocked_words = [base64.b64decode(b).decode("utf-8") for b in encoded_blocked_words]

def is_safe(prompt):
    return not any(word in prompt.lower() for word in blocked_words)

# ------------------ AI Integration ------------------
def get_gemini_response(prompt):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={GEMINI_API_KEY}"
    payload = {"contents": [{"role": "user", "parts": [{"text": prompt}]}]}
    res = requests.post(url, json=payload)
    return res.json().get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "No response.")

def get_deepai_image(prompt):
    headers = {"api-key": DEEPAI_API_KEY}
    res = requests.post("https://api.deepai.org/api/text2img", data={"text": prompt}, headers=headers)
    return res.json().get("output_url", None)

# ------------------ Auth & State ------------------
users = {"admin": "admin123", "demo": "demo123"}
if "logged_in" not in st.session_state: st.session_state.logged_in = False
if "page" not in st.session_state: st.session_state.page = "login"
if "history" not in st.session_state: st.session_state.history = []

# ------------------ Login Page ------------------
def login_ui():
    st.title("🔐 Fashion Bot Login")
    user = st.text_input("Username")
    pwd = st.text_input("Password", type="password")
    if st.button("Login"):
        if users.get(user) == pwd:
            st.session_state.logged_in = True
            st.session_state.page = "about"
            st.success("✅ Login Successful")
        else:
            st.error("❌ Invalid credentials")

# ------------------ About Us ------------------
def about_ui():
    st.title("👗 About Fashion Bot")
    st.markdown("""
    Fashion Bot is your virtual stylist for any occasion.
    - 🧠 AI-Powered outfit recommendations
    - 📸 Visual inspiration through generated images
    - 🎯 Tailored advice for events like parties, dates, weddings

    👉 Click below to open the chatbot!
    """)
    if st.button("Launch Chatbot ➤"):
        st.session_state.page = "chatbot"

# ------------------ Chatbot Page ------------------
def chatbot_ui():
    st.title("🤖 AI Fashion Chatbot")
    prompt = st.text_input("🧵 Describe your style query:")

    if st.button("Get Outfit Suggestion"):
        if not prompt.strip():
            st.warning("Please enter a fashion question.")
        elif not is_safe(prompt):
            st.error("⚠️ Please avoid inappropriate or revealing clothing descriptions.")
        else:
            with st.spinner("Thinking in style ✨..."):
                suggestion = get_gemini_response(prompt)
                image_url = get_deepai_image(prompt + ", full-body, high quality, fashion photo")

            st.success(suggestion)
            if image_url:
                st.image(image_url, width=300)
                st.session_state.history.append({"prompt": prompt, "image": image_url})
            else:
                st.info("No image generated.")

    if st.session_state.history:
        st.markdown("### 🖼️ Recent Looks")
        for item in reversed(st.session_state.history[-3:]):
            st.image(item["image"], caption=item["prompt"], width=250)

    if st.button("🔙 Back to About Page"):
        st.session_state.page = "about"

# ------------------ Page Routing ------------------
if not st.session_state.logged_in:
    login_ui()
elif st.session_state.page == "about":
    about_ui()
elif st.session_state.page == "chatbot":
    chatbot_ui()
