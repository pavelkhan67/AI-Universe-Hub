const loadData = () =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data.tools))

    .catch(error =>{
        console.log(error);
    })
};

const displayData = (elements) =>{
    const cardContainer = document.getElementById('card-container');
    elements.forEach(element =>{
        // console.log(element);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML =`
        <div class="card h-100">
        <img id="img" src="${element.image}" class="card-img-top p-3 h-50 " alt="...">
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            <p>1. ${element.features[0]}</p>
            <p>2. ${element.features[1]}</p>
            <p>3. ${element.features[2]}</p>
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
};

const loadCardDetails =(id) =>{
    const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayCardDetails(data.data))
};

const displayCardDetails = (details) => {
    console.log(details);
    document.getElementById('card-description').innerText= `${details.description}`
    document.getElementById('plan1').innerText = `${details.pricing[0].price ===0 ? "No cost" : details.pricing[0].price}`
    document.getElementById('plan1-sub').innerText = `${details.pricing[0].plan}`

    document.getElementById('plan2').innerText = `${details.pricing[1].price}`
    document.getElementById('plan2-sub').innerText = `${details.pricing[1].plan}`

    document.getElementById('plan3').innerText = `${details.pricing[2].price}`
    document.getElementById('plan3-sub').innerText = `${details.pricing[2].plan}`

    const cardInfo = document.getElementById('card-info');
    cardInfo.innerHTML ="";

    const div1 = document.createElement('div');
    div1.innerHTML = `
    <h6 class="card-title">Features</h6>
        <ul>
            <li>${details.features[1].feature_name}</li>
            <li>${details.features[2].feature_name}</li>
            <li>${details.features[3].feature_name}</li>
        </ul>
    `
    cardInfo.appendChild(div1);

    const div2 = document.createElement('div');
    
    console.log(details.integrations);
        div2.innerHTML=`
        <h6 class="card-title">Integrations</h6>
        <ul>
            <li>${details.integrations[0]}</li>
            <li>${details.integrations[1]}</li>
            <li>${details.integrations[2]}</li>
        </ul>
        
        `
        cardInfo.appendChild(div2)  
        
    const cardDetails2 = document.getElementById('card-description2');
    cardDetails2.innerHTML = `
    <img class="img-fluid rounded-3" src="${details.image_link[0]}" alt="">
        <h5 class="card-title">${details.input_output_examples[0].input}</h5>
        <p class="card-text">${details.input_output_examples[0].output}</p>
    `
};


loadData();