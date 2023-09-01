function deleteTodoCallback(id) {
  console.log("Done Delete");
  var deleleEl = document.getElementById(id);
  var parentEl = deleleEl.parentNode;
  parentEl.removeChild(deleleEl);
  // showTodos();
}
function deleteTodo(id) {
  console.log(id);
  var sendObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch("http://localhost:3000/todos/" + id, sendObj).then(function () {
    deleteTodoCallback(id);
  });
}

function showTodos() {
  function printData(data) {
    var parentElement = document.getElementById("mainArea");

    for (var i = 0; i < data.length; i++) {
      var childElement = document.createElement("tr");

      let title = document.createElement("td");
      title.innerHTML = data[i].title + "  ";

      let description = document.createElement("td");
      description.innerHTML = data[i].description + "  ";

      let button = document.createElement("button");
      button.innerHTML = "Delete";

      button.setAttribute("onclick", "deleteTodo(" + data[i].id + ")");

      childElement.setAttribute("id", data[i].id);

      childElement.append(title);
      childElement.append(description);
      childElement.append(button);

      parentElement.appendChild(childElement);
    }
  }

  function callback2(resp) {
    resp.json().then(printData);
  }

  fetch("http://localhost:3000/todos", {
    method: "GET",
  }).then(callback2);
}
showTodos();

function logResponse(data) {
  var parentElement = document.getElementById("mainArea");
  var childElement = document.createElement("tr");
  let title = document.createElement("td");
  title.innerHTML = data.title + " ";

  let description = document.createElement("td");
  description.innerHTML = data.description + "  ";

  let button = document.createElement("button");
  button.innerHTML = "Delete";

  button.setAttribute("onclick", "deleteTodo(" + data.id + ")");
  childElement.setAttribute("id", data.id);

  childElement.append(title);
  childElement.append(description);
  childElement.append(button);

  parentElement.appendChild(childElement);
}
function callback(resp) {
  resp.json().then(logResponse);
}
function onPress() {
  // event.preventDefault();
  var titleInput = document.getElementById("title");
  var descriptionInput = document.getElementById("description");
  var title = titleInput.value;
  var description = descriptionInput.value;
  if (title === "" || description === "") {
    alert("Title or Description is Missing!");
    return;
  } else {
    titleInput.value = "";
    descriptionInput.value = "";
    const sendObj = {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:3000/todos", sendObj).then(callback);
  }
}
