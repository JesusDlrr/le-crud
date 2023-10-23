import './App.css';
import Axios from "axios";
import { useEffect, useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [years, setYears] = useState("");
  const [employees, setEmployees] = useState([]);
  const [editable, setEditable] = useState(false);

  const addEmployee = ()=>
  {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      years: years,
    }).then(()=>{
      getEmployees();
    })
  }

  const updateEmployee = ()=>
  {
    Axios.put("http://localhost:3001/update", {
      name: name,
      age: age,
      country: country,
      position: position,
      years: years,
      id: id
    }).then(()=>{
      getEmployees();
    })
  }

  const deleteEmployee = ()=>
  {
    Axios.delete("http://localhost:3001/delete/"+id).then(()=>{
      getEmployees();
    })
  }

  const getEmployees = ()=>
  {
    Axios.get("http://localhost:3001/empleados").then((response)=>
    {
      setEmployees(response.data);
    });
  }

  useEffect(()=>
  {
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
            <input type="text" className="form-control" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input type="text" className="form-control" value={age} onChange={(e)=>{setAge(e.target.value)}} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">País:</span>
            <input type="text" className="form-control" value={country} onChange={(e)=>{setCountry(e.target.value)}} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo:</span>
            <input type="text" className="form-control" value={position} onChange={(e)=>{setPosition(e.target.value)}} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años:</span>
            <input type="text" className="form-control" value={years} onChange={(e)=>{setYears(e.target.value)}} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          {
            editable? 
              <>
                <button className='btn btn-success' onClick={updateEmployee}>Actualizar</button>
                <button className='btn btn-success' onClick={()=>{
                  setEditable(false)
                  setName("");
                  setAge("");
                  setCountry("");
                  setPosition("");
                  setYears("");
                }
                }>Cancelar</button>
              </>
            :
              <button className='btn btn-success' onClick={addEmployee}>Registrar</button>
          }
        </div>
        <div className="card-footer text-muted">
          2 days ago
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
          {employees.map((employee)=>
          {
            return(
              <tr key={employee.id}>
                <th scope="row">{employee.id}</th>
                <td>{employee.name}</td>
                <td>{employee.age}</td>
                <td>{employee.country}</td>
                <td>{employee.position}</td>
                <td>{employee.years}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary" onClick={()=>{
                      setEditable(true);
                      setId(employee.id);
                      setName(employee.name);
                      setAge(employee.age);
                      setCountry(employee.country);
                      setPosition(employee.position);
                      setYears(employee.years);
                    }}>Editar</button>
                    <button type="button" className="btn btn-danger" onClick={()=>{
                      setId(employee.id);
                      deleteEmployee();
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
