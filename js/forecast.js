const KEY = "24b8760b7e149897ec088bbe76c2d51f";

// get info from the API

const getData = async (city) => {
  const base = "https://api.openweathermap.org/data/2.5/weather";
  const query = `?q=${city}&units=metric&appid=${KEY}`;
    loader(true)
  const request = await fetch(base + query);
  const data = await request.json();
  loader(false)

  return data;
};

// getData('mirbozor').then((data) => console.log(data)).catch(() => console.log("ERROR"))