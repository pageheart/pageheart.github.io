        var orderListDrag = undefined;
        document.addEventListener("DOMContentLoaded", function(){
            orderListDrag = function () {
                const list = document.querySelector('.list')
                //const listItems = document.querySelectorAll('.list-item')
                //const listHidden = document.querySelector('.list-hidden')
    
                // let dragIndex, dragSource
    
                const getMouseOffset = (evt) => {
                    const targetRect = evt.target.getBoundingClientRect()
                    const offset = {
                        x: evt.pageX - targetRect.left,
                        y: evt.pageY - targetRect.top
                    }
                    return offset
                }
    
                const getElementVerticalCenter = (el) => {
                    const rect = el.getBoundingClientRect()
                    return (rect.bottom - rect.top) / 2
                }
    
                const appendPlaceholder = (evt, idx) => {
                    evt.preventDefault()
                    if (idx === dragIndex) {
                        return
                    }
                    
                    const offset = getMouseOffset(evt)
                    const middleY = getElementVerticalCenter(evt.target)
                    const placeholder = list.children[dragIndex]
                    
                    // console.log(`hover on ${idx} ${offset.y > middleY ? 'bottom half' : 'top half'}`)
                    if (offset.y > middleY) {
                        list.insertBefore(evt.target, placeholder)
                    } else if (list.children[idx + 1]) {
                        list.insertBefore(evt.target.nextSibling || evt.target, placeholder)
                    }
                    return
                }
    
                function sortable(rootEl, onUpdate) {
                    var dragEl;
                    
                    // Making all siblings movable
                    [].slice.call(rootEl.children).forEach(function (itemEl) {
                        itemEl.draggable = true;
                    });
                    
                    // Function responsible for sorting
                    function _onDragOver(evt) {
                        evt.preventDefault();
                        evt.dataTransfer.dropEffect = 'move';
                        
                        var target = evt.target;
                        //if (target && target !== dragEl && target.nodeName == 'DIV') {
                        if (target && target !== dragEl) {
                            // Sorting
                            const offset = getMouseOffset(evt)
                            const middleY = getElementVerticalCenter(evt.target)
    
                            try {
    
                                if (offset.y > middleY) {
                                    rootEl.insertBefore(dragEl, target.nextSibling)
                                } else {
                                    rootEl.insertBefore(dragEl, target)
                                }
                            }
                            catch(e) {
                            }
                        }
                    }
                    
                    // End of sorting
                    function _onDragEnd(evt){
                        evt.preventDefault();
                        
                        dragEl.classList.remove('ghost');
                        rootEl.removeEventListener('dragover', _onDragOver, false);
                        rootEl.removeEventListener('dragend', _onDragEnd, false);
    
    
                        // Notification about the end of sorting
                        onUpdate(dragEl);
                    }
                    
                    // Sorting starts
                    rootEl.addEventListener('dragstart', function (evt){
                        dragEl = evt.target; // Remembering an element that will be moved
                        
                        // Limiting the movement type
                        evt.dataTransfer.effectAllowed = 'move';
                        evt.dataTransfer.setData('Text', dragEl.textContent);
    
    
                        // Subscribing to the events at dnd
                        rootEl.addEventListener('dragover', _onDragOver, false);
                        rootEl.addEventListener('dragend', _onDragEnd, false);
    
    
                        setTimeout(function () {
                            // If this action is performed without setTimeout, then
                            // the moved object will be of this class.
                            dragEl.classList.add('ghost');
                        }, 0)
                    }, false);
                }

                // Using                    
                sortable(list, function (item) {
                console.log(item);
                });
            }
                                

            if(typeof menuList != "undefined" && menuList.length > 0 && Array.isArray(menuList)) {
                menuList.sort(function (a, b) {
                    if (a.depth > b.depth) {
                        return 1;
                    }
                    if (a.depth < b.depth) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                });
                console.log(menuList);
                let newMenuList = new Array();
                menuList.forEach(obj => {
                    if(newMenuList.length == 0) {
                        newMenuList[0] = new Array();
                        newMenuList[0].push(obj);
                    }
                    else {
                        if(newMenuList.length > obj.depth-1) {
                            if(obj.depth == newMenuList[obj.depth-1][0].depth) {
                                newMenuList[obj.depth-1].push(obj);
                            }
                        }
                        else {
                            newMenuList[obj.depth-1] = new Array();
                            newMenuList[obj.depth-1].push(obj);
                        }
                    }
                });
                newMenuList.forEach(obj => {
                    obj.sort(function (a, b) {
                        if (a.order > b.order) {
                            return 1;
                        }
                        if (a.order < b.order) {
                            return -1;
                        }
                        // a must be equal to b
                        return 0;
                    });
                });
                let myUl = document.getElementById("myUL");
                let len = myUl.children.length; 
                for(let i=0; i<len; i++) {
                    myUl.children[0].remove();
                }
                newMenuList.forEach(obj => {
                    obj.forEach(ele => {
                        if(ele.use_yn == 'Y') {
                            let li = document.createElement("li");
                            let dataCode = document.createAttribute("data-code");
                            dataCode.value = ele.code;
                            li.appendChild(document.createTextNode(ele.name));
                            li.setAttributeNode(dataCode);
                            let parentLi = document.querySelectorAll("li[data-code='"+ele.parent_code+"']");
                            if(parentLi.length > 0 && document.getElementsByClassName("ulParentCode"+ele.parent_code).length < 1) {
                                let span = document.createElement("span");
                                span.classList = "caret";
                                span.appendChild(document.createTextNode(parentLi[0].outerText));
                                let ul = document.createElement("ul");
                                ul.classList = "nested ulParentCode"+ele.parent_code;
                                parentLi[0].innerText = "";
                                parentLi[0].appendChild(span);
                                parentLi[0].appendChild(ul);
                            }
    
                            if(ele.parent_code > 0) {
                                let li = document.createElement("li");
                                let dataCode = document.createAttribute("data-code");
                                dataCode.value = ele.code;
                                li.appendChild(document.createTextNode(ele.name));
                                li.setAttributeNode(dataCode);
                                document.getElementsByClassName("ulParentCode"+ele.parent_code)[0].appendChild(li);
                            }
                            else {
                                myUl.append(li);
                            }
                        }

                    });
                });
                menuClickSet();
            }

            
        });

        function menuClickSet() {
            var toggler = document.getElementsByClassName("caret");
            var i;

            for (i = 0; i < toggler.length; i++) {
                toggler[i].addEventListener("click", function() {
                    this.parentElement.querySelector(".nested").classList.toggle("active");
                    this.classList.toggle("caret-down");
                });
            }

            let myUlLi = document.querySelectorAll("#myUL li");

            myUlLi.forEach(ele => {
                ele.addEventListener("click", function(doc) {
                    if(doc.target.nodeName == "SPAN" && doc.target.classList.value.indexOf("caret-down") > -1) {
                        menuOrderListSet(doc.target.closest("li").childNodes[1].childNodes);
                    }
                    else {
                        menuOrderListSet(doc.target.closest("ul").childNodes);
                    }
                });
            });

            function menuOrderListSet(nodes) {
                let menuOrderList = document.getElementById("menuOrderList");
                let len = menuOrderList.children.length; 
                for(let i=0; i<len; i++) {
                    menuOrderList.children[0].remove();
                }

                nodes.forEach(e=>{
                    if(e.outerText) {
                        let li = document.createElement("li");
                        li.classList = "list-item";
                        let draggable = document.createAttribute("draggable");
                        draggable.value = true;
                        li.setAttributeNode(draggable);
                        li.appendChild(document.createTextNode(e.outerText.split("\n")[0]));
                        menuOrderList.appendChild(li);
                    }
                });
            }

            orderListDrag();
        }

        let menuList = [
            {
                code : 1,
                depth : 1,
                order : 1,
                name : 'water',
                parent_code : 0,
                link : 'water.com',
                use_yn : 'Y'
            },
            {
                code : 4,
                depth : 2,
                order : 1,
                name : 'americano',
                parent_code : 2,
                link : 'americano.com',
                use_yn : 'Y'
            },
            {
                code : 2,
                depth : 1,
                order : 3,
                name : 'coffee',
                parent_code : 0,
                link : 'coffee.com',
                use_yn : 'Y'
            },
            {
                code : 3,
                depth : 1,
                order : 2,
                name : 'tea',
                parent_code : 0,
                link : 'tea.com',
                use_yn : 'Y'
            },
            {
                code : 5,
                depth : 2,
                order : 2,
                name : 'latte',
                parent_code : 2,
                link : 'latte.com',
                use_yn : 'Y'
            },
            {
                code : 6,
                depth : 3,
                order : 1,
                name : '123',
                parent_code : 5,
                link : 'tea.com',
                use_yn : 'Y'
            },
            {
                code : 7,
                depth : 3,
                order : 1,
                name : 'lat124te',
                parent_code : 5,
                link : 'latte.com',
                use_yn : 'N'
            },
            {
                code : 8,
                depth : 2,
                order : 1,
                name : 'air',
                parent_code : 1,
                link : 'latte.com',
                use_yn : 'Y'
            },
            {
                code : 9,
                depth : 1,
                order : 4,
                name : '44444',
                parent_code : 0,
                link : 'latte.com',
                use_yn : 'Y'
            },
            {
                code : 10,
                depth : 1,
                order : 5,
                name : '55555555',
                parent_code : 0,
                link : 'latte.com',
                use_yn : 'Y'
            }
        ]
