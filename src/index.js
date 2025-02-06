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

  // <---- MENU -------> 
  function renderMenu() {
    const menuHtml =
      `<button class='btn' name='uncheck-btn' id='uncheck'>Uncheck all</button ><br>
         <button class='btn' name='create-btn' id='create'>Create</button >`

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
      `<h2>Filter</h2>`

    filter.innerHTML = filterHtml

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



