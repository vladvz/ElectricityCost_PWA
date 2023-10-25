const inputPrice = document.getElementById('input-price');
const inputConsumption = document.getElementById('input-cons');
const inputDuration = document.getElementById('input-dur');
const selectUnit = document.getElementById('select-unit');
const selectCost = document.getElementById('select-cost');
const outputConsumptionField = document.getElementById('output-cons');
const outputCostField = document.getElementById('output-cost');
const form = document.getElementById('converter');

function get_coefficient(selectUnit, selectTime) {
  let unitСoefficient = 1;
  let timeСoefficient = 1;

  if (selectUnit === 'wh') {
    unitСoefficient /= 1000;
  }

  switch (selectTime) {
    case 'h': timeСoefficient = 1;
    break;

    case 'd': timeСoefficient = 24;
    break;

    case 'm': timeСoefficient = 24 * 30;
    break;

    case 'y': timeСoefficient = 24 * 30 * 12;
    break;

    default:
        break;
  }

  return unitСoefficient * timeСoefficient;
}

form.addEventListener('input', () => {
  const inpPrice = parseFloat(inputPrice.value);
  const inpConsumption = parseInt(inputConsumption.value);
  const inpDuration = parseInt(inputDuration.value);
  const selUnit = selectUnit.value;
  const selCost = selectCost.value;

  const consumed = get_coefficient(selUnit, selCost) * inpConsumption * inpDuration / 100;
  const cost = consumed * inpPrice;
  outputConsumptionField.value = `Consumed: ${consumed < 1 ? (consumed * 1000).toFixed(1) + ' W' : consumed.toFixed(1) + ' kW'}`;
  outputCostField.value = `Cost: ${cost.toFixed(2)} Euro`;
});

// Recalculate form
form.dispatchEvent(new Event('input'));