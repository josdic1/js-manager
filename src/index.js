const init = () => {

  // DOM elements
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
    console.log(listData)
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
    } catch (error) { console.error(error) }
  }

}

window.addEventListener("DOMContentLoaded", init)



