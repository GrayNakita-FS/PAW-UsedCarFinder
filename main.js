const yearSelect = document.getElementById('year-select');
const makeSelect = document.getElementById('make-select');
const modelSelect = document.getElementById('model-select');

let carData = [];

// Fetch the car data JSON
fetch('car-dataset/car-dataset.json')
  .then(response => response.json())
  .then(data => {
    carData = data;
    console.log(carData);

    // Populate year dropdown
    const years = [...new Set(carData.map(car => car.year))].sort((a, b) => b - a);
    years.forEach(year => {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error loading car data:', error);
  });

// When year changes, populate make dropdown
yearSelect.addEventListener('change', () => {
  makeSelect.innerHTML = '<option value="">Select Make</option>';
  modelSelect.innerHTML = '<option value="">Select Model</option>';
  modelSelect.disabled = true;

  if (yearSelect.value) {
    makeSelect.disabled = false;
    const makes = [
      ...new Set(
        carData
          .filter(car => car.year == yearSelect.value)
          .map(car => car.Manufacturer)
      ),
    ].sort();
    makes.forEach(make => {
      const option = document.createElement('option');
      option.value = make;
      option.textContent = make;
      makeSelect.appendChild(option);
    });
  } else {
    makeSelect.disabled = true;
  }
});

// When make changes, populate model dropdown
makeSelect.addEventListener('change', () => {
  modelSelect.innerHTML = '<option value="">Select Model</option>';
  if (makeSelect.value) {
    modelSelect.disabled = false;
    const models = [
      ...new Set(
        carData
          .filter(
            car =>
              car.year == yearSelect.value &&
              car.Manufacturer == makeSelect.value
          )
          .map(car => car.model)
      ),
    ].sort();
    models.forEach(model => {
      const option = document.createElement('option');
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });
  } else {
    modelSelect.disabled = true;
  }
});

// Optional: Handle model selection
modelSelect.addEventListener('change', () => {
  if (modelSelect.value) {
    const car = carData.find(
      c =>
        c.year == yearSelect.value &&
        c.Manufacturer == makeSelect.value &&
        c.model == modelSelect.value
    );
    if (car) {
      console.log('Selected Car:', car);
      // You can display car details here if you want
    }
  }
});