import { Fragment, useRef, useState, useEffect } from "react";
import uuid4 from "uuid4";

import modEvent from "../App";

const AgendaEvent = () => {
  const [todos, setTodos] = useState([]);
  const tituloRef = useRef();
  const lugarRef = useRef();
  const fechaRef = useRef();
  const descripcionRef = useRef();

  const KEY = "todos";

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  const agregarEvento = () => {
    const titulo = tituloRef.current.value.trim();
    const lugar = lugarRef.current.value.trim();
    const fecha = fechaRef.current.value.trim();
    const descripcion = descripcionRef.current.value.trim();

    if (titulo === '' || lugar === '' || fecha === '' || descripcion === '' ) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const nuevoEvento = {
      id: uuid4(),
      titulo,
      lugar,
      fecha,
      descripcion,
    };

    setTodos((prevTodos) => [...prevTodos, nuevoEvento]);

    tituloRef.current.value = "";
    lugarRef.current.value = "";
    fechaRef.current.value = "";
    descripcionRef.current.value = "";
  };

  const eliminarEvento = (id) => {
    setTodos(todos.filter((evento) => evento.id !== id));
  };

  return (
    <Fragment>
      <div className="container d-flex justify-content-between flex-column">
        <h1 className="text-center my-4">Agenda de Eventos</h1>

        <form className="card card-body mb-4" onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            <div className="col input-group flex-nowrap my-4">
              <input type="text" className="form-control" placeholder="Titulo Evento" ref={tituloRef}/>
            </div>
            <div className="col input-group flex-nowrap my-4">
              <input type="text" className="form-control" placeholder="Lugar" ref={lugarRef}/>
            </div>
            <div className="col my-4 text-center d-grid mx-auto col-3">
              <input type="date" className="form-control" ref={fechaRef} />
            </div>
          </div>

          <div className="row">
            <div className="col-12 input-group">
              <span className="input-group-text">Descripcion</span>
              <textarea className="form-control" ref={descripcionRef}></textarea>
            </div>
          </div>

          <div className="col my-3 text-center d-grid col-6 mx-auto">
            <button className="btn btn-primary" onClick={agregarEvento}>
              Añadir
            </button>
          </div>
        </form>

        <h2>Eventos</h2>
        <div className="list-group">
          {todos.map((evento) => (
            <div key={evento.id} className="list-group-item list-group-item-action mb-2">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-2">{evento.titulo}</h5>
                <small>{evento.fecha}</small>
              </div>
              <p><strong>Lugar:</strong> {evento.lugar}</p>
              <p><strong>Descripción:</strong> {evento.descripcion}</p>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-danger me-3 d-grid col-2"
                  onClick={() => eliminarEvento(evento.id)}
                >
                  Eliminar
                </button>
                <button className="btn btn-secondary me-3 d-grid col-2">
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default AgendaEvent;

