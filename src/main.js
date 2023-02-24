import "../style.css"

let $form = document.querySelector("form")
let $inputName = document.querySelector("#name")

let $divResult = document.querySelector("#result")

const fetchData = async (url, cb) => {
  let response = await fetch(url)
  response = await response.json()
  cb(response)
}

const renderData = async (countries) => {
  let countriesData = await fetch("https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json")
    .then(res => res.json())
  
  $divResult.innerHTML = ""

  countries.country.forEach((country, index) => {
    let div = document.createElement("div")
    div.className = "countryResult"

    console.log(country)

    let actualCountry = countriesData.find(countryJson => countryJson.code === country.country_id)

    div.innerHTML = `
      <p class="country-flag">${actualCountry.emoji}</p>
      <p class="country-name">${actualCountry.name}</p>
      <p class="country-code">Code: ${actualCountry.code}</p>
      <p class="number-result">#${index + 1}</p>
    `

    $divResult.appendChild(div)
  })
}

$form.addEventListener("submit", async evt => {
  evt.preventDefault()
  const { value: name } = $inputName

  if(!name) {
    $divResult.innerHTML = "<p>Escriba su nombre (uno solo)</p>"
    return 
  }
  
  await fetchData(`https://api.nationalize.io/?name=${name}`, renderData)
})