document.addEventListener("DOMContentLoaded", function () {
    axios.get('http://localhost:3001/api/combined')
        .then(response => {
            const characters = response.data;
            const characterContainer = document.getElementById('characters');
            characterContainer.innerHTML = '';

            characters.forEach(character => {
                const characterCard = document.createElement('div');
                characterCard.classList.add('col-md-4', 'character-card');

                characterCard.innerHTML = `
                    <div class="text-center">
                        <img src="${character.image}" alt="${character.name}" class="character-img">
                    </div>
                    <div class="mt-3">
                        <p class="character-name text-center">${character.name}</p>
                        <p class="character-status text-center">Estado: ${character.status} | Especie: ${character.species}</p>
                        <p class="character-joke text-center" id="joke-${character.id}">"${character.joke}"</p>
                        <div class="text-center">
                            <button class="btn btn-primary" onclick="changeJoke(${character.id})">Cambiar frase</button>
                        </div>
                    </div>
                `;

                characterContainer.appendChild(characterCard);
            });
        })
        .catch(error => {
            console.error('Error al obtener los personajes:', error);
        });
});

function changeJoke(characterId) {
    axios.get('http://localhost:3001/api/new-joke')
        .then(response => {
            const joke = response.data.joke;
            document.getElementById(`joke-${characterId}`).innerText = `"${joke}"`;
        })
        .catch(error => {
            console.error('Error al obtener una nueva broma:', error);
        });
}
