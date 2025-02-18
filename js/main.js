filtrosURL()
renderFiltros(tags)

filtrar()

function filtrosURL () {
  const params = new URLSearchParams(window.location.search)
  let filtros = params.get('filtro')
  filtros = filtros.split(',')
  tags = tags.map(t => ({ ...t, activo: filtros.includes(t.nombre) }))
}

function render (filtrados) {
  const carruselDiv = document.getElementById('carrusel')
  if (filtrados.length != 0) {
    const articulos = crearArticulos(filtrados)
    const carrusel = new Carrusel(carruselDiv, articulos)
  } else {
    const noHayCards = document.createElement('h1')
    noHayCards.innerHTML = 'No hay Trabajos que coincidan con tu busqueda'
    noHayCards.classList.add('noHayCards')
    carruselDiv.innerHTML = ''

    carruselDiv.appendChild(noHayCards)
  }
}

const footer = document.getElementById('footer')
const footerMas = document.getElementById('footerMas')

window.addEventListener('scroll', function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    footer.classList.add('agrandarFooter')
    footerMas.classList.remove('footerMas')
  } else {
    footer.classList.remove('agrandarFooter')
    footerMas.classList.add('footerMas')
  }
})

// AUXILIARES
function crearArticulos (cards) {
  let resultado = []
  for (const card of cards) {
    const articulo = document.createElement('article')
    let string = ''

    if (card.video != '')
      string +=
        '<div class="video"><iframe class="video" src="' +
        card.video +
        '" title="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> </div>'
    else {
      string += '<img class="video" src="imagenes/' + card.imagen + '"></img>'
    }
    string += '<div class="titulo"><h2>' + card.titulo + '</h2></div>'
    string +=
      '<div class="datos"> <div class="categoria"> <h3>' +
      card.categoria +
      '</h3> </div>'
    string += '<div class="categoria fecha"><h5>' + card.fecha + '</h5></div>'
    string +=
      '<div class="descripcion"><h4>' + card.descripcion + '</h4> </div> <br>'
    string +=
      '<div class="lenguaje"> <h4>Lenguaje: ' + card.lenguaje + '</h4></div>'
    if (card.repo != '')
      string +=
        '<div class="repo"><a target="_blank" class="repoLink" href="' +
        card.repo +
        '">Ir al Repositorio GitHub</a></h4></div>'
    if (card.link != '')
      string +=
        ' <a target="_blank" href="' +
        card.link +
        '"><button class="boton">' +
        card.linkTexto +
        ' </button></a></div>'
    articulo.innerHTML = string
    resultado.push(articulo)
  }
  return resultado
}

document.getElementById('wasapIcon').addEventListener('click', enviar)

function enviar () {
  const link =
    'https://wa.me/' +
    '+5491135697470' +
    '?text=' +
    'Hola, quiero comunicarme con vos'
  window.open(link)
}
