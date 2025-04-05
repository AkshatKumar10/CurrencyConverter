# 💱 Currency Converter App
A simple and intuitive Currency Converter built with React Native using Expo. It allows users to convert amounts between different currencies using real-time exchange rates fetched from a public API.

## 🚀 Features
- Real-time currency conversion using live exchange rates.

- Input the amount and select currencies to convert from and to.

- Displays accurate conversion results with appropriate currency symbols.

- Graceful error handling with user-friendly messages.


## 🧰 Tech Stack
- **React Native (Expo)**

- **TypeScript/JavaScript**

## 📦 Installation & Running the App
### 🔧 Prerequisites
- Node.js (v16 or higher)

- Expo CLI:
```bash
npm install -g expo-cli
```


### 📲 Steps to Run
1. Clone the Repository
```bash
git clone https://github.com/AkshatKumar10/CurrencyConverter.git
cd currency-converter
```

2. Install Dependencies
```bash
npm install
```

3. Start the Expo Server
```bash
npx expo start
```

4. Run on Your Device or Simulator

- **On Physical Device**: Scan the QR code using the Expo Go app.

- **On Simulator**: Press i (iOS) or a (Android) in the terminal.

## ⚙️ API Used
Exchange Rate API: **https://open.er-api.com**

Rates are updated periodically.

## 📌 Known Challenges
- **Rate Limits**: The free API has usage limits and may occasionally fail under high traffic.

- **Symbol Mapping**: Mapping each currency code to its symbol required a custom lookup.

- **Platform Differences**: UI components like pickers behave slightly differently on Android vs iOS.

