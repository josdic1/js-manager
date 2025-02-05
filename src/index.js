const init = () => {

  // DOM elements
  const list = document.getElementById('list')
  const menu = document.getElementById('menu')

  // stateful vars
  let isLoading = true
  let inEditMode = false
  let genres = []
  let formData = {
    genre: '',
    subgenres: []
  }
  let selectedGenre = {
    id: '',
    genre: '',
    subgenres: []
  }

  // init fetch
  fetchGenres()

  // <----- LIST -------->
  function renderList(listData) {

    const gridItemList = genres.map(g => (
      ` <div class='grid-item' id="${g.id}">${g.genre}</div>
      <div class="grid-item">
       <ul>
      ${g.subgenres.map(item => (

        `<div class='container subgenre' id="${g.id}">
          <output type='text' id="${item.subgenre}" class='text subgenre'>${item.subgenre}</output>
          <input type='checkbox' id="${item.subgenre}" class='cbox subgenre' />
        </div>`
      )).join('')} </ul></div>`
    )).join('')

    const listHtml =
      `<div class="grid-container">
  <div class="grid-item header">Genre</div>
  <div class="grid-item header">Subgenres</div>
  ${gridItemList}
</div>`

    list.innerHTML = listHtml

  }

  function renderMenu() {
    const menuHtml =
      `<div class='menu-container' name='menu-container'>
        <button class='btn' name='uncheck-btn' id='uncheck'>Uncheck all</button >
      </div >`

    menu.innerHTML = menuHtml

  }


  // <----- CRUD functions -------->
  async function fetchGenres() {
    try {
      const r = await fetch(`http://localhost:3000/genres`)
      if (!r.ok) {
        throw new Error('GET: bad fetch')
      }
      const data = await r.json()
      genres = data
      renderList(data)
      renderMenu()
    } catch (error) { console.error(error) }
  }

}

window.addEventListener("DOMContentLoaded", init)



