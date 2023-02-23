$(document).ready(function() {
    const errorBox = document.getElementById("error");
    const tableResults = document.getElementById("table-results");
    const checkboxes = document.querySelectorAll('.single-select');
    
    if(errorBox) {
        errorBox.style.display =   'none';
        errorBox.innerHTML = "";
    }
    if(tableResults) {
        tableResults.style.display =   'none';
    }

    // Desselecciona los checkbox de la tabla de resultados
    for (const checkbox of checkboxes) {
        checkbox.addEventListener('click', function(event) {
          const isFisicasDisplayed = document.getElementById("fisicas-wrapper").style.display !== "none";
          const isMoralesDisplayed = document.getElementById("morales-wrapper").style.display !== "none";
          if(isFisicasDisplayed || isMoralesDisplayed) {
                event.preventDefault();
                return;
          }
          for (const otherCheckbox of checkboxes) {
            if (otherCheckbox !== this) {
              otherCheckbox.closest('tr').classList.remove('selected');
              otherCheckbox.checked = false;
            }
          }
          this.closest('tr').classList.toggle('selected');
        });
      }

    // comportamiento de los tabs
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        // Remove active class from all buttons
        tabBtns.forEach((b) => b.classList.remove("active"));
        // Add active class to the clicked button
        btn.classList.add("active");
        // Get the id of the clicked button
        const btnId = btn.getAttribute("id");
        // Remove active class from all tab panes
        tabPanes.forEach((pane) => pane.classList.remove("active"));
        // Get the corresponding tab pane and add active class to it
        document
        .querySelector(`#${btnId.replace("btn", "pane")}`)
        .classList.add("active");
    });
    });

    // muestra el primer tab por default
    tabBtns[0].click();
});

function login() {
    const errorBox = document.getElementById("error");
    errorBox.style.display =   'none';
    errorBox.innerHTML = "";

    axios({
        url: "./api/login.php",
        method: "post",
        responseType: "json",
        data: {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        }
    }
    ).then( res => {
        if(res.data.codigo == 1)
            window.location.href = "catalogo.php";
        else {
            errorBox.style.display =   'block';
            errorBox.innerHTML = res.data.mensaje;
        }
    })
    .catch( err => {
        errorBox.style.display =   'block';
        errorBox.innerHTML = err.response.data.mensaje;
    });
}

function logout()  {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '/index.php';
}

function generateImages() {
    const select = document.getElementById("rfcSelector");
    const labelBarcode = document.getElementById("label-barcode");
    const labelOpinion = document.getElementById("label-opinion");
    const labelConstancia = document.getElementById("label-constancia");
    const qrOpinion = document.getElementById("qr-opinion");
    const qrConstancia = document.getElementById("qr-constancia");
    const barcode = document.getElementById("barcode");
    const tableResults = document.getElementById("table-results");
    const valorSeleccionado = select.value;

    if(valorSeleccionado != "X") {
        tableResults.style.display =   'none';
        const values = valorSeleccionado.split("|");
        const host = 'https://siat-sat-gobierno.mx/app/qr/faces/pages/mobile/validadorqr.php?';
        const d2 = values[2] == 'fisica' ? '1' : '2';
        const d3 = `${values[1]}_${values[0]}`
        const opinionUrl = `${host}D1=13&D2=${d2}&D3=${d3}`;
        const constanciaUrl = `${host}D1=10&D2=${d2}&D3=${d3}`;
        
        axios({
            url: "./api/qr/generador.php",
            method: "post",
            responseType: "json",
            data: {
                opinionUrl: opinionUrl,
                constanciaUrl: constanciaUrl,
                rfc: values[0]
            }
        }
        ).then( res => {
            tableResults.style.display =   'block';
            labelBarcode.innerHTML = values[0];
            labelOpinion.innerHTML = opinionUrl;
            labelConstancia.innerHTML = constanciaUrl;
            qrOpinion.src = res.data.pathOpinion;
            qrConstancia.src = res.data.pathConstancia;
            barcode.src = res.data.pathBarcode;
        })
        .catch( err => {
            errorBox.style.display =   'block';
                errorBox.innerHTML = err.response.data.mensaje;
        });
    }
}

