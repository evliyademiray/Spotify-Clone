//HTML'den gelenler
export const ele = {
  list: document.querySelector("#list"),
  playingInfo: document.querySelector(".playing"),
  searchForm: document.querySelector("#search-form"),
  title: document.querySelector(".songs #title")
};

//Arayüz işlemleri
export const renderCards = (songs) => {
  //Eski şarkıları silme
  ele.list.innerHTML='';
  songs.forEach((song) => {
    // console.log(song);

    //div oluşturma
    const div = document.createElement("div");

    //Kart elemanına ileride JS'den erişmek için bazı verileri ekleyeceğiz
    div.dataset.url = song.hub?.actions.pop().uri;
    div.dataset.name = song.title;
    div.dataset.photo = song.images.coverart;

    //class verme
    div.className = "card";

    //içeriği belirleme
    div.innerHTML = `
    <figure>
    <img src="${song.images?.coverart}">
    <div class="play">
        <i id="play-btn" class="bi bi-play-fill"></i>
    </div>
    </figure>
    <h4>${song.subtitle}</h4>
    <p>${song.title}</p>
    `;
    ele.list.appendChild(div);
  });
};
//Müzik bilgilerini ekrana basar
export const renderPlayingInfo = (data) => {
  ele.playingInfo.innerHTML = `
<div class="info">
  <img class="animate"
  src="${data.photo}">
    <div>
      <p>Şuan Oynatılıyor</p>
      <h3>${data.name}</h3>
    </div>
</div>
<audio controls autoplay>
<source src="${data.url}">
</audio>
  `;
};
//Arama esnasında beklerken ekrana çıkan GIF
export const renderLoader = () =>{
  ele.list.innerHTML=`
  <div class="loader">
  <img src="/images/loading.gif"/>
  </div>
  `
}
renderLoader();