# NutriBite

NutriBite is a simple web application that helps users analyze the nutritional content of their meals, log their daily food intake, and receive quick insights for healthier eating habits.

## Features

- **Food Analysis:** Enter any food item or meal and get instant nutritional breakdown using the Nutritionix API.
- **Daily Log:** Add analyzed foods to your daily log, complete with date and time stamps.
- **Quick Insights:** Get helpful tips and highlights about your food choices.
- **User Feedback:** Let us know if you found NutriBite helpful with a simple YES/NO button.

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Edge, etc.)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code, or any local server to avoid CORS issues.

### Installation

1. **Clone the repository:**
    
    git clone https://github.com/your-username/NutriBite.git
    cd NutriBite
    

2. **Get Nutritionix API credentials:**
    - Sign up at [Nutritionix](https://www.nutritionix.com/business/api).
    - Get your App ID and API Key.
    - Replace the placeholders in `src/index.js`:
    
      ```js
      const APP_ID = 'YOUR_APP_ID';
      const API_KEY = 'YOUR_API_KEY';
      ```

3. **Run the app:**
    - Open `index.html` with Live Server or your preferred local server.

## Usage

1. Enter a food item (e.g., "1 cup of rice", "grilled chicken") in the input box.
2. Click **Analyze Food** to see the nutritional breakdown.
3. Click **Add to Daily Log** to save the result with the current date and time.
4. View your daily log and clear it as needed.
5. Check the **Quick Insights** section for helpful tips about your food.
6. Let us know if you found NutriBite helpful!

## Technologies Used

- HTML5 & CSS3
- JavaScript (ES6)
- [Nutritionix API](https://www.nutritionix.com/business/api)

## Folder Structure nnn


NutriBite
assets
                # Images and logo

css/
  styles.css    # Main stylesheet

src/
    index.js     # Main JavaScript file

index.html       # Main HTML file

README.md        # This file



## Enjoy using NutriBite and eat healthy! 