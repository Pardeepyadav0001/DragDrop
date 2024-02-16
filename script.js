// Function to save data in JSON format
function saveData() {
    var data = {
        name: document.getElementById("name").value,
        Gender: document.getElementById("Gender").value,
        condtion: document.getElementById("condtion").checked,
        Group: document.querySelector('input[name="Group"]:checked') ? document.querySelector('input[name="Group"]:checked').id : null,
        draggableItems: []
    };

    // Add support for draggable items outside the canvas
    const draggableItems = document.querySelectorAll('.draggable');
    draggableItems.forEach(function (item) {
        var id = item.id;
        var value = item.value; // Assuming the draggable item is an input field
        var position = { top: item.offsetTop, left: item.offsetLeft };
        data.draggableItems.push({ id: id, value: value, position: position });
    });

    // Add support for draggable Gender dropdown
    var genderSelect = document.getElementById("Gender");
    var genderPosition = { top: genderSelect.offsetTop, left: genderSelect.offsetLeft };
    data.draggableItems.push({ id: "Gender", value: genderSelect.value, position: genderPosition });


 // Add support for saving labels
 var labels = document.querySelectorAll('label');
 labels.forEach(function(label) {
     var forId = label.getAttribute('for');
     var textField = document.getElementById(forId);
     if (textField) {
         var labelText = label.textContent;
         data.draggableItems.push({ id: forId + '', value: labelText });
     }
 });



    var jsonData = JSON.stringify(data);

    // Create a blob with JSON data
    var blob = new Blob([jsonData], { type: "application/json" });

    // Create a link element to download the JSON file
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data.json";

    // Append the link to the document and click it programmatically to trigger download
    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
}

function displayData() {
    var outputDiv = document.getElementById('output');
    if (outputDiv) {
        var dataToDisplay = "";

        // Retrieve data from draggable fields outside the canvas
        var draggableItems = document.querySelectorAll('.draggable:not(.canvas-item)');
        draggableItems.forEach(function(item) {
            // Retrieve label associated with the draggable field
            var label = document.querySelector('label[for="' + item.id + '"]');
            var labelText = label ? label.textContent : item.id;

            // Add ID, label, and value to the displayed data
            dataToDisplay += "<p><strong>ID:</strong> " + item.id + ", <strong>Label:</strong> " + labelText + ", <strong>Value:</strong> " + item.value + "</p>";
        });

        // Update content of the output div
        outputDiv.innerHTML = dataToDisplay;
    } else {
        console.error("Output div not found.");
    }
}

// Call the displayData function whenever needed, such as after saving data
document.getElementById("saveButton").addEventListener("click", function() {
    displayData();
});




// Event listener for the "Load" button
document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const jsonData = JSON.parse(event.target.result);
        document.getElementById('name').value = jsonData.name || '';
        document.getElementById('Gender').value = jsonData.Gender || '';
        document.getElementById('condtion').checked = jsonData.condtion || false;

        if (jsonData.Group === 'radio1') {
            document.getElementById('radio1').checked = true;
        }

        // Load draggable items and their positions
        jsonData.draggableItems.forEach(function (item) {
            var draggableItem = document.getElementById(item.id);
            if (draggableItem) {
                draggableItem.value = item.value;
                draggableItem.style.position = 'absolute';
                draggableItem.style.top = item.position.top + 'px';
                draggableItem.style.left = item.position.left + 'px';
            }
        });
    };

    reader.readAsText(file);
});

// Clear form function
function clearForm() {
    document.getElementById("name").value = ""; // Clear name input
    document.getElementById("Gender").selectedIndex = 0; // Reset gender dropdown
    document.getElementById("condtion").checked = false; // Uncheck terms and condition checkbox
    document.getElementById("radio1").checked = false; // Uncheck "radio1" radio button
}

// Bind clearForm function to click event of Clear button
document.getElementById("clearButton").addEventListener("click", clearForm);

// Double-click event listeners to uncheck radio buttons
document.getElementById("radio1").addEventListener("dblclick", function () {
    this.checked = false;
});


// Function to handle right-click context menu
function handleContextMenu(event) {
    event.preventDefault(); // Prevent default context menu
    const menu = document.getElementById("contextMenu");
    menu.style.display = "block";
    menu.style.left = event.clientX + "px";
    menu.style.top = event.clientY + "px";
    menu.dataset.targetId = event.target.id; // Store the id of the target element
}
// Function to make elements draggable
function makeDraggable(element) {
    let clonedElement = null;

    element.addEventListener('mousedown', (e) => {
        const offsetX = e.clientX - element.getBoundingClientRect().left;
        const offsetY = e.clientY - element.getBoundingClientRect().top;

        clonedElement = element.cloneNode(true);
        clonedElement.style.position = 'absolute';
        clonedElement.style.cursor = 'grabbing';
        clonedElement.style.left = `${e.clientX - offsetX}px`;
        clonedElement.style.top = `${e.clientY - offsetY}px`;

        clonedElement.id = `name-${Math.floor(Math.random() * 100)}`

        document.body.appendChild(clonedElement);

        const handleMouseMove = (event) => {
            const x = event.clientX - offsetX;
            const y = event.clientY - offsetY;
            clonedElement.style.left = `${x}px`;
            clonedElement.style.top = `${y}px`;
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            clonedElement.style.cursor = 'grab';
            clonedElement = null;
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });
}
// Make text fields draggable
const originalElement = document.getElementById('name');
makeDraggable(originalElement);


// Make Gender dropdown draggable
const genderSelect = document.getElementById('Gender');
makeDraggable(genderSelect);

// Make checkboxes draggable
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    makeDraggable(checkbox);
});

