function getAllCars() {
  axios.get("http://localhost:3000/carros").then((cars) => {
    const body = $("#table-body");
    body.empty();
    cars.data.forEach((car) => {
      const linha = `
        <tr>
          <td>${car.id}</td>
          <td>${car.marca}</td>
          <td>${car.modelo}</td>
          <td>${car.placa}</td>
          <td>${car.cor}</td>
          <td>${car.ano_fabricacao}</td>
          <td><button class="btn btn-primary" onclick="fillData(${car.id})">Editar</button></td>
          <td><button class="btn btn-danger" onclick="deleteCar(${car.id})">Deletar</button></td>
        </tr>`;
      body.append(linha);
    });
  });
}

function deleteCar(id) {
  axios.delete(`http://localhost:3000/carros/${id}`).then(() => {
    getAllCars();
  });
}

function updateCar(id, data) {
  axios.put(`http://localhost:3000/carros/${id}`, data).then(() => {
    getAllCars();
  });
}

function fillData(id) {
  axios.get(`http://localhost:3000/carros/${id}`).then((response) => {
    const car = response.data.carro
    console.log(car)
    $("#id").val(car.id);
    $("#marca").val(car.marca);
    $("#modelo").val(car.modelo);
    $("#placa").val(car.placa);
    $("#cor").val(car.cor);
    $("#ano_fabricacao").val(car.ano_fabricacao);
  });
}

function storeCar(event) {
  event.preventDefault();

  const car = {};

  $("#form-cars")
    .serializeArray()
    .forEach(({ name, value }) => {
      car[name] = value;
    });

  const { id, ...data } = car;

  if (id) {
    updateCar(id, data);
  } else {
    axios
      .post("http://localhost:3000/carros", data)
      .then(() => {
        getAllCars();
      })
      .catch(() => {
        console.log();
      });
  }
}

$(document).ready(() => {
  getAllCars();
});
