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

// Show all data part
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
        <img id="img" src="${element.image}" class="card-img-top p-3 h-50 " alt="...">
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
    document.getElementById('card-description').innerText= `${details.description}`
    if(details.pricing == null){
        document.getElementById('plan1').innerText = 'No data found';
        document.getElementById('plan1-sub').innerText = '';
        document.getElementById('plan2').innerText = 'No data found';
        document.getElementById('plan2-sub').innerText = '';
        document.getElementById('plan3').innerText = 'No data found';
        document.getElementById('plan3-sub').innerText = '';
    }
    else{
        document.getElementById('plan1').innerText = `${details.pricing[0].price == false || details.pricing[0].price == 'No cost' ? "Free of Cost /" : details.pricing[0].price }`
        document.getElementById('plan1-sub').innerText = `${details.pricing[0].plan}`
    
        document.getElementById('plan2').innerText = `${details.pricing[1].price == false || details.pricing[1].price == 'No cost' ? "Free of Cost /" : details.pricing[1].price }`
        document.getElementById('plan2-sub').innerText = `${details.pricing[1].plan}`
    
        document.getElementById('plan3').innerText = `${details.pricing[2].price == false ? "Free of Cost /" : details.pricing[2].price }`
        document.getElementById('plan3-sub').innerText = `${details.pricing[2].plan}`
    }
    
    // Features & Integrations display
    const cardInfo = document.getElementById('card-info');
    cardInfo.innerHTML ="";
    // console.log(details.features);

    const div1 = document.createElement('div');
    div1.innerHTML = `
    <h6 class="card-title">Features</h6>
        <ul>
            <li>${details.features[1].feature_name}</li>
            <li>${details.features[2].feature_name}</li>
            <li>${details.features[3].feature_name}</li>
            <p class="m-0"> ${details.features[4] == undefined ? "" : `<li>${details.features[4].feature_name}</li>`}</p>
             
        </ul>
    `
    cardInfo.appendChild(div1);

    const div2 = document.createElement('div');
    if(details.integrations == null){
        div2.innerHTML=`
        <h6 class="card-title">Integrations</h6>
        <ul>
            <li>${details.integrations == null ? "No data Found" : details.integrations[0]}</li>
        </ul>
        `
        cardInfo.appendChild(div2);
    }
      
    else{
        if(details.integrations.length <= 1){
            div2.innerHTML=`
        <h6 class="card-title">Integrations</h6>
        <ul>
            <li>${details.integrations[0]}</li>
            
        </ul>
        `
        cardInfo.appendChild(div2)
        }
        else if (details.integrations.length == 3){
            div2.innerHTML=`
        <h6 class="card-title">Integrations</h6>
        <ul>
            <li>${details.integrations[0]}</li>
            <li>${details.integrations[1]}</li>
            <li>${details.integrations[2]}</li>
        </ul>
        `
        cardInfo.appendChild(div2)
        }
        else{
            div2.innerHTML=`
        <h6 class="card-title">Integrations</h6>
        <ul>
            <li>${details.integrations[0]}</li>
            <li>${details.integrations[1]}</li>
            <li>${details.integrations[2]}</li>
            <li>${details.integrations[3]}</li>
        </ul>
        `
        cardInfo.appendChild(div2)
        }
    }   
    
    // Modal 2nd div info
    // Images, question answer part
    const cardDetails2 = document.getElementById('card-description2');
    if(details.accuracy.score == null){
        cardDetails2.innerHTML = `
    <img class="img-fluid rounded-3 mb-4 position-relative" src="${details.image_link[0]}" alt="">
        <h5 class="card-title text-center">${details.input_output_examples == null ? "Can you give any example?" : details.input_output_examples[0].input}</h5>
        <p class="card-text text-center">${details.input_output_examples == null ? "No! Not Yet! Take a break!!!" :details.input_output_examples[0].output}</p>
    `
    }
    else{
        cardDetails2.innerHTML = `
    <img class="img-fluid rounded-3 mb-4 position-relative" src="${details.image_link[0]}" alt="">
        <p id='accuracy' class="bg-danger-subtle text-center rounded-3 position-absolute mt-4 me-4 px-3 top-0 end-0">${details.accuracy.score* 100}% accuracy</p>
        <h5 class="card-title text-center">${details.input_output_examples == null ? "Can you give any example?" : details.input_output_examples[0].input}</h5>
        <p class="card-text text-center">${details.input_output_examples == null ? "No! Not Yet! Take a break!!!" :details.input_output_examples[0].output}</p>
    `
    }
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
}) 

const sortDataShow = elements => {
    function byDate(a,b) {
        return new Date(a.published_in).valueOf() - new Date(b.published_in).valueOf();
    }
    const date = (elements.sort(byDate));
    displayData(date);
    document.getElementById('show-all').classList.add('d-none');
};

loadData();