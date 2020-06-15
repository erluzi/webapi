function appendMsg(list, text) {
  let listItem = document.createElement('li')
  listItem.textContent = text
  list.appendChild(listItem)
}

export {
  appendMsg,
}
