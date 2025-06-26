
// Nutritionix API credentials
const APP_ID = '76d92f06';
const API_KEY = '7440bb0647d386d2f28d24ccec8c5153';

// DOM Elements
const analyzeBtn = document.getElementById('analyze-food-btn');
const foodInput = document.getElementById('food-input');
const resultsCard = document.querySelector('.results-card');
const addToLogBtn = document.getElementById('add-to-log-btn');
const dailyLogList = document.getElementById('daily-log-list');
const clearLogBtn = document.getElementById('clear-log-btn');

// Analyze Food Button Click
analyzeBtn.addEventListener('click', async () => {
    const query = foodInput.value.trim();
    if (!query) {
        resultsCard.innerHTML = `<p class="placeholder-text">Please enter a food item.</p>`;
        return;
    }
    resultsCard.innerHTML = `<p>Loading...</p>`;
    try {
        const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-app-id': APP_ID,
                'x-app-key': API_KEY
            },
            body: JSON.stringify({ query })
        });
        if (!response.ok) throw new Error('API error');
        const data = await response.json();
        displayNutrition(data);
    } catch (error) {
        resultsCard.innerHTML = `<p class="placeholder-text">Error fetching nutrition info. Please try again.</p>`;
    }
});

// Display Nutrition Results
function displayNutrition(data) {
    if (!data.foods || !data.foods.length) {
        resultsCard.innerHTML = `<p class="placeholder-text">No nutrition data found.</p>`;
        return;
    }
    const food = data.foods[0];
    resultsCard.innerHTML = `
        <h3>${food.food_name}</h3>
        <ul>
            <li>Serving: ${food.serving_qty} ${food.serving_unit}</li>
            <li>Calories: ${food.nf_calories}</li>
            <li>Protein: ${food.nf_protein}g</li>
            <li>Carbs: ${food.nf_total_carbohydrate}g</li>
            <li>Fat: ${food.nf_total_fat}g</li>
        </ul>
    `;
    showFoodInsights(food);
}

function showFoodInsights(food) {
    const insightsDiv = document.getElementById('food-insights');
    let insights = `<h4>Food Insights for "${food.food_name}"</h4><ul>`;

    // Example insights logic
    if (food.nf_protein > 10) {
        insights += `<li>High in protein!</li>`;
    }
    if (food.nf_total_fat < 5) {
        insights += `<li>Low fat content.</li>`;
    }
    if (food.nf_calories > 300) {
        insights += `<li>High calorie food. Consider portion size.</li>`;
    }
    if (food.nf_total_carbohydrate > 40) {
        insights += `<li>High in carbohydrates.</li>`;
    }
    if (insights === `<h4>Food Insights for "${food.food_name}"</h4><ul>`) {
        insights += `<li>No special highlights for this food.</li>`;
    }
    insights += `</ul>`;
    insightsDiv.innerHTML = insights;
}

// Add to Daily Log

addToLogBtn.addEventListener('click', () => {
    const logEntry = resultsCard.querySelector('h3');
    const logDetails = resultsCard.querySelector('ul');
    if (!logEntry || !logDetails) return;

    // Get current date and time
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Create log entry container
    const entryDiv = document.createElement('div');
    entryDiv.style.marginBottom = '16px';
    entryDiv.style.padding = '8px 0';
    entryDiv.style.borderBottom = '1px solid #e0e0e0';

    // Date and time at the top
    const dateP = document.createElement('p');
    dateP.style.fontWeight = 'bold';
    dateP.style.margin = '0 0 4px 0';
    dateP.textContent = `[${dateString} ${timeString}]`;

    // Food name and nutrition info below
    const foodName = document.createElement('div');
    foodName.textContent = logEntry.textContent;
    foodName.style.fontSize = '1.1em';
    foodName.style.marginBottom = '2px';

    // Clone the nutrition list for display
    const nutritionList = logDetails.cloneNode(true);

    // Append to entryDiv
    entryDiv.appendChild(dateP);
    entryDiv.appendChild(foodName);
    entryDiv.appendChild(nutritionList);

    const placeholder = dailyLogList.querySelector('.placeholder-text');
    if (placeholder) dailyLogList.innerHTML = '';

    // Adds to daily log
    dailyLogList.appendChild(entryDiv);
    window.location.hash = '#daily-log';
});


// Clear Daily Log
clearLogBtn.addEventListener('click', () => {
    dailyLogList.innerHTML = `<p class="placeholder-text">Add analyzed foods to your log.</p>`;
});

// Like/Dislike Buttons
let helpfulCount = 0;
let notHelpfulCount = 0;
document.getElementById('helpful-btn').addEventListener('click', () => {
    helpfulCount++;
    document.getElementById('helpful-count').textContent = ` ${helpfulCount} `;
});
document.getElementById('Nothelpful-btn').addEventListener('click', () => {
    notHelpfulCount++;
    document.getElementById('Nothelpful-count').textContent = ` ${notHelpfulCount} `;
});