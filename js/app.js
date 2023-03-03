const loadData = () =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data.tools.slice(0,6)))

    .catch(error =>{
        console.log(error);
    })
};
const loadData2 = () =>{
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
    cardContainer.innerHTML = "";
    elements.forEach(element =>{
        // console.log(element.features);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML =`
        <div class="card h-100">
        <img id="img" src="${element.image}" class="card-img-top p-3 h-50 " alt="...">
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            <p>1. ${element.features[0]}</p>
            <p>2. ${element.features[1]}</p>
            <p>3. ${element.features[2] ? element.features[2] : "No data Found"}</p>
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

const loadCardDetails =(id) =>{
    const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayCardDetails(data.data))
};

const displayCardDetails = (details) => {
    console.log(details);
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
        document.getElementById('plan1').innerText = `${details.pricing[0].price == false ? "Free of Cost /" : details.pricing[0].price }`
        document.getElementById('plan1-sub').innerText = `${details.pricing[0].plan}`
    
        document.getElementById('plan2').innerText = `${details.pricing[1].price == false ? "Free of Cost /" : details.pricing[1].price }`
        document.getElementById('plan2-sub').innerText = `${details.pricing[1].plan}`
    
        document.getElementById('plan3').innerText = `${details.pricing[2].price == false ? "Free of Cost /" : details.pricing[2].price }`
        document.getElementById('plan3-sub').innerText = `${details.pricing[2].plan}`
    }
    

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
        
    const cardDetails2 = document.getElementById('card-description2');

    if(details.accuracy.score == null){
        cardDetails2.innerHTML = `
    <img id="modal-img" class="rounded-3 mb-4 position-relative" src="${details.image_link[0]}" alt="">
        <h5 class="card-title">${details.input_output_examples == null ? "Can you give any example?" : details.input_output_examples[0].input}</h5>
        <p class="card-text">${details.input_output_examples == null ? "No! Not Yet! Take a break!!!" :details.input_output_examples[0].output}</p>
    `
    }
    else{
        cardDetails2.innerHTML = `
    <img id="modal-img" class="rounded-3 mb-4 position-relative" src="${details.image_link[0]}" alt="">
        <p id='accuracy' class="bg-danger-subtle text-center rounded-3 position-absolute">${details.accuracy.score* 100}% accuracy</p>
        <h5 class="card-title">${details.input_output_examples == null ? "Can you give any example?" : details.input_output_examples[0].input}</h5>
        <p class="card-text">${details.input_output_examples == null ? "No! Not Yet! Take a break!!!" :details.input_output_examples[0].output}</p>
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

const showAll = () =>{
    toggleSpinner(true);
    document.getElementById('show-all').classList.add('d-none');
    loadData2();
}

loadData();