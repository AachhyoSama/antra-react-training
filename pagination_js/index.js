// pagination
// client side - 100, 10 , 10
// server side - 10, 10

// MVC

const baseURL = "https://jsonplaceholder.typicode.com/todos";

const itemsPerPage = 20;

let pageNum = 0;

let currentPage = 0;

fetch(baseURL)
    .then((res) => res.json())
    .then((res) => {
        renderPagination(res);
    });

function renderPagination(data) {
    const totalItemCount = data.length;

    pageNum = Math.ceil(totalItemCount / itemsPerPage);

    const pageButtonContaierEl = document.querySelector(".pagination__pages");

    for (let i = 0; i < pageNum; i++) {
        let button = document.createElement("button");
        button.innerHTML = i + 1;
        button.className = `page-${i}`;
        button.addEventListener("click", () => {
            renderPage(i);
        });
        pageButtonContaierEl.appendChild(button);
    }

    renderPage(currentPage);

    function renderPage(pageIndex) {
        const tBodyEl = document.querySelector(".container tbody");
        console.log(tBodyEl);
        currentPage = pageIndex;
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        let tRows = "";
        for (let i = start; i < end; i++) {
            const todo = data[i];
            let tRow = `<tr>
                <td>${todo.userId}</td>
                <td>${todo.id}</td>
                <td>${todo.title}</td>
                <td>${todo.completed}</td>
                </tr>`;
            tRows += tRow;
        }
        tBodyEl.innerHTML = tRows;
        const pageButtonEls = document.querySelectorAll("button[class^=page-]");

        pageButtonEls.forEach((button) => {
            console.log(typeof button.innerHTML);
            if (button.innerHTML === (currentPage + 1).toString()) {
                button.style = "background-color: red";
            } else {
                button.style = "";
            }
        });
    }

    document
        .querySelector(".pagination__prev-btn")
        .addEventListener("click", () => {
            if (currentPage >= 1) {
                renderPage(currentPage - 1);
            }
        });

    document
        .querySelector(".pagination__next-btn")
        .addEventListener("click", () => {
            if (currentPage < pageNum - 1) {
                renderPage(currentPage + 1);
            }
        });
}
