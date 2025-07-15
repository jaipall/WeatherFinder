# ⛅ Weather Forecast Web App

A sleek and responsive **Weather Forecast App** built using **HTML**, **CSS**, and **JavaScript**, powered by the **OpenWeatherMap API**.

> 🔍 Instantly fetch weather data for any city in the world and get real-time updates on temperature, humidity, and weather conditions.

---

## 🌟 Features

- 🌐 Search for any city worldwide
- 📍 Real-time weather conditions
- 🌡️ Temperature, humidity, and weather description
- 📱 Responsive UI for all screen sizes
- 😎 Error handling with user-friendly messages
- 🚀 Powered by **OpenWeatherMap API**

---

## 📸 Screenshots

### 🏠 Home Page
![Home Page](https://res.cloudinary.com/dtjjgiitl/image/upload/q_auto:good,f_auto,fl_progressive/v1752587564/awqpldi7y7zkxwhd2hvy.jpg)

---

### 🔎 Search Result Page
![Search Page](https://res.cloudinary.com/dtjjgiitl/image/upload/q_auto:good,f_auto,fl_progressive/v1752587630/mubhgkb7nudtcuyay9yv.jpg)

---

### ❌ Not Found Page (Invalid City)
![Not Found](https://res.cloudinary.com/dtjjgiitl/image/upload/q_auto:good,f_auto,fl_progressive/v1752587680/fdizdbodsceslohqo60e.jpg)

---

## 🛠️ Tech Stack

| Tech         | Purpose                     |
|--------------|-----------------------------|
| HTML         | Structure of the app        |
| CSS          | Styling and responsiveness  |
| JavaScript   | Logic and API integration   |
| OpenWeather API | Fetch weather data       |

---

## 🔑 API Integration

- This project uses **OpenWeatherMap API**
- You can get your API key by signing up here: [https://openweathermap.org/api](https://openweathermap.org/api)

```js
const apiKey = "YOUR_API_KEY";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
