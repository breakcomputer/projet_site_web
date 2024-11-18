// URL de l'API publique (données des pays)
const API_URL = "https://restcountries.com/v3.1/all";

// Référence au canvas et à la barre de recherche
const ctx = document.getElementById("populationChart").getContext("2d");
const searchBar = document.getElementById("searchBar");

// Variable pour le graphique et les données chargées
let chart;
let countriesData = [];

// Fonction pour créer le graphique
function createChart(labels, data) {
    if (chart) chart.destroy(); // Détruire l'ancien graphique s'il existe

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "Population",
                data: data,
                backgroundColor: "rgba(76, 175, 80, 0.6)",
                borderColor: "rgba(76, 175, 80, 1)",
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Pays',
                    },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Population',
                    },
                },
            },
        }
    });
}

// Fonction pour charger les données depuis l'API
async function fetchData() {
    const response = await fetch(API_URL);
    const data = await response.json();
    countriesData = data.map(country => ({
        name: country.name.common,
        population: country.population
    }));
    updateChart(countriesData);
}

// Mettre à jour le graphique avec les données
function updateChart(data) {
    const sortedData = data.sort((a, b) => b.population - a.population).slice(0, 10); // Top 10 pays
    const labels = sortedData.map(item => item.name);
    const populations = sortedData.map(item => item.population);
    createChart(labels, populations);
}

// Filtrer les données en fonction de la recherche
searchBar.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filteredData = countriesData.filter(country =>
        country.name.toLowerCase().includes(query)
    );
    updateChart(filteredData);
});

// Charger les données au démarrage
fetchData();
