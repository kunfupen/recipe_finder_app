const searchForm = document.getElementById('search-form');
const resultsContainer = document.getElementById('results');
const resultsHeading = document.getElementById('results-heading');
const errorMessage = document.getElementById('error-message');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('search-input').value.trim();
    
    if (!query) {
        errorMessage.classList.remove('hidden');
        errorMessage.textContent = 'Please enter a search term';
        resultsContainer.innerHTML = '';
        return;
    }

    errorMessage.classList.add('hidden');
    resultsContainer.innerHTML = '<p class="loading">Searching...</p>';

    try {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
        );
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
        <div class="meal-card" data-id="${meal.idMeal}">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-card-body">
                <h3>${meal.strMeal}</h3>
                <span class="badge badge-category">${meal.strCategory}</span>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.meal-card').forEach(card => {
        card.addEventListener('click', () => {
            const mealId = card.dataset.id;
            fetchMealDetails(mealId);
        });
    });
}

async function fetchMealDetails(id) {
    try {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        const meal = data.meals[0];

        displayMealDetails(meal);
    } catch (error) {   
        console.error('Error fetching meal details:', error);
    }
}

function displayMealDetails(meal) {
    resultsHeading.style.display = 'none';
    
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push(`<li>
                <span class="ingredient-name">${ingredient.trim()}</span> 
                <span class="ingredient-measure">${measure ? measure.trim() : ''}</span>
            </li>`
            );
        }
    }

    const instructionParagraphs = meal.strInstructions
        .split(/\r?\n/)
        .filter(p => p.trim() !== '')
        .map(p => `<p class="instruction-step">${p.trim()}</p>`)
        .join('');


    resultsContainer.innerHTML = `
        <div class="meal-detail">
            <button class="back-button">Back to Results</button>
            <div class="meal-detail-content">
                <div class="meal-detail-left">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                </div>
                <div class="meal-detail-right">
                    <h2 class="meal-detail-title">${meal.strMeal}</h2>
                    <div class="meal-detail-badges">
                        <span class="badge badge-category">${meal.strCategory}</span>
                        <span class="badge badge-area">${meal.strArea}</span>
                    </div>
                    <h3>Ingredients</h3>
                    <ul class="ingredients-list">${ingredients.join('')}</ul>
                    <h3>Instructions</h3>
                    <div class="instructions">${instructionParagraphs}</div>
                    ${meal.strYoutube ? `<a href="${meal.strYoutube}" target="_blank" class="youtube-link">Watch on YouTube</a>` : ''}
                </div>
            </div>
        </div>
    `;

    document.querySelector('.back-button').addEventListener('click', () => {
        resultsHeading.style.display = 'block';
        searchForm.dispatchEvent(new Event('submit'));
    });
}