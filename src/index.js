const init = () => {

  // DOM elements
  const menu = document.getElementById('menu')
  const form = document.getElementById('form')
  const tools = document.getElementById('tools')
  const filter = document.getElementById('filter')
  const list = document.getElementById('list')


  // stateful vars
  let isLoading = true
  let inEditMode = false
  let genres = []
  let filteredList = []
  let formData = {
    genre: '',
    subgenres: []
  }
  let filterData = {
    selectFilter: 'all',
    textFilter: ''
  }
  let selectedGenre = {
    id: '',
    genre: '',
    subgenres: []
  }

  // init fetch
  fetchGenres()

  // <---- MENU -------> 
  function renderMenu() {
    const menuHtml =
      `<div class="menu">
      <button class='button' name='uncheck-btn' id='uncheck'>Uncheck all</button ><br>
         <button class='button' name='create-btn' id='create'>Create</button >
         </div>`
    menu.innerHTML = menuHtml

    document.getElementById('uncheck').addEventListener('click', handleUncheckClick)
  }

  // <----- LIST -------->
  function renderList(listData) {

    const genreList = listData.map(g => (
      `     <tr id="${g.id}" class="row">
        <td class="td">${g.genre}</td>
        <td class="td">
        ${g.subgenres.map(s => (
        `<div class='item' id="${g.id}">
        <input type="checkbox" class="checkbox" id="${s.subgenre}" />
        <output type="text" class="output">${s.subgenre}</output>
        </div>
        `
      )).join('')}
        </td>
      </tr>`
    ))

    const listHtml =
      `<table class="th">
        <thead class="thead">
          <tr class="tr">
            <th class="th">Genre</th>
            <th class="th">Subgenres</th>
          </tr>
        </thead>
        <tbody class="tbody">
        ${genreList.join('')}
        </tbody>
      </table>`


    list.innerHTML = listHtml

  }

  function renderFilter() {
    const filterHtml =
      `<div class="container-l0">
      <div class="container-l1">
      <h3 class="h3">♆ Filter</h3>
      Genres: <select class="filter-input" id="selectFilter">
    <option class="option" value="all" selected disabled>All</option>
    <option class="option" value="edm">EDM</option>
      <option class="option" value="indie">Indie</option>
         <option class="option" value="pop">Pop</option>
    </select>
       Subgenres: <input type="text" class="filter-input" id="textFilter" placeholder="Type to search..."/>
       </div>
         <div class="container-l1">
   <h3 class="h3">☰ Sort</h3>
     <input type="button" class="sort-input" id="ascGenreAlpha" value="Genre A → Z" />
   <input type="button"  class="sort-input"  id="descGenreAlpha" value="Genre Z → A" />

          </div>
          <button type="button"  class="filter-container-input" id="clearAll">⚡ Clear All Filters/Sort</button>
      </div>`

    filter.innerHTML = filterHtml

    filter.querySelectorAll('.filter-input').forEach(input => (
      input.addEventListener('input', handleFilterInput)
    ))



    filter.querySelectorAll('.sort-input').forEach(button => (
      button.addEventListener('click', handleSortButtonClick)
    ))


    document.getElementById('clearAll').addEventListener('click', handleClearAll)

  }


  function handleFilterInput(e) {
    const { id, value } = e.target
    filterData = {
      ...filterData,
      [id]: value
    }
    const filterValues = filterData
    filterList(filterValues)
  }

  let subgenres = []
  function filterList(filterValues) {
    subgenres = genres.flatMap(genre => genre.subgenres);

    filteredList = subgenres.filter(s => s.subgenre.toLowerCase().includes(filterValues.textFilter.toLowerCase()))
    // filteredList = genres.filter(g =>
    //   (g.genre === filterValues.selectFilter || filterValues.selectFilter === 'all')


    renderList(filteredList)
  }


  function handleSortButtonClick(e) {
    let sortedList = filteredList
    const { id } = e.target
    switch (id) {
      case 'ascGenreAlpha':
        sortedList = [...genres].sort((a, b) => a.genre.localeCompare(b.genre))
        break;
      case 'descGenreAlpha':
        sortedList = [...genres].sort((a, b) => b.genre.localeCompare(a.genre))
        break;
      default:
        break;
    }
    renderList(sortedList)
  }


  function handleClearAll() {
    document.getElementById('selectFilter').value = ''
    document.getElementById('textFilter').value = ''
    renderList(genres)
  }


  function renderForm() {
    const formHtml =
      `<h2>Form</h2>`

    form.innerHTML = formHtml

  }

  function renderTools() {
    const toolsHtml =
      `<h2>Tools</h2>`

    tools.innerHTML = toolsHtml

  }


  function handleUncheckClick() {
    list.querySelectorAll('.checkbox').forEach(cb => {
      cb.checked = false
    })
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
      renderForm()
      renderFilter()
      renderTools()
    } catch (error) { console.error(error) }
  }

}

window.addEventListener("DOMContentLoaded", init)