// Make radio buttons draggable
document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    makeDraggable(radio);
});


function getAllIds() {
    var ids = [];
    var elements = document.querySelectorAll('*');
    elements.forEach(function(element) {
        ids.push(element.id);
    });
    return ids;
}



// Function to set text field as read-only
function setReadOnly(textBoxId) {
    var textBox = document.getElementById(textBoxId);
    if (textBox) {
        textBox.readOnly = true;
    } else {
        console.error("Element with ID " + textBoxId + " not found.");
    }
}








// Function to set text field as editable
function setEditable(textBoxId) {
    var textBox = document.getElementById(textBoxId);
    if (textBox) {
        textBox.readOnly = false;
    } else {
        console.error("Element with ID " + textBoxId + " not found.");
    }
}

// Function to set select element as disabled
function setDisabled(selectId) {
    var selectElement = document.getElementById(selectId);
    if (selectElement) {
        selectElement.disabled = true;
    } else {
        console.error("Element with ID " + selectId + " not found.");
    }
}

// Function to set select element as enabled
function setEnabled(selectId) {
    var selectElement = document.getElementById(selectId);
    if (selectElement) {
        selectElement.disabled = false;
    } else {
        console.error("Element with ID " + selectId + " not found.");
    }
}

function setLabel(textBoxId) {
    var newLabel = prompt("Enter new label:");
    var targetTextField = document.getElementById(textBoxId);
    if (targetTextField) {
        // Remove existing label if present
        var existingLabel = targetTextField.parentNode.querySelector('label[for="' + textBoxId + '"]');
        if (existingLabel) {
            existingLabel.remove();
        }
        
        // Create a new label element
        var labelElement = document.createElement("label");
        labelElement.textContent = newLabel;
        labelElement.setAttribute("for", textBoxId); // Set the 'for' attribute to associate with the text field
        // Position the label relative to the text field container
        labelElement.style.position = 'absolute';
        labelElement.style.top = targetTextField.offsetTop + 'px';
        labelElement.style.left = targetTextField.offsetLeft - 100 + 'px'; // Adjust left position as needed
        // Insert the label before the text field
        targetTextField.parentNode.insertBefore(labelElement, targetTextField);
    } else {
        console.error("Text field with ID " + textBoxId + " not found.");
    }
}

document.addEventListener('contextmenu', function (event) {
    var target = event.target;
    if (target.tagName === 'INPUT' && target.type === 'text') {
        event.preventDefault(); // Prevent default context menu
        var textBoxId = target.id; // Get ID of the clicked text field
        var contextMenu = [
            { label: 'Set as Read-Only', action: function () { setReadOnly(textBoxId); } },
            { label: 'Set as Editable', action: function () { setEditable(textBoxId); } },
            { label: 'Set Label', action: function () { setLabel(textBoxId); } }
        ];
        

        // Create context menu
        var menuContainer = document.createElement('div');
        menuContainer.style.position = 'absolute';
        menuContainer.style.left = event.clientX + 'px';
        menuContainer.style.top = event.clientY + 'px';
        menuContainer.style.backgroundColor = '#f9f9f9';
        menuContainer.style.padding = '5px';
        menuContainer.style.border = '1px solid #ccc';

        contextMenu.forEach(function (item) {
            var menuItem = document.createElement('div');
            menuItem.textContent = item.label;
            menuItem.style.cursor = 'pointer';
            menuItem.onclick = function () {
                item.action();
                menuContainer.remove(); // Remove context menu after action
            };
            menuContainer.appendChild(menuItem);
        });

        document.body.appendChild(menuContainer);

        // Hide context menu when clicking outside of it
        document.addEventListener('click', function (e) {
            if (!menuContainer.contains(e.target)) {
                menuContainer.remove();
            }
        });
    }
});



