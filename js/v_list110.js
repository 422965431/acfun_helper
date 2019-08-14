console.log('加载v_list110成功')

function getUpAnchors() {
  return document.querySelectorAll('a.atc-up.act-info-mg.fl')
}

function getUpAnchorsBoxes() {
  return {
    divs: document.querySelectorAll('div.article-item.clearfix.weblog-item'),
    hrs: document.querySelectorAll('div.article-item.clearfix.weblog-item + hr')
  }
}

let interval

document.addEventListener('DOMContentLoaded', function() {
  interval = setInterval(() => {
    let as = getUpAnchors()
    if(as.length) {
      let asBoxes = getUpAnchorsBoxes()
      chrome.storage.sync.get({ black_list: [] }, ({ black_list }) => {
        as.forEach((element, idx) => {
          let up = element.innerText.replace(/UP：/, '')
          black_list.forEach(black => {
            if(black === up) {
              asBoxes.divs[idx].style.display = 'none'
              asBoxes.hrs[idx].style.display = 'none'
            }
          })
        })
      })
    }
  }, 1000)
})