let ACFUN_BLACK_LIST = 'ACFUN_BLACK_LIST'
let black_input = document.querySelector('#black-input')
let results = document.querySelector('#results')
let black_list
chrome.storage.sync.get({ black_list: [] }, res => {
  black_list = res.black_list
  renderList()
})

document.querySelector('#black-input').addEventListener('keypress', e => {
  // 非回车
  if(e.keyCode !== 13) return

  // 输入空
  if(!black_input.value.trim()) return

  add()

  black_input.value = ''
})

document.querySelector('#add-btn').addEventListener('click', e => {
  black_list.push(black_input.value.trim())
  renderList()
  chrome.storage.sync.set({ black_list }, res => {
    console.log('save success')
  })
})

document.querySelector('#clean-btn').addEventListener('click', e => {
  chrome.storage.sync.remove('black_list', res => {
    black_list = []
    renderList()
  })
})

function renderList() {
  results.innerHTML = black_list.map((i, idx) => `<div class="item" data-idx=${idx}>${i}</div>`).join('')
  document.querySelectorAll('.item').forEach(element => {
    element.addEventListener('click', e => {
      black_list.splice(+e.target.dataset.idx, 1)
      chrome.storage.sync.set({ black_list }, res => {
        console.log('save success')
      })
      renderList()
    })
  })
}