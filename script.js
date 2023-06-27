// acima daqui entra os asyncs dos currents
/* async function loadNextPage(){
  if(!currentPageUrl) return;

  try{
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.next);

  }catch(error){
    console.log(error);
    alert('Erro ao carregar a próxima página');
  }
}

async function loadPreviousPage(){
  if(!currentPageUrl) return;

  try{
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.previous);

  }catch(error){
    console.log(error);
    alert('Erro ao carregar a página anterior');
  }
}

function hideModal(){
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
} */


