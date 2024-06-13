const itensLista = document.getElementById('itens-header');
const item = document.getElementsByClassName('item-header');
const menuIcon = document.getElementById('menu-icon');
const logo = document.getElementById('logo');
const header = document.getElementsByTagName('header')[0];

window.addEventListener('load', () => {
    if (window.innerWidth <= 600) {
        itensLista.style.display = 'none';
        menuIcon.style.display = 'block';
    } else {
        itensLista.style.display = 'flex';
        menuIcon.style.display = 'none';
    }
});


window.addEventListener('resize', () => {
    if (window.innerWidth <= 600) {
        itensLista.style.display = 'none';
        menuIcon.style.display = 'block';
    } else {
        itensLista.style.display = 'flex';
        menuIcon.style.display = 'none';
    }
})

menuIcon.addEventListener('click', () => {
    if (header.classList.contains('expanded')) {
        header.classList.remove('expanded');
        logo.style.alignSelf = 'center';
        menuIcon.style.alignSelf = 'center';
        header.style.paddingTop = '0';
        itensLista.style.display = 'none';
        itensLista.style.flexDirection = 'row';
    } else {
        header.classList.add('expanded');
        logo.style.alignSelf = 'auto';
        menuIcon.style.alignSelf = 'auto';
        header.style.paddingTop = '1rem';
        itensLista.style.display = 'flex';
        itensLista.style.flexDirection = 'column';
        itensLista.style.marginBlock = '2rem';
        for (let i = 0; i < item.length; i++) {
            item[i].style.paddingTop = '.5rem';
        }
    }
});
