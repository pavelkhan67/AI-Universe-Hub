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
        console.log(element);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML =`
        <div class="card h-100">
        <img id="img" src="${element.image}" class="card-img-top p-3 h-50 " alt="...">
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            <p class="card-text">1. ${element.features[0]}</p>
            <p class="card-text">2. ${element.features[1]}</p>
            <p class="card-text">3. ${element.features[2]}</p>
            <div style="width: 90%" class="mx-auto">
                <hr>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5>gfdf</h5>
                    <p>gdfg</p>
                </div>
                <div>
                    <button class="rounded-4 bg-danger-subtle border-0 px-2"><i class="fa-solid fa-arrow-right text-danger"></i></button>
                </div>
            </div>
        </div>
    </div>
        `
    cardContainer.appendChild(cardDiv);
    })
};

loadData();