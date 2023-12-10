window.addEventListener('DOMContentLoaded', function() {
  var dataInicioInput = document.getElementById('dataInicio');
  dataInicioInput.addEventListener('input', formatarData);
  
  var calcularBtn = document.getElementById('calcularBtn');
  calcularBtn.addEventListener('click', calcularMeses);
});

function formatarData() {
  var dataInicioInput = document.getElementById('dataInicio');
  var valor = dataInicioInput.value;
  
  if (valor.length === 2 && !valor.includes('/')) {
      valor += '/';
  }
  
  dataInicioInput.value = valor;
}

function calcularMeses() {
  var dataInicioInput = document.getElementById('dataInicio');
  var resultadoElement = document.getElementById('resultado');

  var dataInicio = dataInicioInput.value;
  var dataInicioParts = dataInicio.split('/');

  var mesInicio = parseInt(dataInicioParts[0]);
  var anoInicio = parseInt(dataInicioParts[1]);

  var dataAtual = new Date();
  var mesAtual = dataAtual.getMonth() + 1;

  var totalMeses = mesAtual - mesInicio + (dataAtual.getFullYear() - anoInicio) * 12;

  resultadoElement.textContent = 'O No. Total de Meses Autorizados é: ' + totalMeses;
}

window.addEventListener('DOMContentLoaded', function() {
  exibirHoraAtual();
  calcularHorasFaltantes();
  setInterval(exibirHoraAtual, 1000); // Atualizar a hora a cada segundo
  setInterval(calcularHorasFaltantes, 1000); // Recalcular as horas faltantes a cada segundo
});

function exibirHoraAtual() {
  var horaAtualElement = document.getElementById('horaAtual');
  var dataAtual = new Date();
  var horaAtual = formatarNumero(dataAtual.getHours());
  var minutoAtual = formatarNumero(dataAtual.getMinutes());
  var segundoAtual = formatarNumero(dataAtual.getSeconds());

  horaAtualElement.textContent = '⌚ ' + horaAtual + ':' + minutoAtual + ':' + segundoAtual;
}

function calcularHorasFaltantes() {
  var horasFaltantesElement = document.getElementById('horasFaltantes');
  var dataAtual = new Date();
  var horaAtual = dataAtual.getHours();

  var horasFaltantes13h = 0;
  if (horaAtual < 13) {
      horasFaltantes13h = 13 - horaAtual;
  } else if (horaAtual > 13) {
      horasFaltantes13h = 13 + (24 - horaAtual);
  }

  var horasFaltantes19h = 0;
  if (horaAtual < 19) {
      horasFaltantes19h = 19 - horaAtual;
  } else if (horaAtual > 19) {
      horasFaltantes19h = 19 + (24 - horaAtual);
  }

  horasFaltantesElement.textContent = '🕗 Faltam ' + horasFaltantes13h + 'h para 13:00  | 🕓 Faltam ' + horasFaltantes19h + 'h para 19:00. 💪 Força! ';
}

function formatarNumero(numero) {
  return numero.toString().padStart(2, '0');
}


document.getElementById('startDate').addEventListener('input', function(event) {
  var startDate = event.target.value;
  if (startDate.length === 2 || startDate.length === 5) {
      event.target.value = startDate + '/';
  }
});

document.getElementById('dateForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var startDateString = document.getElementById('startDate').value;
  var startDateParts = startDateString.split('/');

  if (startDateParts.length === 3) {
      var day = parseInt(startDateParts[0]);
      var month = parseInt(startDateParts[1]);
      var year = parseInt(startDateParts[2]);

      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          var startDate = new Date(year, month - 1, day);

          function countEventDays(startDate, endDate, option) {
              var eventDays = 0;
              var currentDate = new Date(startDate);
              while (currentDate <= endDate) {
                  if (option.includes(currentDate.getDay())) {
                      eventDays++;
                  }

                  currentDate.setDate(currentDate.getDate() + 1);
              }
              return eventDays;
          }

          var option1 = [1, 3, 5]; // segunda-feira, quarta-feira, sexta-feira
          var option2 = [2, 4, 6]; // terça-feira, quinta-feira, sábado

          var endMonth1 = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
          var endMonth2 = new Date(startDate.getFullYear(), startDate.getMonth() + 2, 0);
          var endMonth3 = new Date(startDate.getFullYear(), startDate.getMonth() + 3, 0);

          var totalOption1Month1 = countEventDays(startDate, endMonth1, option1);
          var totalOption2Month1 = countEventDays(startDate, endMonth1, option2);

          var totalOption1Month2 = countEventDays(endMonth1, endMonth2, option1);
          var totalOption2Month2 = countEventDays(endMonth1, endMonth2, option2);

          var totalOption1Month3 = countEventDays(endMonth2, endMonth3, option1);
          var totalOption2Month3 = countEventDays(endMonth2, endMonth3, option2);

          var message = `A quantidade máxima de sessões possíveis para cada mês é:\n\n`;
          message += `${endMonth1.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}: ${Math.max(totalOption1Month1, totalOption2Month1)}\n`;
          message += `${endMonth2.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}: ${Math.max(totalOption1Month2, totalOption2Month2 -1)}\n`;
          message += `${endMonth3.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}: ${Math.max(totalOption1Month3, totalOption2Month3 -1)}\n`;

          var resultElement = document.getElementById('result');
          resultElement.innerText = message;
      } else {
          alert('Formato de data inválido. Utilize o formato DD/MM/AAAA.');
      }
  } else {
      alert('Formato de data inválido. Utilize o formato DD/MM/AAAA.');
  }
});