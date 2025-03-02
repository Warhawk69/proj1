// Sample policy data
let policies = [
    {
        id: 1,
        title: "Green Energy Initiative",
        description: "Proposal to transition to 100% renewable energy by 2050",
        category: "environmental",
        status: "in-progress",
        date: "2024-01-15"
    },
    {
        id: 2,
        title: "Universal Healthcare Act",
        description: "Expanding healthcare coverage to all citizens",
        category: "healthcare",
        status: "proposed",
        date: "2024-02-01"
    },
    // Add more sample policies here
];

// Function to display policies
function displayPolicies(filteredPolicies = policies) {
    const container = document.getElementById('policies-container');
    container.innerHTML = '';

    filteredPolicies.forEach(policy => {
        const card = document.createElement('div');
        card.className = 'policy-card';
        card.innerHTML = `
            <h3>${policy.title}</h3>
            <span class="policy-status" style="background-color: ${getStatusColor(policy.status)}">${policy.status}</span>
            <p>${policy.description}</p>
            <p>Category: ${policy.category}</p>
            <p>Date: ${policy.date}</p>
        `;
        container.appendChild(card);
    });
}

// Function to get status color
function getStatusColor(status) {
    const colors = {
        'proposed': '#ffd700',
        'in-progress': '#87ceeb',
        'implemented': '#90ee90',
        'failed': '#ffcccb'
    };
    return colors[status] || '#gray';
}

// Search function
function searchPolicies() {
    const searchTerm = document.getElementById('policy-search').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    const statusFilter = document.getElementById('status-filter').value;

    const filteredPolicies = policies.filter(policy => {
        const matchesSearch = policy.title.toLowerCase().includes(searchTerm) ||
                            policy.description.toLowerCase().includes(searchTerm);
        const matchesCategory = categoryFilter === 'all' || policy.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' || policy.status === statusFilter;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    displayPolicies(filteredPolicies);
}

// Event listeners for filters
document.getElementById('category-filter').addEventListener('change', searchPolicies);
document.getElementById('status-filter').addEventListener('change', searchPolicies);

// Initial display
displayPolicies();

// Sample politician data
let politicians = [
    {
        id: 1,
        name: "Gerry Connolly",
        party: "Democrat",
        state: "Virginia",
        trades: 26,
        issuers: 3,
        volume: "306K",
        lastTraded: "2025-02-05",
        image: "path/to/image1.jpg"
    },
    {
        id: 2,
        name: "Mark Green",
        party: "Republican",
        state: "Tennessee",
        trades: 75,
        issuers: 9,
        volume: "12.77M",
        lastTraded: "2025-02-03",
        image: "path/to/image2.jpg"
    },
    {
        id: 3,
        name: "Nancy Pelosi",
        party: "Democrat",
        state: "California",
        trades: 100,
        issuers: 50,
        volume: "50M",
        lastTraded: "2025-01-20",
        image: "images/nancy_pelosi.jpg"
    },
    // Add more sample politicians here
];

// Function to display politicians
function displayPoliticians(filteredPoliticians = politicians) {
    const container = document.getElementById('politicians-container');
    container.innerHTML = '';

    filteredPoliticians.forEach(politician => {
        const card = document.createElement('div');
        card.className = 'politician-card';
        card.innerHTML = `
            <img src="${politician.image}" alt="${politician.name}">
            <h3>${politician.name}</h3>
            <p>${politician.party} / ${politician.state}</p>
            <p>${politician.trades} Trades</p>
            <p>${politician.issuers} Issuers</p>
            <p>${politician.volume} Volume</p>
            <p>Last Traded: ${politician.lastTraded}</p>
        `;
        container.appendChild(card);
    });
}

// Search function for politicians
function searchPoliticians() {
    const nameSearch = document.getElementById('politician-search').value.toLowerCase();
    const issuerSearch = document.getElementById('issuer-search').value.toLowerCase();
    const partyFilter = document.getElementById('party-filter').value;

    const filteredPoliticians = politicians.filter(politician => {
        const matchesName = politician.name.toLowerCase().includes(nameSearch);
        const matchesIssuer = politician.issuers.toString().includes(issuerSearch);
        const matchesParty = partyFilter === 'all' || politician.party.toLowerCase() === partyFilter;

        return matchesName && matchesIssuer && matchesParty;
    });

    displayPoliticians(filteredPoliticians);
}

// Initial display
displayPoliticians();

async function fetchPoliticians() {
    console.log("Fetching politicians...");
    const apiKey = 'cI7iuYn7dlVu1kNAwDnvbVGvHbizUrzPWM5TimpI';
    const endpoint = 'https://api.congress.gov/v3/member?api_key=cI7iuYn7dlVu1kNAwDnvbVGvHbizUrzPWM5TimpI';

    try {
        const response = await fetch(endpoint, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data); // Check the structure of the response
        displayPoliticians(data.results); // Adjust based on actual data structure
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayPoliticians(politicians) {
    const container = document.getElementById('politicians-container');
    container.innerHTML = '';

    politicians.forEach(politician => {
        const card = document.createElement('div');
        card.className = 'politician-card';
        card.innerHTML = `
            <img src="${politician.image || 'default.jpg'}" alt="${politician.name}">
            <h3>${politician.name}</h3>
            <p>${politician.party} / ${politician.state}</p>
            <p>${politician.trades || 'N/A'} Trades</p>
            <p>${politician.issuers || 'N/A'} Issuers</p>
            <p>${politician.volume || 'N/A'} Volume</p>
            <p>Last Traded: ${politician.lastTraded || 'N/A'}</p>
        `;
        container.appendChild(card);
    });
}

// Call the function to fetch and display politicians
fetchPoliticians(); 