const rp = require('request-promise-native')

async function fetchMovie (item) {
  const url = `http://api.douban.com//v2/movie/subject/${item.doubanId}`
  const res = await rp(url)

  return res
}

;(async () => {
  let movies = [
    { "doubanId": 26955451,
    "title": "詹姆斯·卡梅隆的科幻故事",
    "rate": 9.4,
    "poster": "https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2523480904.jpg"
    },
    { "doubanId": 27043263,
      "title": "福尔摩斯：基本演绎法 第六季",
      "rate": 9.1,
      "poster": "https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2382097744.jpg" 
    }
  ]

  movies.forEach(async m => {
    let movieData = await fetchMovie(m)
    try {
      movieData = JSON.parse(movieData)
      console.log(movieData.tags)
      console.log(movieData.summary)
    } catch (error) {
      console.log(error)
    }
    console.log(movieData)
  })
})()