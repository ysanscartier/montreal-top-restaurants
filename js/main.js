document.addEventListener('DOMContentLoaded', function() {
  // Données des restaurants
  const restaurants = [
    {
      name: 'Joe Beef',
      cuisines: ['Française', 'Contemporaine'],
      address: '2491 Rue Notre-Dame O.',
      rating: 4.7,
      review: 'Une expérience gastronomique exceptionnelle. Le foie gras était divin et le service impeccable. L\'ambiance unique du restaurant en fait un incontournable de la scène culinaire montréalaise.'
    },
    {
      name: 'Au Pied de Cochon',
      cuisines: ['Québécoise', 'Gastronomique'],
      address: '536 Avenue Duluth E.',
      rating: 4.6,
      review: 'La poutine au foie gras est une révélation! Martin Picard est un génie culinaire. Un must pour découvrir la cuisine québécoise revisitée.'
    },
    // ... autres restaurants ...
  ];

  // Récupérer tous les types de cuisine uniques
  const allCuisines = [...new Set(restaurants.flatMap(r => r.cuisines))];

  // Créer les boutons de filtre
  const filtersContainer = document.querySelector('.filters');
  filtersContainer.innerHTML = `
    <button class='filter-btn active' data-cuisine='all'>Tous</button>
    ${allCuisines.map(cuisine => 
      `<button class='filter-btn' data-cuisine='${cuisine}'>${cuisine}</button>`
    ).join('')}
  `;

  // Gérer le filtrage
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Mettre à jour les boutons actifs
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Filtrer les restaurants
      const selectedCuisine = this.dataset.cuisine;
      const filteredRestaurants = selectedCuisine === 'all'
        ? restaurants
        : restaurants.filter(r => r.cuisines.includes(selectedCuisine));

      // Mettre à jour l'affichage
      updateRestaurants(filteredRestaurants);
    });
  });

  // Fonction pour mettre à jour l'affichage des restaurants
  function updateRestaurants(restaurantsToShow) {
    const grid = document.querySelector('.restaurant-grid');
    grid.innerHTML = restaurantsToShow.map(restaurant => `
      <div class='restaurant-card'>
        <h2 class='restaurant-name'>${restaurant.name}</h2>
        ${restaurant.cuisines.map(cuisine =>
          `<span class='cuisine'>${cuisine}</span>`
        ).join('')}
        <div class='restaurant-info'>
          ${restaurant.address} | <span class='restaurant-rating'>★ ${restaurant.rating}/5</span>
        </div>
        <div class='review'>${restaurant.review}</div>
      </div>
    `).join('');
  }

  // Affichage initial
  updateRestaurants(restaurants);
});