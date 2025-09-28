const apiKey = 'c81ca902294f480aadbd85e1a6d5c756';
const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=40`;

const gamesList = document.getElementById('lista-videojuegos');
const platformFilter = document.getElementById('filtro-plataforma');
const genreFilter = document.getElementById('filtro-genero');
const filterBtn = document.getElementById('btn-filtrar');

let allGames = [];
let filteredGames = [];
let platforms = [];
let genres = [];


window.addEventListener('load', function() {
    loadGames();
});

async function loadGames() {
    try {
        document.getElementById('cargando').classList.remove('hidden');
        document.getElementById('error').classList.add('hidden');
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        allGames = data.results.map(game => {
            let desc = game.description_raw ? game.description_raw.substring(0, 100) + '...' : 'Sin descripción';
            return {
                id: game.id,
                name: game.name,
                image: game.background_image,
                description: desc,
                genre: game.genres.length > 0 ? game.genres[0].name : 'Varios',
                platforms: game.platforms.map(p => p.platform.name),
                released: game.released || 'Próximamente',
                rating: game.rating || 'N/A',
                game_url: game.website || `https://rawg.io/games/${game.slug}`
            };
        });
        
        platforms = [...new Set(allGames.flatMap(game => game.platforms))].sort();
        genres = [...new Set(allGames.map(game => game.genre))].sort();
        
        updateFilters();
        filteredGames = allGames.slice();
        renderGames();
        
        document.getElementById('cargando').classList.add('hidden');
        
    } catch (err) {
        console.log('Error cargando datos:', err);
        document.getElementById('error').textContent = 'Error al cargar. Usando datos de ejemplo...';
        document.getElementById('cargando').classList.add('hidden');
        loadSampleData();
    }
}

function updateFilters() {
    platformFilter.innerHTML = '<option value="">Todas</option>';
    platforms.forEach(platform => {
        platformFilter.innerHTML += `<option value="${platform}">${platform}</option>`;
    });
    
    genreFilter.innerHTML = '<option value="">Todos</option>';
    genres.forEach(genre => {
        genreFilter.innerHTML += `<option value="${genre}">${genre}</option>`;
    });
}

function renderGames() {
    if (filteredGames.length === 0) {
        gamesList.innerHTML = '<p>No hay juegos con esos filtros</p>';
        return;
    }
    
    gamesList.innerHTML = filteredGames.map(game => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src="${game.image || 'https://via.placeholder.com/300x200'}" 
                 alt="${game.name}" 
                 class="w-full h-48 object-cover"
                 onerror="this.src='https://via.placeholder.com/300x200'">
            <div class="p-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2">${game.name}</h3>
                <p class="text-gray-600 text-sm mb-3">${game.description}</p>
                
                <div class="space-y-1 mb-4 text-xs">
                    <p><span class="font-semibold">Género:</span> ${game.genre}</p>
                    <p><span class="font-semibold">Plataformas:</span> ${game.platforms.join(', ')}</p>
                    <p><span class="font-semibold">Lanzamiento:</span> ${game.released}</p>
                </div>
                
                <a href="${game.game_url}" target="_blank" 
                   class="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-2 px-4 rounded font-medium transition duration-200">
                    Jugar gratis
                </a>
            </div>
        </div>
    `).join('');
}

function filterGames() {
    const platform = platformFilter.value;
    const genre = genreFilter.value;
    
    filteredGames = allGames.filter(game => {
        const platformMatch = !platform || game.platforms.includes(platform);
        const genreMatch = !genre || game.genre === genre;
        return platformMatch && genreMatch;
    });
    
    renderGames();
}

function loadSampleData() {
    allGames = [
        {
            name: "Valorant",
            genre: "Shooter",
            platforms: ["PC"],
            image: "valorant.jpg",
            description: "Shooter táctico 5v5",
            released: "2020-06-02",
            rating: "4.6",
            game_url: "https://playvalorant.com/" 
        },
        {
            name: "League of Legends", 
            genre: "MOBA",
            platforms: ["PC"],
            image: "lol.jpg",
            description: "MOBA popular",
            released: "2009-10-27",
            rating: "4.7",
            game_url: "https://www.leagueoflegends.com/" 
        }
    ];
    
    platforms = ["PC", "PlayStation", "Xbox"];
    genres = ["Shooter", "MOBA", "RPG"];
    
    updateFilters();
    filteredGames = allGames.slice();
    renderGames();
}

filterBtn.addEventListener('click', filterGames);
platformFilter.addEventListener('change', filterGames);
genreFilter.addEventListener('change', filterGames);