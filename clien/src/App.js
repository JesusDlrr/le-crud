import './App.css';
import Axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

function App() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [years, setYears] = useState("");
  const [employees, setEmployees] = useState([]);
  const [editable, setEditable] = useState(false);

  const clearFields = () => {
    setEditable(false)
    setName("");
    setAge("");
    setCountry("");
    setPosition("");
    setYears("");
  }

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      years: years,
    }).then(() => {
      getEmployees();
      Swal.fire({
        title: "<strong>Registro exitoso!</strong>",
        html: `<i>El empleado ${name} fue registrado con éxito</i>`,
        icon: 'success',
        timer: 3000
      });
    }).catch(function (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró registrar el empleado!",
        footer: error.message,
      })
    })
  }

  const updateEmployee = () => {
    Axios.put("http://localhost:3001/update", {
      name: name,
      age: age,
      country: country,
      position: position,
      years: years,
      id: id
    }).then(() => {
      clearFields();
      Swal.fire({
        title: "<strong>Actualización exitosa!</strong>",
        html: `<i>El empleado ${name} fue actualizado con éxito</i>`,
        icon: 'success',
        timer: 3000
      });
    }).catch(function (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró actualizar el empleado!",
        footer: error.message,
      })
    })
  }

  const deleteEmployee = (employee) => {
    Swal.fire({
      title: "Confirmar eliminado?",
      html: `<i>Realmente desea eliminar a <strong>${employee.name}</strong>?</i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete("http://localhost:3001/delete/" + employee.id).then(() => {
          getEmployees();
          Swal.fire({
            icon: "success",
            title: `${employee.name} fue eliminado`,
            showConfirmButton: false,
            timer: 2000
          })
        }).catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se logró eliminar el empleado!",
            footer: error.message,
          })
        })
      }
    })
  }

  const getEmployees = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmployees(response.data);
    }).catch(function (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró obtener los datos de los empleados!",
        footer: error.message,
      })
    })
  }

  useEffect(() => {
    getEmployees();
  })

  return (
    <div className='container'>
      <div className="App">
      </div>
      <div className="card text-center">
        <div className="card-header">
          GESTIÓN DE EMPLEADOS
        </div>
        <div className="card-body">

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text" className="form-control" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Ingrese un nombre" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input type="text" className="form-control" value={age} onChange={(e) => { setAge(e.target.value) }} placeholder="Ingrese una edad" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">País:</span>
            <input type="text" className="form-control" value={country} onChange={(e) => { setCountry(e.target.value) }} placeholder="Ingrese un papís" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo:</span>
            <input type="text" className="form-control" value={position} onChange={(e) => { setPosition(e.target.value) }} placeholder="Ingrese un cargo" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años de experiencia:</span>
            <input type="text" className="form-control" value={years} onChange={(e) => { setYears(e.target.value) }} placeholder="Ingrese los años" aria-describedby="basic-addon1" />
          </div>

        </div>
        <div className="card-footer text-muted">
          {
            editable ?
              <>
                <button className='btn btn-warning m-2' onClick={updateEmployee}>Actualizar</button>
                <button className='btn btn-primary m-2' onClick={clearFields}>Cancelar</button>
              </>
              :
              <button className='btn btn-success' onClick={addEmployee}>Registrar</button>
          }
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">País</th>
            <th scope="col">Cargo</th>
            <th scope="col">Años</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            return (
              <tr key={employee.id}>
                <th scope="row">{employee.id}</th>
                <td>{employee.name}</td>
                <td>{employee.age}</td>
                <td>{employee.country}</td>
                <td>{employee.position}</td>
                <td>{employee.years}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary" onClick={() => {
                      setEditable(true);
                      setId(employee.id);
                      setName(employee.name);
                      setAge(employee.age);
                      setCountry(employee.country);
                      setPosition(employee.position);
                      setYears(employee.years);
                    }}>Editar</button>
                    <button type="button" className="btn btn-danger" onClick={() => {
                      deleteEmployee(employee);
                    }}>Elimiar</button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
