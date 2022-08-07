{/* <div class="row row-cols-1 row-cols-sm-6 row-cols-md-4 g-4">
        <div class="col">
            <div class="card h-100">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <i class="fa-solid fa-beer-mug"></i>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        </div>
    </div> */}

const DisplayBreweries = function(breweriesList) {
    container.innerHTML = "";
    const rowElem = document.createElement('div');
    rowElem.setAttribute('class', 'row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4');

    // Display the cards
    Array.from(breweriesList).forEach(element => {
       // title 
       const titleElem = document.createElement('h5');
       titleElem.setAttribute('class', 'card-title');
       titleElem.innerText = `${element.name}`;
       
       // sub title
       const subTitleElem = document.createElement('h6');
       subTitleElem.setAttribute('class', 'card-subtitle mb-2 text-muted');
       subTitleElem.innerText = `${element.brewery_type}`

       // address
       const addressElem = document.createElement('p');
       addressElem.setAttribute('class', 'card-text');
       addressElem.innerHTML = `<p> <b>Address:</b> ${element.street}, ${element.city}, ${element.state}, ${element.postal_code} <p>`       //phone number
       
       const phoneELem = document.createElement('p');
       if( element.phone !== null ) {      
          phoneELem.setAttribute('class', 'card-text');
          phoneELem.innerHTML = `<p> <b>Phone:</b> ${element.phone}<p>` 
       }

       // link
       const linkElem = document.createElement('a');
       linkElem.setAttribute('href', `${element.website_url}`);
       linkElem.setAttribute('target', '_blank');
       linkElem.setAttribute('class', 'card-link btn btn-primary');
       linkElem.innerText = `Website Link`;     

       // card body
       const cardBodyElem = document.createElement('div');
       cardBodyElem.setAttribute('class', 'card-body');
       cardBodyElem.append(titleElem, subTitleElem, addressElem, phoneELem, linkElem);

       // card element
       const cardElem = document.createElement('div');
       cardElem.setAttribute('class', 'card h-100');
       cardElem.append(cardBodyElem);

       // col element
       const colElem = document.createElement('col');
       colElem.append(cardElem);
       rowElem.append(colElem);
    });

    container.appendChild(rowElem);
}

const DisplayListNotFound = function() {
    container.innerHTML = "";
    const listNotFoundElem = document.createElement('h1');
    listNotFoundElem.innerText = 'No Breweries Found!'
    container.appendChild(listNotFoundElem);
}

const OpenBrewery = async function(endpoint) {
    try {
        const response = await fetch(endpoint);
        const arrayList = await response.json();
        console.log(arrayList);
        if(arrayList.length !== 0) {
            DisplayBreweries(arrayList);
        } else {
            DisplayListNotFound();
        }
    } catch (error) {
        console.log(`Throws an exception: ${error}`);
    }
}

// Event Listeners
const formElement = document.getElementById('form-element');
formElement.addEventListener('submit', event => {
    event.preventDefault();
    const elements = event.target.elements;
    let searchItem = '';
    Array.from(elements).forEach(element => {
        if(element.nodeName === "INPUT") {
            searchItem = element.value;
        }
    });

    let endpoint = '';
    if(searchItem.length === 0) {
        endpoint = `https://api.openbrewerydb.org/breweries?per_page=50`
    } else {
        endpoint = `https://api.openbrewerydb.org/breweries/search?query=${searchItem}`;
    }
    OpenBrewery(endpoint);
});

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keydown', event => {
    console.log(event.target.value);
})

// Main Code start
const container = document.createElement('div');
container.setAttribute('class', 'mt-4 container');
document.body.append(container);

OpenBrewery('https://api.openbrewerydb.org/breweries?per_page=50');
