const itensLista = document.getElementById('itens-header');
const menuIcon = document.getElementById('menu-icon');
const logo = document.getElementById('logo');
const header = document.getElementsByTagName('header')[0]
window.addEventListener('resize', () => {
    if (window.innerWidth <= 600) {
        itensLista.style.display = 'none'
        menuIcon.style.display = 'block'
    }
    else {
        itensLista.style.display = 'flex'
        menuIcon.style.display = 'none'
    }
})

menuIcon.addEventListener('click', () => {
    if (header.style.height == '20vh') {
        header.style.height = '10vh'
        logo.style.alignSelf = 'center'
        menuIcon.style.alignSelf = 'center'

    }
    else {
        header.style.height = '20vh'
        logo.style.alignSelf = 'auto'
        menuIcon.style.alignSelf = 'auto'
        header.style.paddingTop = '1rem'
    }
})

