import dogdb, {bulkcreate, createEle, getData, SortObj} from "./module.js";
  
  let db = dogdb("Dogdb", {
    dogs: `++id, raza, lugar, edad, sexo, color, vacuna`
  });
  
  // Datos del formulario   
  const did = document.getElementById("did");
  const raza = document.getElementById("raza");
  const lugar = document.getElementById("lugar");
  const edad = document.getElementById("edad");
  const sexo = document.getElementById("sexo");
  const color = document.getElementById("color");
  const vacuna = document.getElementById("vacuna");
  
  // Creacion de los botones iniciales
  const btncreate = document.getElementById("btn-create");
  const btnread = document.getElementById("btn-read");
  const btndelete = document.getElementById("btn-delete");
  
  // Evento de boton crear
  btncreate.onclick = event => {
    let flag = bulkcreate(db.dogs, {
      raza: raza.value,
      lugar: lugar.value,
      edad: edad.value,
      sexo: sexo.value,
      color: color.value,
      vacuna: vacuna.value
    });
    raza.value = lugar.value = edad.value = sexo.value = color.value = vacuna.value = "";
  
    // Cambio el id automaticamente sumando 1 al anterior
    getData(db.dogs, data => {
      did.value = data.id + 1 || 1;
    });
    table();
  
    let insertmsg = document.querySelector(".insertmsg");
    getMsg(flag, insertmsg);
  };
  
  // Evento para crear un registro en la tabla de la base de datos
  btnread.onclick = table;
  
  
  // Evento del boton de eliminar
  btndelete.onclick = () => {
    db.delete();
    db = dogdb("Dogdb", {
      dogs: `++id, raza, lugar, edad, sexo, color, vacuna`
    });
    db.open();
    table();
    textID(did);
    // display message
    let deletemsg = document.querySelector(".deletemsg");
    getMsg(true, deletemsg);
    alert("Se han borrado todos los registros");
  }
  
  window.onload = event => {
    textID(did);
  };
  
  //Creacion de una tabla dinamica que se llena conforme se agregan datos

  function table() {
    const tbody = document.getElementById("tbody");
    const notfound = document.getElementById("notfound");
    notfound.textContent = "";
    while (tbody.hasChildNodes()) {
      tbody.removeChild(tbody.firstChild);
    }
    getData(db.dogs, (data, index) => {
      if (data) {
        createEle("tr", tbody, tr => {
          for (const value in data) {
            createEle("td", tr, td => {
              td.textContent = data.edad === data[value] ? `${data[value]} años` : data[value];
            });
          }
          createEle("td", tr, td => {
            createEle("i", td, i => {
              i.className += "fas fa-trash-alt btndelete";
              i.setAttribute(`data-id`, data.id);
              i.onclick = deletebtn;
            });
          })
        });
      } else {
        notfound.textContent = "No hay registros de perritos!";
      }
    });
  }
  
  // Icono de eliminar que aparece a lado de cada registro
  const deletebtn = event => {
    let id = parseInt(event.target.dataset.id);
    db.dogs.delete(id);
    table();
  }

  function textID(textboxid) {
    getData(db.dogs, data => {
      textboxid.value = data.id + 1 || 1;
    });
  }
  
  // function msg
  function getMsg(flag, element) {
    if (flag) {
      element.className += " movedown";
      setTimeout(() => {
        element.classList.forEach(classname => {
          classname == "movedown" ? undefined : element.classList.remove('movedown');
        })
      }, 4000);
    }
  }
  