// Add event listener for right-click (context menu)
document.addEventListener('contextmenu', function (event) {
    var target = event.target;
    if (target.tagName === 'SELECT') {
        event.preventDefault(); // Prevent default context menu
        var selectId = target.id; // Get ID of the clicked select element
        var contextMenu = [
            { label: 'Disable', action: function () { setDisabled(selectId); } },
            { label: 'Enable', action: function () { setEnabled(selectId); } }
        ];

        // Create context menu
        var menuContainer = document.createElement('div');
        menuContainer.style.position = 'absolute';
        menuContainer.style.left = event.clientX + 'px';
        menuContainer.style.top = event.clientY + 'px';
        menuContainer.style.backgroundColor = '#f9f9f9';
        menuContainer.style.padding = '5px';
        menuContainer.style.border = '1px solid #ccc';

        contextMenu.forEach(function (item) {
            var menuItem = document.createElement('div');
            menuItem.textContent = item.label;
            menuItem.style.cursor = 'pointer';
            menuItem.onclick = function () {
                item.action();
                menuContainer.remove(); // Remove context menu after action
            };
            menuContainer.appendChild(menuItem);
        });

        document.body.appendChild(menuContainer);

        // Hide context menu when clicking outside of it
        document.addEventListener('click', function (e) {
            if (!menuContainer.contains(e.target)) {
                menuContainer.remove();
            }
        });
    }
});



// Add event listener for right-click (context menu)
document.addEventListener('contextmenu', function (event) {
    var target = event.target;
    if (target.tagName === 'INPUT' && target.type === 'checkbox') {
        event.preventDefault(); // Prevent default context menu
        var checkboxId = target.id; // Get ID of the clicked checkbox
        var contextMenu = [
            { label: 'Read Only', action: function () { setCheckboxReadOnly(checkboxId); } },
            { label: 'Editable', action: function () { setCheckboxEditable(checkboxId); } }
        ];

        // Create context menu
        var menuContainer = document.createElement('div');
        menuContainer.style.position = 'absolute';
        menuContainer.style.left = event.clientX + 'px';
        menuContainer.style.top = event.clientY + 'px';
        menuContainer.style.backgroundColor = '#f9f9f9';
        menuContainer.style.padding = '5px';
        menuContainer.style.border = '1px solid #ccc';

        contextMenu.forEach(function (item) {
            var menuItem = document.createElement('div');
            menuItem.textContent = item.label;
            menuItem.style.cursor = 'pointer';
            menuItem.onclick = function () {
                item.action();
                menuContainer.remove(); // Remove context menu after action
            };
            menuContainer.appendChild(menuItem);
        });

        document.body.appendChild(menuContainer);

        // Hide context menu when clicking outside of it
        document.addEventListener('click', function (e) {
            if (!menuContainer.contains(e.target)) {
                menuContainer.remove();
            }
        });
    }
});

// Function to set checkbox as read-only
function setCheckboxReadOnly(checkboxId) {
    var checkbox = document.getElementById(checkboxId);
    if (checkbox) {
        checkbox.disabled = true;
    } else {
        console.error("Checkbox with ID " + checkboxId + " not found.");
    }
}

// Function to set checkbox as editable
function setCheckboxEditable(checkboxId) {
    var checkbox = document.getElementById(checkboxId);
    if (checkbox) {
        checkbox.disabled = false;
    } else {
        console.error("Checkbox with ID " + checkboxId + " not found.");
    }
}

// Add event listener for right-click (context menu)
document.addEventListener('contextmenu', function (event) {
    var target = event.target;
    if (target.tagName === 'INPUT' && target.type === 'radio') {
        event.preventDefault(); // Prevent default context menu
        var radioId = target.id; // Get ID of the clicked radio button
        var contextMenu = [
            { label: 'Read Only', action: function () { setRadioReadOnly(radioId); } },
            { label: 'Editable', action: function () { setRadioEditable(radioId); } }
        ];

        // Create context menu
        var menuContainer = document.createElement('div');
        menuContainer.style.position = 'absolute';
        menuContainer.style.left = event.clientX + 'px';
        menuContainer.style.top = event.clientY + 'px';
        menuContainer.style.backgroundColor = '#f9f9f9';
        menuContainer.style.padding = '5px';
        menuContainer.style.border = '1px solid #ccc';

        contextMenu.forEach(function (item) {
            var menuItem = document.createElement('div');
            menuItem.textContent = item.label;
            menuItem.style.cursor = 'pointer';
            menuItem.onclick = function () {
                item.action();
                menuContainer.remove(); // Remove context menu after action
            };
            menuContainer.appendChild(menuItem);
        });

        document.body.appendChild(menuContainer);

        // Hide context menu when clicking outside of it
        document.addEventListener('click', function (e) {
            if (!menuContainer.contains(e.target)) {
                menuContainer.remove();
            }
        });
    }
});


// Function to set radio button as read-only
function setRadioReadOnly(radioId) {
    var radio = document.getElementById(radioId);
    if (radio) {
        radio.disabled = true;
    } else {
        console.error("Radio button with ID " + radioId + " not found.");
    }
}

// Function to set radio button as editable
function setRadioEditable(radioId) {
    var radio = document.getElementById(radioId);
    if (radio) {
        radio.disabled = false;
    } else {
        console.error("Radio button with ID " + radioId + " not found.");
    }
}





