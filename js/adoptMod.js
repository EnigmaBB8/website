import dogdb, {createEle, getData} from "./module.js";

  var idsPerros = [];
  let db = dogdb("Dogdb", {
    dogs: `++id, raza, lugar, edad, sexo, color, vacuna`
  });

  //Obtener ID del formulario
  const pID = document.getElementById("idPerro");

  // Botón adoptar 
  const btnadopt = document.getElementById("btn-adopt");
  
  // Mostrar todos los perritos registrados 
  table();

  btnadopt.onclick=adoptarP;

  function adoptarP () {
    //Eliminar al perrito de la base de datos 
    
    if(pID.value!="") { //No se ha ingresado ningín ID;
      let id = parseInt(pID.value);

        if (idsPerros.indexOf(id)==-1){ //El perrito no existe
          window.alert("El Peludín con el ID elegido no existe. Por favor elije un ID válido");
          
        }else{//El perro existe
          db.dogs.delete(id);
          window.alert("Adoptaste al peludín con ID " +id);
          table();
        }
      
    } else{
      window.alert("Inserta ID")
    }
  }

  //Creacion de una tabla dinamica que se llena conforme se agregan datos

  function table() {
    idsPerros=[]; //vaciar arreglo de índices
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
              td.textContent = data.id === data[value] ? idsPerros.push(data[value]) : data[value];
              td.textContent = data.edad === data[value] ? `${data[value]} años` : data[value];
            });
          }
          
        });
      } else {
        notfound.textContent = "No hay registros de perritos!";
      }
    });

  }

  