const $movieItemsWrapper = document.querySelector('.item-list')
const fragment = document.createDocumentFragment()
const movieItemCard = ({ href = '#', imgSrc, title, score }) => {
  const li = document.createElement('li')

  const a = document.createElement('a')
  a.href = href

  const div = document.createElement('div')
  div.classList.add('item-card')

  const img = document.createElement('img')
  img.classList.add('item-thumbnail')
  img.src = imgSrc
  img.alt = title

  const $title = document.createElement('p')
  $title.classList.add('item-title')
  $title.textContent = title

  const $score = document.createElement('p')
  $score.classList.add('item-score')
  $score.textContent = score

  const $scoreImg = document.createElement('img')
  $scoreImg.src = './templates/star_filled.png'
  $scoreImg.alt = '별점'

  $score.appendChild($scoreImg)
  div.appendChild(img)
  div.appendChild($title)
  div.appendChild($score)
  a.appendChild(div)
  li.appendChild(a)

  return li
}

const IMAGE_HREF = (suffix) =>
  `https://image.tmdb.org/t/p/w220_and_h330_face${suffix}`

const movieFetcher = () => {
  fetch(url, options)
    .then((response) => response.json())
    .then((movieInfos) => {
      movieInfos.results.forEach((info) => {
        const { title, vote_average, poster_path } = info
        fragment.appendChild(
          movieItemCard({
            imgSrc: IMAGE_HREF(poster_path),
            title,
            score: vote_average,
          }),
        )
      })

      $movieItemsWrapper.appendChild(fragment)
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error)
    })
}

const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjA3MDc2OWNmYWRhOTg0NWEwNTlkN2U2MDQ2YzBhYSIsInN1YiI6IjYzMWYyYzhkYjg3YWVjMDA4MjgzY2RkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bjYX05NWfHAMCEuGoI7V4MkBL_4oc_nKO6ChMP86_xQ',
  },
}

window.onload = movieFetcher
