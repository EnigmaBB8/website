const dogsdb = (dbname, table) => {
    const db = new Dexie(dbname);
    db.version(1).stores(table);
    db.open();
    return db;
  };
  
  const bulkcreate = (dbtable, data) => {
    let flag = empty(data);
    if (flag) {
      dbtable.bulkAdd([data]);
      alert("Datos insertados correctamente");
    } else {
      alert("Por favor inserta datos!");
    }
    return flag;
  };
  
  // Crear elementos dinamicos que estarán dentro de la tabla
  const createEle = (tagname, appendTo, fn) => {
    const element = document.createElement(tagname);
    if (appendTo) appendTo.appendChild(element);
    if (fn) fn(element);
  };
  
  // Verificar que los campos hayan sido llenados
  const empty = object => {
    let flag = false;
    for (const value in object) {
      if (object[value] != "" && object.hasOwnProperty(value)) {
        flag = true;
      } else {
        flag = false;
      }
    }
    return flag;
  };
  
  // Obtener datos de la base de datos
  const getData = (dbname, fn) => {
    let index = 0;
    let obj = {};
    dbname.count(count => {
      // Contar el numero de filas de la tabla
      if (count) {
        dbname.each(table => {
          obj = SortObj(table);
          fn(obj, index++);
        });
      } else {
        fn(0);
      }
    });
  };
  
  const SortObj = (sortobj) => {
    let obj = {};
    obj = {
      id: sortobj.id,
      raza: sortobj.raza,
      lugar: sortobj.lugar,
      edad: sortobj.edad,
      sexo: sortobj.sexo,
      color: sortobj.color,
      vacuna: sortobj.vacuna
    };
    return obj;
  }
  
  
  export default dogsdb;
  export {
    bulkcreate,
    createEle,
    getData,
    SortObj
  };