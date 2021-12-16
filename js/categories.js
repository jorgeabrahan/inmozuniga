let allcategories = document.querySelectorAll('.category');

allcategories.forEach(category => {
    category.addEventListener('click', () => {
        open(`#${category.getAttribute('data-category')}`, '_self');
    });
})