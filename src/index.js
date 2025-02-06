const init = () => {

  // DOM elements
  const menu = document.getElementById('menu')
  const form = document.getElementById('form')
  const list = document.getElementById('list')


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
          <input type='checkbox' id="${item.subgenre}" class='checkbox' />
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
        <button class='btn' name='uncheck-btn' id='uncheck'>Uncheck all</button ><br>
         <button class='btn' name='create-btn' id='create'>Create</button >
      </div >`

    menu.innerHTML = menuHtml

    document.getElementById('uncheck').addEventListener('click', handleUncheckClick)

  }

  function handleUncheckClick(e) {
    const { checked } = e.target
    list.querySelectorAll('.checkbox').forEach(cb => {
      cb.checked = false
    })

  }

  function uncheckAll(e) {
    console.log(e.target)
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



