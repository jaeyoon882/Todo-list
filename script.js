

function remove_text(element) {
  if (!element.dataset.cleared && element.textContent.trim() === "Enter agenda:") {
    element.textContent = '';        // remove text once
    element.dataset.cleared = 'true'; // mark as cleared
  }
}


const list = document.getElementById("list");

 function createListItem(text = "") {
      const li = document.createElement("li");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      const span = document.createElement("span");
      span.contentEditable = "true";
      span.textContent = text;

      li.appendChild(checkbox);
      li.appendChild(span);
      return li;
    }


function change_list(e) {
    if(e.key == "Enter") {
        //add new bullet point
        e.preventDefault();
        const current_span = e.target.closest('span');
        if(!current_span) return;
        const current_li = current_span.closest('li');
        const new_li = createListItem();

        if(current_li.nextSibling) {
            list.insertBefore(new_li, current_li.nextSibling)
        }
            else{
                 list.appendChild(new_li);
                }
        

        //change focus
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(new_li.querySelector("span"));
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

list.addEventListener("keydown",change_list)