const newPoliticians = [
    {
        id: 1,
        name: "Nancy Pelosi",
        party: "Independent",
        state: "New York",
        trades: 10,
        issuers: 5,
        volume: "1M",
        lastTraded: "2025-01-15",
        image: "./images/nancy_pelosi.jpg" // Add "./" at the beginning
    },
    // Add more sample politicians here
];

async function fetchNewPoliticians() {
    const apiKey = 'cI7iuYn7dlVu1kNAwDnvbVGvHbizUrzPWM5TimpI';
    const endpoint = `https://api.congress.gov/v3/member?api_key=${apiKey}`;

    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data); // Check the structure of the response
        const politicians = data.members.map(politician => ({
            id: politician.bioguideID,
            registrantId: 'P40014052', // Set all candidate IDs to P40014052
            name: politician.name,
            party: politician.partyName || 'Unknown',
            state: politician.state || 'Unknown',
            chamber: politician.terms[0]?.chamber || 'Unknown',
            trades: Math.floor(Math.random() * 100), // Fake data
            issuers: Math.floor(Math.random() * 50), // Fake data
            volume: `${Math.floor(Math.random() * 100)}M`, // Fake data
            lastTraded: '2025-01-15', // Fake data
            image: politician.depiction?.imageUrl || './images/nancy_pelosi.jpg' // Use API image or placeholder
        }));

        displayNewPoliticians(politicians);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayNewPoliticians(politicians) {
    const container = document.getElementById('new-politicians-container');
    container.innerHTML = '';

    politicians.forEach(politician => {
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
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            console.log(`Clicked on ${politician.name} with candidate ID: ${politician.registrantId}`);
            fetchLobbyingData(politician.registrantId);
        });
        container.appendChild(card);
    });
}

async function fetchLobbyingData(candidateId) {
    const apiKey = '4Hs7xoXStKnuSSpzPPuQgaOBUFmymHnCWeCBYGsK';
    const endpoint = `https://api.open.fec.gov/v1/candidate/${candidateId}/totals/?api_key=${apiKey}`;

    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Lobbying Data:', data);
        displayLobbyingTable(data.results);
    } catch (error) {
        console.error('Error fetching lobbying data:', error);
    }
}

function displayLobbyingTable(lobbyingData) {
    const container = document.getElementById('new-politicians-container');
    container.innerHTML = '<h2>Lobbying Data</h2>';

    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Politicians';
    backButton.onclick = fetchNewPoliticians;
    container.appendChild(backButton);

    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Contributor</th>
            <th>Amount</th>
        </tr>
    `;

    lobbyingData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.contributor_name || 'N/A'}</td>
            <td>${item.total || 'N/A'}</td>
        `;
        table.appendChild(row);
    });

    container.appendChild(table);
}

function searchNewPoliticians() {
    const nameSearch = document.getElementById('new-politician-search').value.toLowerCase();
    const partyFilter = document.getElementById('party-filter').value;
    const chamberFilter = document.getElementById('chamber-filter').value;
    const stateFilter = document.getElementById('state-filter').value;

    const filteredPoliticians = newPoliticians.filter(politician => {
        const matchesName = politician.name.toLowerCase().includes(nameSearch);
        const matchesParty = partyFilter === 'all' || politician.party === partyFilter;
        const matchesChamber = chamberFilter === 'all' || politician.chamber === chamberFilter;
        const matchesState = stateFilter === 'all' || politician.state === stateFilter;

        return matchesName && matchesParty && matchesChamber && matchesState;
    });

    displayNewPoliticians(filteredPoliticians);
}

// Call the function to fetch and display politicians
fetchNewPoliticians(); 