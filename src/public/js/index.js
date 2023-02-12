const prevBtn = document.querySelector('#slideshow__prev--btn');
const nextBtn = document.querySelector('#slideshow__next--btn');
const slideShow = document.querySelector('.slideshow__list');
const slideItems = document.querySelectorAll('.slideshow__item');
const slide = document.querySelector('.slideshow');
const categoriesList = document.querySelector('.header--slideshow .categories');
const addCateSelect = document.querySelector('.category__form--add select#parentId')
const uploadImagesProduct = document.querySelector('.product__form--group .btn__upload--image p');
const inputFileProduct = document.querySelector('.product__form--group #productImages');

window.addEventListener('load', async function() {
    const response = await axios.get('http://localhost:3000/category');
    const { category } = response.data.data
    
    const treeHierarchy = function(cates) {
        const roots = [];
        const children = {};

        cates.forEach(cate => {
            if(cate.parentId === '0') {
                roots.push({ value: cate });
            } else {
                if(!Array.isArray(children[cate.parentId])) {
                    children[cate.parentId] = [{ value: cate }]
                } else {
                    children[cate.parentId].push({ value: cate });
                }
            }
        })

        const findChildren = function(parent) {
            if(children[parent.value._id]) {
                parent.children = children[parent.value._id];
                parent.children.forEach(el => {
                    findChildren(el);
                })
            }
        }

        roots.forEach(el => {
            findChildren(el)
        })

        return roots
    }

    if(categoriesList) {
        function treeToHtml(tree, level) {
            if(!level) level = 0;
            let listItems = tree.map((node, index,) => {
                let result = `<li class=${level === 0 ? 'list__root' : 'list__child'} ><a href=${node.value.name.toLowerCase().split(' ').join('-')}>${node.value.name}</a></li>`;
                if(node.children) {
                    result = `<li class=${level === 0 ? 'list__root' : 'list__child'}>
                                <a href=${node.value.name.toLowerCase().split(' ').join('-')}>
                                    ${node.value.name}
                                </a>
                                ${level === 0 ? '<i class="ph-caret-right text-xs translate-y-[2px]"></i>' : ''}
                                <div class=${level === 0 ? 'menu__root' : 'menu__child'}>
                                <ul class="menu__level--${level + 1}">${treeToHtml(node.children, level + 1)}</ul></li>`
                }
                return result;
            }).join('');
            return listItems;
        }

        const listView = treeToHtml(treeHierarchy(category));
        const html = `<ul class="categories__tree">${listView}</ul>`
        categoriesList.insertAdjacentHTML('beforeend', html);
    }

    else if(addCateSelect) {
        console.log(addCateSelect);
        function treeToSelect(tree, level) {
            if(!level) level = 0;
          
            return tree.map(function(node){
                var indentation = "-".repeat(level * 3)
                var result = `<option value=${node.value._id}>${indentation}${node.value.name}</option>`;
                if(node.children)
                    result += treeToSelect(node.children, level + 1);
                return result;
            }).join('')
        }

        const html = treeToSelect(treeHierarchy(category));
        addCateSelect.insertAdjacentHTML('beforeend', html)
        
    }

})








let currentSlide = 0;

if(nextBtn) {

    timeId = setInterval(function() {
        nextBtn.click();
    }, 3000);

    slideShow.addEventListener('mouseover', function(e) {
        clearInterval(timeId);
    })

    slideShow.addEventListener('mouseleave', function() {
        timeId = setInterval(function() {
            nextBtn.click();
        }, 3000);
    })

    nextBtn.addEventListener('mouseover', function(e) {
        clearInterval(timeId);
    })

    nextBtn.addEventListener('mouseleave', function() {
        timeId = setInterval(function() {
            nextBtn.click();
        }, 3000);
    })

    prevBtn.addEventListener('mouseover', function(e) {
        clearInterval(timeId);
    })

    prevBtn.addEventListener('mouseleave', function() {
        timeId = setInterval(function() {
            nextBtn.click();
        }, 3000);
    })

    nextBtn.addEventListener('click', function() {
        if(currentSlide < slideItems.length - 1) {
            currentSlide = currentSlide + 1
            slideShow.style.transform = `translateX(-${slideItems[0].offsetWidth * currentSlide}px)`;
        } else {
            currentSlide = 0;
            slideShow.style.transform = `translateX(-${slideItems[0].offsetWidth * currentSlide}px)`;
        }
    })

}

if(prevBtn) {
    prevBtn.addEventListener('click', function() {
        if(currentSlide > 0) {
            currentSlide = currentSlide - 1;
            slideShow.style.transform = `translateX(-${slideItems[0].offsetWidth * currentSlide}px)`;
        } else {
            currentSlide = 3;
            slideShow.style.transform = `translateX(-${slideItems[0].offsetWidth * currentSlide}px)`
        }
    })
}

if(uploadImagesProduct) {
    uploadImagesProduct.addEventListener('click', function() {
        inputFileProduct.click();
    })
}



