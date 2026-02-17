const searchForm = document.getElementById('search-form');
const resultsContainer = document.getElementById('results');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('search-input').value;
    if (!query) return;

    resultsContainer.innerHTML = '<p class="loading">Searching...</p>';

    try {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
        )
        const data = await response.json();

        if (!data.meals) {
            resultsContainer.innerHTML = '<p class="no-results">No recipes found. Try a different search term.</p>';
            return;
        }

        displayMeals(data.meals);
    } catch (error) {
        console.error('Error fetching data:', error);
        resultsContainer.innerHTML = '<p class="error">Something went wrong. Please try again.</p>';
    }
});

function displayMeals(meals) {
    resultsContainer.innerHTML = meals.map(meal => `
        <div class="meal-card">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <a href="${meal.strSource || '#'}" target="_blank">View Recipe</a>
        </div>
    `).join('');
}