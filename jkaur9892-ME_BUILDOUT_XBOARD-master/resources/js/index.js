async function fetchData(url) {
  try {
    let res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${url}`
    );
    // console.log(res);
    if (!res.ok) throw Error(res.statusText);
    return res.json();
  } catch (err) {
    return err;
  }
}

async function accordionUpdate() {
  for (let i = 0; i < magazines.length; i++) {
    let data2 = await fetchData(magazines[i]);
    let x = Math.floor(Math.random() * 9999999);
    console.log(x);
    // console.log(data2)
    // console.log(data2.items[i].enclosure.link)
    let accr = document.getElementById("accordionExample");
    let accrItem = document.createElement("div");
    accrItem.setAttribute("class", "accordion-item");
    // console.log(accr)
    if (i === 0) {
      accrItem.innerHTML = `
    <h2 class="accordion-header" id="heading${i}">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                     ${data2.feed.title}
                    </button>
                  </h2>
                  <div id="collapse${i}" class="accordion-collapse collapse show" aria-labelledby="heading${i}" data-bs-parent="#accordionExample">
                    <div class="accordion-body" id=body${i}>
                    <div id="carouselExampleControls${x}" class=" carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner"  id='carousel${i}'>
                    
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${x}" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${x}" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                    </button>
                  </div>
                    </div>
                  </div>
    `;
    } else {
      accrItem.innerHTML = `
    <h2 class="accordion-header" id="heading${i}">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                    ${data2.feed.title}
                    </button>
                  </h2>
                  <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                    <div id="carouselExampleControls${x}" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner"  id='carousel${i}'>
                    
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${x}" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${x}" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                    </button>
                  </div>
                    </div>
                  </div>
    `;
    }

    accr.append(accrItem);
  }
}
accordionUpdate();

async function carouselUpdate() {
  for (let i = 0; i < magazines.length; i++) {
    let data2 = await fetchData(magazines[i]);
    console.log(data2);
    let accrBody = document.getElementById(`carousel${i}`);
    // console.log(accrBody)
    for (let j = 0; j < data2.items.length; j++) {
      let date = new Date(data2.items[j].pubDate);
      // date = date.toLocaleDateString('en-IN');
      // console.log(date)
      // console.log(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);
      let crslItem = document.createElement("div");
      if (j === 0) {
        crslItem.setAttribute("class", "carousel-item active");
        crslItem.innerHTML = `
    <a href=${data2.items[j].link} class="link-dark">
    <div class="card" style="width: 100%;">
    
    <img src=${data2.items[j].enclosure.link} class="card-img-top" alt="...">
    <div class="card-body">
      <h3 class="card-title">${data2.items[j].title}</h3>
      <div class ='d-flex'>
      <p class="text-muted">${data2.items[j].author}</p>
      <i class="fa-solid fa-circle ms-3"></i>
      <p class = 'ms-3 text-muted'>${`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</p>
      </div>
      <p class="card-text">${data2.items[j].content}</p>
     </div>
    
  </div>
  </a>
    `;
      } else {
        crslItem.setAttribute("class", "carousel-item");
        crslItem.innerHTML = `
        <a href=${data2.items[j].link} class="link-dark">
      <div class="card" style="width: 100%;">
      
      <img src=${data2.items[j].enclosure.link} class="card-img-top" alt="...">
      <div class="card-body">
        <h3 class="card-title">${data2.items[j].title}</h3>
        <div class ='d-flex'>
      <p class="text-muted">${data2.items[j].author}</p>
      <i class="fa-solid fa-circle ms-3"></i>
      <p class = 'ms-3 text-muted'>${`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</p>
      </div>
        <p class="card-text">${data2.items[j].content}</p>
       </div>
      
    </div>
    </a>
    `;
      }
      accrBody.append(crslItem);
    }
  }
}

carouselUpdate();




