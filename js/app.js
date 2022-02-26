//get data 
const getSearch = () => {
    mainSection.innerHTML = '';
    answersSection.innerHTML = '';
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    if(searchValue === ''){
        alert('You did not search anything');
    }
    else{
        Loader.open();

        fetch(`https://google-search3.p.rapidapi.com/api/v1/search/q=${searchValue}`, {
            "method": "GET",
            "headers": {
                "x-user-agent": "desktop",
                "x-proxy-location": "US",
                "x-rapidapi-host": "google-search3.p.rapidapi.com",
                "x-rapidapi-key": "d05130dc65msh25effa3415eafcfp11cf5ejsn47eff5b7f937"
            }
        })
            .then(res => res.json())
            .then(data => displayResult(data))
    }
};

const mainSection = document.getElementById('search-result');
const answersSection = document.getElementById('answer-section');

// show search result
const displayResult = (data) => {

    if (data.results.length !== 0) {

        document.getElementById('not-found').style.display ="none";
        mainSection.innerHTML = '';
        Loader.close();

        // search result section
        data.results.forEach(result => {
            const div = document.createElement('div');
            div.innerHTML = `
        <div class="card my-3 p-2 card-block">
                <div class="card-body">
                    <p class="card-text text-white-50"><small class="text-muted">${result?.cite.domain || result.link}</small></p>
                    <a class="search-title" href="${result.link}" title="${result.link}">
                        <h5 class="card-title d-inline-block">${result.title}</h5>
                    </a>
                    <p class="card-text text-white">${result.description}</p>
                </div>
        </div>
        `;
            mainSection.appendChild(div);
        });

        // answer section
        if (data.answers.length !== 0) {
            const answerTitle = document.createElement('h1');
            answerTitle.className = 'card-title answer-title';
            answerTitle.innerText = 'People also ask ';
            answersSection.appendChild(answerTitle);

            data.answers.forEach(answer => {
                const li = document.createElement('li');
                li.className = 'list-group-item bg-transparent';
                li.innerText = answer;
                answersSection.appendChild(li);
            });
        }
        else {
            answersSection.innerHTML = '';
        };
    }
    else{
        Loader.close();
        document.getElementById('not-found').style.display ="block";
    }

};
