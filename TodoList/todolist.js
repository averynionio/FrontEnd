let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click", e => {
    //prevent form from being subbmited
    e.preventDefault();

    //get input value
    let form = e.target.parentElement;
    // console.log(form);
    // <form>
    //     <input type="text">
    //     <input type="number" min="1" max="12" placeholder="MM" required>
    //     <input type="number" min="1" max="12" placeholder="DD" required>
    //     <button type="submit">Add into List</button>
    // </form>
    //由此可知，我們要的資訊是第幾個
    //let todoText = form.children[0]; //<input type="text">
    let todoText = form.children[0].value; //input
    let todoMonth = form.children[1].value;
    let todoDate = form.children[2].value;

    // create a todo item
    let todo = document.createElement("div");//建立一個框 叫做todo
    todo.classList.add("todo");//把todo這個框的class 設定為todo
    let text = document.createElement("p");//建立一個p叫做text
    text.classList.add("todo-text");//把text設定class為todo-text
    text.innerText = todoText;//把p的值設定改為上面取得的todoText
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = todoMonth + " / " + todoDate;
    todo.appendChild(text); //把text 加到todo這個框下
    todo.appendChild(time); //把time 加到todo這個框下

    section.appendChild(todo); //把todo加到section下
    /*
    <section>
        <div class="todo">
            <p class="todo-text"></p>
            <p class="todo-time"></p>
        </div>
    </section>
    */
    
    //check button
    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    let completeImg = document.createElement("img");
    completeImg.classList.add("checkANDdelete");
    completeImg.src = "./check.png";
    completeButton.appendChild(completeImg)
    completeButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement;//是選到那個todo-div
        todoItem.classList.toggle("done"); //沒有done加入一個class 有就刪除（可以切換）
    })

    //delect button
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("trash");
    let deleteImg = document.createElement("img");
    deleteImg.classList.add("checkANDdelete");
    deleteImg.src = "./trash.png";
    deleteButton.appendChild(deleteImg)
    deleteButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement; //是選到那個todo-div
        todoItem.addEventListener("animationend",() => {
            //刪除localstorage
            let text = todoItem.children[0].innerText;
            let myListArry = JSON.parse(localStorage.getItem("list"));
            myListArry.forEach((item, index) => {
                if (item.todoText == text){
                    myListArry.splice(index, 1);
                    localStorage.setItem("list", JSON.stringify(myListArry));
                }
            })
            //直接todoItem.remove() 會直接刪掉沒有漸漸退出, 這會等他做完再remove
            todoItem.remove();
        })
        todoItem.style.animation = "scaleDown 0.3s forwards" //慢慢消失
    })
    
    //todo-div add button
    todo.appendChild(completeButton)
    todo.appendChild(deleteButton)

    //顯示效果，由小變大慢慢出現
    todo.style.animation = "scaleUp 0.5s forwards";


    //creat obj
    let myTodo = {
        todoText: todoText,
        todoMonth: todoMonth,
        todoDate: todoDate
    }


    //store data into array
    let myList = localStorage.getItem("list");
    if (myList == null) {
        localStorage.setItem("list", JSON.stringify([myTodo]));
    } else {
        let myListArry = JSON.parse(myList); //抓原本的轉成array
        myListArry.push(myTodo); //加入新的
        localStorage.setItem("list", JSON.stringify(myListArry)); //存回local
    }


    form.children[0].value = ""; //加入清單就清空文字
    //section add todo-div
    section.appendChild(todo);
})

//重新開一個頁面後先讀有沒有存在的todo
function loadData(){
    let myList = localStorage.getItem("list");
    if (myList !== null) {
        let myListArry = JSON.parse(myList); //抓原本的轉成array
        myListArry.forEach(item => {
            let todo = document.createElement("div");//建立一個框 叫做todo
            todo.classList.add("todo");//把todo這個框的class 設定為todo
            let text = document.createElement("p");//建立一個p叫做text
            text.classList.add("todo-text");//把text設定class為todo-text
            text.innerText = item.todoText;//把p的值設定改為上面取得的todoText
            let time = document.createElement("p");
            time.classList.add("todo-time");
            time.innerText = item.todoMonth + " / " + item.todoDate;
            todo.appendChild(text); //把text 加到todo這個框下
            todo.appendChild(time); //把time 加到todo這個框下

            //check button
            let completeButton = document.createElement("button");
            completeButton.classList.add("complete");
            let completeImg = document.createElement("img");
            completeImg.classList.add("checkANDdelete");
            completeImg.src = "./check.png";
            completeButton.appendChild(completeImg)
            completeButton.addEventListener("click", e => {
                let todoItem = e.target.parentElement;//是選到那個todo-div
                todoItem.classList.toggle("done"); //沒有done加入一個class 有就刪除（可以切換）
            })

            //delect button
            let deleteButton = document.createElement("button");
            deleteButton.classList.add("trash");
            let deleteImg = document.createElement("img");
            deleteImg.classList.add("checkANDdelete");
            deleteImg.src = "./trash.png";
            deleteButton.appendChild(deleteImg)
            deleteButton.addEventListener("click", e => {
                let todoItem = e.target.parentElement; //是選到那個todo-div
                todoItem.addEventListener("animationend",() => {
                    //刪除localstorage
                    let text = todoItem.children[0].innerText;
                    let myListArry = JSON.parse(localStorage.getItem("list"));
                    myListArry.forEach((item, index) => {
                        if (item.todoText == text){
                            myListArry.splice(index, 1);
                            localStorage.setItem("list", JSON.stringify(myListArry));
                        }
                    })
                    //直接todoItem.remove() 會直接刪掉沒有漸漸退出, 這會等他做完再remove
                    todoItem.remove();
                })
                todoItem.style.animation = "scaleDown 0.3s forwards" //慢慢消失
            }) 
            
            //todo-div add button
            todo.appendChild(completeButton)
            todo.appendChild(deleteButton)

            section.appendChild(todo);
        })
    }
}
loadData();


function mergTime(arr1, arr2){
    let result = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length){
        if (arr1[i].todoMonth > arr2[j].todoMonth) {
            result.push(arr2[j]);
            j++
        } else if (arr1[i].todoMonth < arr2[j].todoMonth) {
            result.push(arr1[i]);
            i++
        } else if (arr1[i].todoDate > arr2[j].todoDate) {
            result.push(arr2[j]);
            j++
        } else {
            result.push(arr1[i]);
            i++
        }
    }
    while (i < arr1.length){
        result.push(arr1[i]);
        i++;
    }
    while (j < arr2.length){
        result.push(arr2[j]);
        j++;
    }
    return result;
}

function mergeSort(arr) {
    if (arr.length === 1){
        return arr;
    } else {
        let middle = Math.floor(arr.length / 2);
        let left = arr.slice(0, middle);
        let right = arr.slice(middle, arr.length);
        return mergTime(mergeSort(left), mergeSort(right));
    }
}

let sortButton = document.querySelector("body div button");
sortButton.addEventListener("click", () => {
    //sort data
    let sortedArray = mergeSort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem("list", JSON.stringify(sortedArray));
    
    //remove section裡面的div
    let len = section.children.length;
    for (let i = 0; i < len; i++) {
        section.children[0].remove(); //一直刪除第一個直到沒有
    }

    //load data
    loadData();

})