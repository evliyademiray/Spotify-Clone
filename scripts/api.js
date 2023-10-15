import { url, options } from "./constants.js";
import { renderCards, renderLoader } from "./ui.js";

//API işlemleri
export class API {
  constructor() {
    this.songs = [];
  }
  //Popüler müzikler için istek atma
  async getPopular() {
    try {
      //API isteği atar
      const res = await fetch(url, options);
      const data = await res.json();
      //class'ta tuttuğumuz değişkeni günceller
      this.songs = data.tracks;
    } catch (err) {
      console.log("Popüler verileri alırken hata oluştu.." + err);
    }
  }
  //Aratılan içeriğe erişme
  async searchMusic(query) {
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}&locale=TR&offset=0&limit=20`,
      options
      );
    const data = await res.json();
    //Bize gelen diziyi işleyeceğiz
    //Objelerin içerisindeki track katmanını aradan kaldıracağız
    console.log('eski hali', data.tracks.hits);

    const newData = data.tracks.hits.map((song)=>({
      ...song.track,
    }));
    //Müzikleri ekrana basma
    renderCards(newData);
  }
}
