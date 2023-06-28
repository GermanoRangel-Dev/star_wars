let currentFilmsUrl = 'https://swapi.dev/api/films/';

window.onload = async () => {
  try{
    await loadFilms(currentFilmsUrl);
  } catch (error) {
    console.log(error);
    alert('Erro ao carregar Cards dos Personagens!');
  }

  
  const nextButton = document.getElementById('next-button');
  const backButton = document.getElementById('back-button');

  nextButton.addEventListener('click', loadNextPage);
  backButton.addEventListener('click', loadPreviousPage);

};

async function loadFilms(url) {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = ''; // limpar os campos cards e reutiliza 

  try{

    const response = await fetch(url);
    const responseJson = await response.json();

    responseJson.results.forEach((film) => {
      const card = document.createElement("div");
      card.style.backgroundImage = 
      `url('https://starwars-visualguide.com/assets/img/films/${film.url.replace(/\D/g, "")}.jpg')`; //cards dinâmicos
      card.className = "cards";

      const filmNameBG = document.createElement("div");
      filmNameBG.className = "character-name-bg";

      const filmName = document.createElement("span");
      filmName.className = "character-name";
      filmName.innerText = `${film.title}`;

      filmNameBG.appendChild(filmName);
      card.appendChild(filmNameBG);

      /* criando e colocando informações no modal  */

      card.onclick = () => {
        const modal = document.getElementById("modal");
        modal.style.visibility ="visible";

        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = '';

        const filmImage = document.createElement("div");
        filmImage.style.backgroundImage =
        `url('https://starwars-visualguide.com/assets/img/films/${film.url.replace(/\D/g, "")}.jpg')`;
        filmImage.className = "character-image";
        
        const title = document.createElement("span");
        title.className = "character-details";
        title.innerText = `Titulo: ${film.title}`;

        const episode_id = document.createElement("span");
        episode_id.className = "character-details";
        episode_id.innerText = `sequencia do filme: ${film.episode_id}`;

        const director = document.createElement("span");
        director.className = "character-details";
        director.innerText = `diretor: ${film.director}`;

        const producer = document.createElement("span");
        producer.className = "character-details";
        producer.innerText = `produtor(es): ${film.producer}`;

        const release_date = document.createElement("span");
        release_date.className = "character-details";
        release_date.innerText = `lancamento: ${film.release_date}`;

        modalContent.appendChild(filmImage);
        modalContent.appendChild(title);
        modalContent.appendChild(episode_id);
        modalContent.appendChild(director);
        modalContent.appendChild(producer);
        modalContent.appendChild(release_date);
      }

      mainContent.appendChild(card);
     });

     const nextButton = document.getElementById('next-button');
     const backButton = document.getElementById('back-button');

     nextButton.disabled = !responseJson.next;
     backButton.disabled = !responseJson.previous;

     backButton.style.visibility = responseJson.previous? "visible" : "hidden";
     

     currentFilmsUrl = url; // aqui muda o valor da página

  } catch (error){
    alert('Erro ao carregar os novos personagens');
    console.log(error);
  }
}

async function loadNextPage(){
  if(!currentFilmsUrl) return;

  try{
    const response = await fetch(currentFilmsUrl);
    const responseJson = await response.json();

    await loadFilms(responseJson.next);

  }catch(error){
    console.log(error);
    alert('Erro ao carregar a próxima página');
  }
}

async function loadPreviousPage(){
  if(!currentFilmsUrl) return;

  try{
    const response = await fetch(currentFilmsUrl);
    const responseJson = await response.json();

    await loadFilms(responseJson.previous);

  }catch(error){
    console.log(error);
    alert('Erro ao carregar a página anterior');
  }
}

function hideModal(){
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
}



