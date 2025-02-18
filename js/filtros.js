function renderFiltros (tags) {
  const sectorTags = document.getElementById('sectionTags')
  const filtro = []
  const btnsTag = []
  const buscarPalabra = document.createElement('input')
  buscarPalabra.addEventListener('input', () => filtrar(buscarPalabra.value))
  buscarPalabra.placeholder = 'buscar'
  sectorTags.appendChild(buscarPalabra)

  for (let i = 0; i < tags.length; i++) {
    let btn = document.createElement('button')
    btn.innerHTML = tags[i].nombre
    btn.classList.add(`btnActivo${tags[i].activo}`)

    btn.addEventListener('click', () => btnTag(i))
    btnsTag.push(btn)
    sectorTags.appendChild(btn)
  }

  sectorTags.classList.toggle('inVisible')
  const bt = document
    .getElementById('btnBuscar')
    .addEventListener('click', () => sectorTags.classList.toggle('inVisible'))
  buscarPalabra.focus()

  function btnTag (i) {
    tags[i].activo = !tags[i].activo
    btnsTag[i].classList.remove('btnActivotrue')
    btnsTag[i].classList.remove('btnActivofalse')
    btnsTag[i].classList.add(`btnActivo${tags[i].activo}`)

    filtrar(buscarPalabra.value)
  }
}

function filtrar (palabraDelInput = '') {
  let palabrasABuscar = [
    palabraDelInput,
    ...tags.filter(tag => tag.activo).map(tag => tag.nombre)
  ]
  console.log('pala a buscar' + palabrasABuscar)
  const arrayConComa =
    palabrasABuscar.length > 0 ? `?filtro=${palabrasABuscar.join(',')}` : ''
  history.pushState(null, '', window.location.pathname + arrayConComa.replaceAll(" ","%20"))
  render(filtrado(cards, palabrasABuscar))
}

function filtrado (cards, claves) {
  claves = claves.map(p => p.toLowerCase())

  return cards.filter(c =>
    claves.every(p =>
      Object.values(c).some(attr =>
        typeof attr === 'string'
          ? attr.toLowerCase().includes(p)
          : Array.isArray(attr)
          ? attr.some(key => key.toLowerCase().includes(p))
          : false
      )
    )
  )
}
