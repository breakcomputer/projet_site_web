// Données simulées
const salesData = {
    totalSales: 150000,
    activeClients: 1200,
    conversionRate: 7.5,
    monthlySales: [12000, 15000, 18000, 22000, 20000, 25000],
    months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin']
};

// Mettre à jour les statistiques
document.getElementById("total-sales").innerText = `${salesData.totalSales.toLocaleString()} €`;
document.getElementById("active-clients").innerText = salesData.activeClients;
document.getElementById("conversion-rate").innerText = `${salesData.conversionRate}%`;

// Créer un graphique
const ctx = document.getElementById("salesChart").getContext("2d");
new Chart(ctx, {
    type: 'line',
    data: {
        labels: salesData.months,
        datasets: [{
            label: 'Ventes mensuelles (€)',
            data: salesData.monthlySales,
            borderColor: '#4CAF50',
            borderWidth: 2,
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    }
});
