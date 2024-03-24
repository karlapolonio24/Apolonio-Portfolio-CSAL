(function() {
    let field = document.querySelector('.items');
    let li = Array.from(field.children);
    let originalOrder = Array.from(li); // Store the original order

    function FilterProduct() {
        for (let i of li) {
            const name = i.querySelector('strong');
            const x = name.textContent;
            i.setAttribute("data-category", x);
        }

        let indicator = document.querySelector('.indicator').children;

        this.run = function() {
            for (let i = 0; i < indicator.length; i++) {
                indicator[i].onclick = function() {
                    for (let x = 0; x < indicator.length; x++) {
                        indicator[x].classList.remove('active');
                    }
                    this.classList.add('active');
                    const displayItems = this.getAttribute('data-filter');

                    for (let z = 0; z < li.length; z++) {
                        li[z].style.transform = "scale(0)";
                        setTimeout(() => {
                            li[z].style.display = "none";
                        }, 500);

                        if ((li[z].getAttribute('data-category') == displayItems) || displayItems == "all") {
                            li[z].style.transform = "scale(1)";
                            setTimeout(() => {
                                li[z].style.display = "block";
                            }, 500);
                        }
                    }
                };
            }
        }
    }

    function SortProduct() {
        let select = document.getElementById('select');
        let ar = [];
        for (let i of li) {
            const last = i.lastElementChild;
            const x = last.textContent.trim();
            const y = Number(x.substring(1));
            i.setAttribute("data-price", y);
            ar.push(i);
        }

        this.run = () => {
            addevent();
        }

        function addevent() {
            select.onchange = sortingValue;
        }

        function sortingValue() {
            if (this.value === 'Default') {
                restoreDefaultOrder();
            }
            if (this.value === 'LowToHigh') {
                SortElem(field, ar, true);
            }
            if (this.value === 'HighToLow') {
                SortElem(field, ar, false);
            }
        }

        function SortElem(field, arr, asc) {
            mergeSort(arr, asc);
            while (field.firstChild) {
                field.removeChild(field.firstChild);
            }
            field.append(...arr);
        }

        function mergeSort(arr, asc) {
            if (arr.length <= 1) return arr;

            const mid = Math.floor(arr.length / 2);
            const left = arr.slice(0, mid);
            const right = arr.slice(mid);

            mergeSort(left, asc);
            mergeSort(right, asc);

            merge(arr, left, right, asc);
        }

        function merge(arr, left, right, asc) {
            let i = 0,
                j = 0,
                k = 0;
            while (i < left.length && j < right.length) {
                const leftPrice = Number(left[i].getAttribute('data-price'));
                const rightPrice = Number(right[j].getAttribute('data-price'));
                if ((asc && leftPrice <= rightPrice) || (!asc && leftPrice >= rightPrice)) {
                    arr[k++] = left[i++];
                } else {
                    arr[k++] = right[j++];
                }
            }

            while (i < left.length) {
                arr[k++] = left[i++];
            }

            while (j < right.length) {
                arr[k++] = right[j++];
            }
        }

        function restoreDefaultOrder() {
            while (field.firstChild) {
                field.removeChild(field.firstChild);
            }
            originalOrder.forEach(item => field.appendChild(item));
        }
    }

    new FilterProduct().run();
    new SortProduct().run();
})();
