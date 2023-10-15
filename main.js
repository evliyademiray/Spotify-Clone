import { API } from "./scripts/api.js";
import { ele, renderCards, renderLoader, renderPlayingInfo } from "./scripts/ui.js";
//class'ın bir örneğini
const api = new API();
document.addEventListener("DOMContentLoaded", async () => {
  renderLoader();
  await api.getPopular();
  renderCards(api.songs);
});
//Müzik listesindeki tıklanma olayını izler
ele.list.addEventListener("click", (e) => {
  if (e.target.id === "play-btn") {
    //Oynat butonuna en yakın olan .card
    //classına sahip elemanı alma
    const parent = e.target.closest(".card");
    //Müziğin bilgilerine erişme
    renderPlayingInfo(parent.dataset);
  }
});
//Arama formu gönderildiğinde
ele.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //Aratılan terime erişme
  const query = e.target[0].value;
  //Form boşşa fonksiyonu durdurma
  if (!query) return;
  //Arama esnasında ekrana arama GIFi verme
  renderLoader();
  //Başlığı güncelleme
  ele.title.innerHTML = `${query} için sonuçlar:`;
  //APIden şarkıları alma
  api.searchMusic(query);
});