function editRecord() {
    const selectedValue = getSelectedValue();
    if(!selectedValue) {
        showAlert("Warning", "Seleccione un registro para editar");
        return;
    }
    getSelectedPerson(selectedValue);
}

function getSelectedValue() {
    var selectedRow = document.querySelector("tr.selected");
    var selectedValue;
    if (selectedRow) {
        selectedValue = selectedRow.cells[1].innerHTML; // Asignar el valor del td a la derecha
    }
    return selectedValue;
}

function addRecord() {
    const personaSelector = document.querySelector(".persona-selector");
    const title = document.querySelector(".new-edit-title");
    title.style.display = "block";
    personaSelector.style.visibility = "visible";
    title.innerHTML = "Agregar un nuevo registro";
    personaSelector.value = "x";
    title.scrollIntoView({behavior: "smooth"});
}

function personSeleccionChanged() {
    const personaSelect = document.getElementById("tipo-persona");
    const fisicas = document.getElementById("fisicas-wrapper");
    const morales = document.getElementById("morales-wrapper");
    switch (personaSelect.value) {
        case "fisica":
            morales.style.display = "none";
            fisicas.style.display = "block";
            break;
        case "moral":
            morales.style.display = "block";
            fisicas.style.display = "none";
            break;
        default:
            morales.style.display = "none";
            fisicas.style.display = "none";
            
    }
}

function addCancel() {
    const personaSelect = document.getElementById("tipo-persona");
    const selectorRow = document.querySelector(".persona-selector");
    const title = document.querySelector(".new-edit-title");
    if (personaSelect.value == "x") {
        selectorRow.style.visibility = "hidden";
        title.style.display = "none";
    } else {
        personaSelect.value = "x";
        personSeleccionChanged();
    } 
}

function showAlert(type, message) {
    const toastAlert = document.querySelector(".toast");
    const title = document.getElementById("toast-title");
    const body = document.getElementById("toast-message");
    title.innerHTML = type;
    body.innerHTML = message;
    const bsAlert = new bootstrap.Toast(toastAlert);
    bsAlert.show()
}

function getSelectedPerson(rfc) { 
    const spinner = document.querySelector(".spinner");
    spinner.style.visibility = "visible";
    axios({
        url: "./api/getPerson.php",
        method: "post",
        responseType: "json",
        data: {
            rfc: rfc,
        }
    }
    ).then( res => {
        if(res.data.tipo === "fisica") {
            fillEditFisicasForm(res.data);
        } else {
            fillEditMoralesForm(res.data);
        }
        spinner.style.visibility = "hidden";
    })
    .catch( err => {
        spinner.style.visibility = "hidden";
        showAlert("Error", err.message);
    });
}

