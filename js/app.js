// Show only 6 data at first
const loadData = () =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data.tools.slice(0,6)))

    .catch(error =>{
        console.log(error);
    })
};

// Show all data by clicking See More button part
const loadData2 = () =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data.tools))

    .catch(error =>{
        console.log(error);
    })
};

// display data in main UI
const displayData = (elements) =>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    elements.forEach(element =>{
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML =`
        <div class="card h-100">
        <img id="img" src="${element.image}" class="card-img-top p-3 h-50" alt="...">
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            <p>${element.features[0] ? + "1"+ '. ' + element.features[0] : ""}</p>
            <p>${element.features[1] ? + "2"+ '. ' + element.features[1] : ""}</p>
            <p>${element.features[2] ? + "3"+ '. ' + element.features[2] : ""}</p>
            <p>${element.features[3] ? + "4"+ '. ' + element.features[3] : ""}</p>
            <hr>
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5>${element.name}</h5>
                    <p><span><i class="fa-solid fa-calendar-days"></i></span> ${element.published_in}</p>
                </div>
                <div>
                    <button onclick="loadCardDetails('${element.id}')" class="rounded-4 bg-danger-subtle border-0 px-2" data-bs-toggle="modal" data-bs-target="#detailsModal"><i class="fa-solid fa-arrow-right text-danger"></i></button>
                </div>
            </div>
        </div>
        `
        cardContainer.appendChild(cardDiv);
    })
    toggleSpinner(false);
};

// Load data dynamically using id 
const loadCardDetails =(id) =>{
    const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayCardDetails(data.data))
};

// display data in modal part
const displayCardDetails = (details) => {
    // modal 1st card
    document.getElementById('card-description').innerText= `${details.description}`
    // price and plan part
    if(details.pricing == null){
        document.getElementById('plan1').innerText = 'Free of Cost';
        document.getElementById('plan1-sub').innerText = '/ Free';
        document.getElementById('plan2').innerText = 'Free of Cost';
        document.getElementById('plan2-sub').innerText = '/ Pro';
        document.getElementById('plan3').innerText = 'Free of Cost';
        document.getElementById('plan3-sub').innerText = '/ Enterprise';
    }
    else{
        document.getElementById('plan1').innerText = `${details.pricing[0].price == false ? "Free of Cost /" : details.pricing[0].price }`
        document.getElementById('plan1-sub').innerText = `${details.pricing[0].plan}`
    
        document.getElementById('plan2').innerText = `${details.pricing[1].price == false ? "Free of Cost /" : details.pricing[1].price }`
        document.getElementById('plan2-sub').innerText = `${details.pricing[1].plan}`
    
        document.getElementById('plan3').innerText = `${details.pricing[2].price == false ? "Free of Cost /" : details.pricing[2].price }`
        document.getElementById('plan3-sub').innerText = `${details.pricing[2].plan}`
    }
    
    // Features & Integrations part display
    const modalCard1 = document.getElementById('modal-card1');
    modalCard1.innerHTML ="";
    //feature part
    const divFeature = document.createElement('div');
    divFeature.innerHTML = `
        <h6 class="card-title">Features</h6>
        <ul>
            <li>${details.features[1].feature_name}</li>
            <li>${details.features[2].feature_name}</li>
            <li>${details.features[3].feature_name}</li>
            ${details.features[4] == undefined ? "" : `<li>${details.features[4].feature_name}</li>`}
        </ul>
        `
    modalCard1.appendChild(divFeature);
    //integration part
    const divIntegration = document.createElement('div');
    divIntegration.innerHTML=`
        ${details.integrations == null ? `<h6 class="card-title">Integrations</h6> <p> No data Found</p>`:
        `<h6 class="card-title">Integrations</h6>
        <ul>
            <li>${details.integrations[0]}</li>
            ${details.integrations[1] == undefined ? "" : `<li>${details.integrations[1]}</li>`}
            ${details.integrations[2] == undefined ? "" : `<li>${details.integrations[2]}</li>`}
            ${details.integrations[3] == undefined ? "" : `<li>${details.integrations[3]}</li>`}
        </ul>
        `
        }
        `
    modalCard1.appendChild(divIntegration);
    
    // modal 2nd card 
    // Images, question answer part
    const modalCard2 = document.getElementById('modal-card2');
    modalCard2.innerHTML = `
    <img class="img-fluid rounded-3 mb-4 position-relative" src="${details.image_link[0]}" alt="">
    ${details.accuracy.score == null ? '' :`<p class="bg-danger-subtle text-center rounded-2 position-absolute mt-4 me-4 px-3 top-0 end-0">${details.accuracy.score* 100}% accuracy</p>`}
    <h5 class="card-title text-center">${details.input_output_examples == null ? "Can you give any example?" : details.input_output_examples[0].input}</h5>
    <p class="card-text text-center">${details.input_output_examples == null ? "No! Not Yet! Take a break!!!" :details.input_output_examples[0].output}</p>`
};

// toggler
const toggleSpinner = (isLoading) =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
};

// Show all data part
const showAll = () =>{
    toggleSpinner(true);
    document.getElementById('show-all').classList.add('d-none');
    loadData2();
};

// Sort all data by Date Ascending order
document.getElementById('sort-btn').addEventListener('click',function(){
    document.getElementById('sort-btn').style.backgroundColor='green';
    toggleSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res => res.json())
    .then(data => sortDataShow(data.data.tools))
}); 
const sortDataShow = elements => {
    function byDate(a,b) {
        return new Date(a.published_in).valueOf() - new Date(b.published_in).valueOf();
    }
    const date = (elements.sort(byDate));
    displayData(date);
    document.getElementById('show-all').classList.add('d-none');
};

loadData();