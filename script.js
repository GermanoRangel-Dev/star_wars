let currentPageUrl = 'https://swapi.dev/api/people/';

window.onload = async () => {
  try{
    await loadCharacters(currentPageUrl);
  } catch (error) {
    console.log(error);
    alert('Erro ao carregar Cards!');
  }

  const nextButton = document.getElementById('next-button');
  const backButton = document.getElementById('back-button');

  nextButton.addEventListener('click', loadNextPage);
  backButton.addEventListener('click', loadPreviousPage);

};

// retorno da url e criação dos cards ainda estáticos mas pela DOM

async function loadCharacters(url) {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = ''; // limpar os campos cards e reutiliza 

  try{

    const response = await fetch(url);
    const responseJson = await response.json();

    responseJson.results.forEach((character) => {
      const card = document.createElement("div");
      card.style.backgroundImage = 
      `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')` //cards dinâmicos
      card.className = "cards"

      const characterNameBG = document.createElement("div");
      characterNameBG.className = "character-name-bg";

      const characterName = document.createElement("span");
      characterName.className = "character-name";
      characterName.innerText = `${character.name}`;

      characterNameBG.appendChild(characterName);
      card.appendChild(characterNameBG);

      mainContent.appendChild(card);
     });

     const nextButton = document.getElementById('next-button');
     const backButton = document.getElementById('back-button');

     nextButton.disabled = !responseJson.next;
     backButton.disabled = !responseJson.previous;

     backButton.style.visibility = responseJson.previous? "visible" : "hidden";
     

     currentPageUrl = url;

  } catch (error){
    alert('Erro ao carregar os novos personagens');
    console.log(error);
  }
}