function fillEditFisicasForm(data) {
    const {persona, actividades, regimenes, obligaciones} = data;
    console.log(persona);
    document.getElementById("fisicas-wrapper").style.display = "block";
    const inputRfc =  document.getElementById("input-fisicas-rfc");
    const inputFolio = document.getElementById("input-fisicas-folio");
    inputRfc.value = persona.rfc;
    inputFolio.value = persona.folio;
    inputRfc.readOnly = true;
    inputFolio.readOnly = true;
    document.getElementById("input-fisicas-nombre").value = persona.nombre;
    document.getElementById("input-fisicas-paterno").value = persona.paterno;
    document.getElementById("input-fisicas-materno").value = persona.materno;
    document.getElementById("input-fisicas-curp").value = persona.curp;
    document.getElementById("input-fisicas-nombre-comercial").value = persona.nombreComercial;
    document.getElementById("input-fisicas-sello-digital").value = persona.selloDigital;
    document.getElementById("input-fisicas-inicio-operaciones").value = persona.inicioOperaciones;
    document.getElementById("input-fisicas-ultimo-cambio").value = persona.ultimoCambio;
    
    document.getElementById("input-fisicas-tipo-calle").value = persona.tipoVialidad;
    document.getElementById("input-fisicas-nombre-vialidad").value = persona.calle;
    document.getElementById("input-fisicas-no-ext").value = persona.noExterior;
    document.getElementById("input-fisicas-no-int").value = persona.nointerior;
    document.getElementById("input-fisicas-colonia").value = persona.colonia;
    document.getElementById("input-fisicas-localidad").value = persona.localidad;
    document.getElementById("input-fisicas-cp").value = persona.cp;
    document.getElementById("input-fisicas-entre-calle").value = persona.entreCalle;
    document.getElementById("input-fisicas-entre-calle2").value = persona.entreCalle2;
    const selectEstado = document.getElementById("input-fisicas-estado");
    const optionToSelect = selectEstado.querySelector('option[value="'+ persona.estado + '"]');
    optionToSelect.selected = true;
    document.getElementById("input-fisicas-municipio").value = persona.municipio;
    document.getElementById("input-fisicas-cp").value = persona.cp;

    // Avtividades
    const actTable = document.getElementById("table-actividades");
    actividades.forEach(function(a, index) {
        const row = actTable.insertRow();
        const ordenCell = row.insertCell();
        const actCell = row.insertCell();
        const porCell = row.insertCell();
        const iniCell = row.insertCell();
        const finCell = row.insertCell();
        const buttonCellDelete = row.insertCell();
        ordenCell.innerHTML = a.orden;
        actCell.innerHTML = a.actividad;
        actCell.setAttribute("contenteditable", "true");
        porCell.innerHTML = a.porcentaje;
        porCell.setAttribute("contenteditable", "true");
        iniCell.innerHTML = formatShortDate(a.inicio, 'dd/mm/yyyy');
        iniCell.setAttribute("contenteditable", "true");
        finCell.innerHTML = formatShortDate(a.fin, 'dd/mm/yyyy');
        buttonCellDelete.innerHTML = `<button type="button" class="btn btn-outline-primary" onclick="removeRow(this)" style="margin-top:-8px"><i class="fa-solid fa-xmark"></i></button>`;
    });
    // Regimenes
    const regTable = document.getElementById("table-regimenes");
    regimenes.forEach(function(r, index) {
        const row = regTable.insertRow();
        const regCell = row.insertCell();
        const iniCell = row.insertCell();
        const finCell = row.insertCell();
        const buttonCellDelete = row.insertCell();
        regCell.innerHTML = r.regimen;
        regCell.setAttribute("contenteditable", "true");
        iniCell.innerHTML = formatShortDate(r.inicio, 'dd/mm/yyyy');
        iniCell.setAttribute("contenteditable", "true");
        finCell.innerHTML = formatShortDate(r.fin, 'dd/mm/yyyy');
        finCell.setAttribute("contenteditable", "true");
        buttonCellDelete.innerHTML = `<button type="button" class="btn btn-outline-primary" onclick="removeRow(this)" style="margin-top:-8px"><i class="fa-solid fa-xmark"></i></button>`;
    });
    // Obligaciones
    const oblTable = document.getElementById("table-obligaciones");
    obligaciones.forEach(function(o, index) {
        const row = oblTable.insertRow();
        const oblCell = row.insertCell();
        const venCell = row.insertCell();
        const iniCell = row.insertCell();
        const finCell = row.insertCell();
        oblCell.innerHTML = o.obligacion;
        venCell.innerHTML = o.vencimiento;
        venCell.setAttribute("contenteditable", "true");
        venCell.addEventListener("click", function() {
            editVencimiento(this);
          });
        iniCell.innerHTML = formatShortDate(o.inicio, 'dd/mm/yyyy');
        finCell.innerHTML = formatShortDate(o.fin, 'dd/mm/yyyy');
    });
}

function fillEditMoralesForm(person) {
    console.log(person);
}

function formatShortDate(f,format) {
    if(f !== null) {
        const fecha = new Date(f);
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1;
        const anio = fecha.getFullYear();
        switch(format) {
            case 'dd/mm/yyyy':  return dia + "/" + mes + "/" + anio;
            case 'mm/dd/yyyy':  return mes + "/" + dia + "/" + anio;
            default: return anio + "/" + mes + "/" + dia
        }
        
    }
    return "";
}

