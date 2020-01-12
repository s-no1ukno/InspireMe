// API Endpoints
const API_URL = "https://quotes.rest/qod.json"
const API_FUNNY = "https://quotes.rest/qod.json?category=funny"
const API_LIFE = "https://quotes.rest/qod.json?category=life"
const API_LOVE = "https://quotes.rest/qod.json?category=love"

//Document Interaction Variables
let authorNameElement = document.getElementById("author-name")
let imageElement = document.querySelector('.image')
let quoteElement = document.querySelector('.quote')


const inspireButton = document.querySelector('.btn-inspire')
const funnyButton = document.querySelector('.btn-funny')
const lifeButton = document.querySelector('.btn-life')
const loveButton = document.querySelector('.btn-love')
const cardElement = document.querySelector('.card')

let authorName
let quoteImage
let quote

cardElement.style.display = 'none'


async function getInspireQuote() {
  let res = await fetch(API_URL)
  let json = await res.json()

  authorName = "Author: " + json.contents.quotes[0].author
  quoteImage = json.contents.quotes[0].background
  quote = json.contents.quotes[0].quote


  authorNameElement.textContent = authorName
  imageElement.src = quoteImage
  quoteElement.textContent = quote



  console.log('inspire', json);
  console.log('content', authorNameElement.textContent);


}

async function getFunnyQuote() {
  let funnyRes = await fetch(API_FUNNY)
  let funnyJson = await funnyRes.json()

  funnyAuthorName = "Author: " + funnyJson.contents.quotes[0].author
  funnyQuoteImage = funnyJson.contents.quotes[0].background
  funnyQuote = funnyJson.contents.quotes[0].quote

  authorNameElement.textContent = funnyAuthorName
  imageElement.src = funnyQuoteImage
  quoteElement.textContent = funnyQuote

  console.log('funny', funnyJson);
  console.log('content', authorNameElement.textContent);
}

async function getLifeQuote() {
  let res = await fetch(API_LIFE)
  let json = await res.json()
  console.log('life', json);


  authorName = "Author: " + json.contents.quotes[0].author
  quoteImage = json.contents.quotes[0].background
  quote = json.contents.quotes[0].quote


  authorNameElement.textContent = authorName
  imageElement.src = quoteImage
  quoteElement.textContent = quote
}

async function getLoveQuote() {
  let res = await fetch(API_LOVE)
  let json = await res.json()

  authorName = "Author: " + json.contents.quotes[0].author
  quoteImage = json.contents.quotes[0].background
  quote = json.contents.quotes[0].quote


  authorNameElement.textContent = authorName
  imageElement.src = quoteImage
  quoteElement.textContent = quote
}



inspireButton.addEventListener('click', (e) => {
  cardElement.style.display = ''
  e.preventDefault()
  getInspireQuote();
})
console.log('button', inspireButton);

funnyButton.addEventListener('click', (e) => {
  cardElement.style.display = ''
  e.preventDefault()
  getFunnyQuote()
})

loveButton.addEventListener('click', (e) => {
  cardElement.style.display = ''
  e.preventDefault()
  getLoveQuote()
})

lifeButton.addEventListener('click', (e) => {
  cardElement.style.display = ''
  e.preventDefault()
  getLifeQuote()
})