function clearForm() {
    const wrappers = document.querySelectorAll('[id*="wrapper"]');
    const inputs = document.querySelectorAll('[id^="input-"]');
    const rfcFisicas = document.getElementById("input-fisicas-rfc");
    const tables = document.querySelectorAll('[id*="table-"]');
    if(rfcFisicas.value == "") {
        Array.from(wrappers).forEach(wrapper => wrapper.style.display = "none");
    } else {
        Array.from(tables).forEach(table => {
            while (table.rows.length > 1) {
                table.deleteRow(table.rows.length -1);
            }
        });
        Array.from(inputs).forEach(input => {
            if(input.readOnly) {input.readOnly = false};
            input.value = "";
        });

    }
}

function removeRow(boton) {
    const fila = boton.parentNode.parentNode;
    fila.remove();
}

newTableRow = (table) => {
    const t = document.getElementById(table);
    const row = t.insertRow(t.rows.length);
    switch (table) {
        case "table-actividades":
            const ordenCell = row.insertCell();
            const actCell = row.insertCell();
            const porCell = row.insertCell();
            const iniActCell = row.insertCell();
            const finActCell = row.insertCell();
            const buttonActCellDelete = row.insertCell();
            ordenCell.innerHTML = t.rows.length-1;
            actCell.setAttribute("contenteditable", "true");
            porCell.setAttribute("contenteditable", "true");
            iniActCell.setAttribute("contenteditable", "true");
            finActCell.setAttribute("contenteditable", "true");
            buttonActCellDelete.innerHTML = `<button type="button" class="btn btn-outline-primary" onclick="removeRow(this)" style="margin-top:-8px"><i class="fa-solid fa-xmark"></i></button>`;
            break;
        case "table-regimenes":
            const regCell = row.insertCell();
            const iniRegCell = row.insertCell();
            const finRegCell = row.insertCell();
            const buttonRegCellDelete = row.insertCell();
            regCell.setAttribute("contenteditable", "true");
            iniRegCell.setAttribute("contenteditable", "true");
            finRegCell.setAttribute("contenteditable", "true");
            buttonRegCellDelete.innerHTML = `<button type="button" class="btn btn-outline-primary" onclick="removeRow(this)" style="margin-top:-8px"><i class="fa-solid fa-xmark"></i></button>`;
            break;
        case "table-obligaciones":
            const oblCell = row.insertCell();
            const venCell = row.insertCell();
            const iniCell = row.insertCell();
            const finCell = row.insertCell();
            const buttonOblCellDelete = row.insertCell();
            oblCell.setAttribute("contenteditable", "true");
            venCell.setAttribute("contenteditable", "true");
            venCell.addEventListener("click", function() {
                editVencimiento(this);
            });
            iniCell.setAttribute("contenteditable", "true");
            finCell.setAttribute("contenteditable", "true");
            buttonOblCellDelete.innerHTML = `<button type="button" class="btn btn-outline-primary" onclick="removeRow(this)" style="margin-top:-8px"><i class="fa-solid fa-xmark"></i></button>`;
            break;
        }
}

editVencimiento = (cell) => {
    const val = cell.innerHTML;
    if(val.indexOf("<select ") > -1) return;
    const select = document.createElement("select");
    select.setAttribute('style', 'width: 300px');
    const options = ["Seleccione...","Conjuntamente con la declaración anual del ejercicio", "A mas tardar el 30 de abril del ejercicio siguiente", "A mas tardar el día 17 del mes inmediato posterior al periodo que corresponde"];
    select.addEventListener("change", function() {
        editEndVencimiento(this);
      })
    options.forEach(op => {
        const option = document.createElement("option");
        option.value = op;
        option.text = op;
        if (op === val)
            option.selected = true;
        select.add(option);
    })
    cell.innerHTML = "";
    cell.appendChild(select);
    select.focus();
}

editEndVencimiento = (cell) => {
    const val = cell.value;
    const parent = cell.parentNode;
    parent.innerHTML = val;
}

saveForm = (formName) => {
    switch (formName) {
        case "fisicas":
            fisicasJson = collectFisicas();
            console.log(fisicasJson);
            break;
    }
}

collectFisicas = () => {
    const elm = document.querySelectorAll('[id^="input-fisicas-"]');
    const result = {};
    elm.forEach((e) => {
        const field = e.getAttribute('id').replace("input-fisicas-",""); 
        const value = e.value.trim(); 
        result[field] = value;
      });
    //return JSON.stringify(result);
    return result;
}