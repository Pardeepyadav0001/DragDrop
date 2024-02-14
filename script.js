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
    draggableItems.forEach(function(item) {
        var id = item.id;
        var value = item.value; // Assuming the draggable item is an input field
        var position = { top: item.offsetTop, left: item.offsetLeft };
        data.draggableItems.push({ id: id, value: value, position: position });
    });

    // Add support for draggable Gender dropdown
    var genderSelect = document.getElementById("Gender");
    var genderPosition = { top: genderSelect.offsetTop, left: genderSelect.offsetLeft };
    data.draggableItems.push({ id: "Gender", value: genderSelect.value, position: genderPosition });

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

// Event listener for the "Save" button
document.getElementById("saveButton").addEventListener("click", saveData);

// Event listener for the "Load" button
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const jsonData = JSON.parse(event.target.result);
        document.getElementById('name').value = jsonData.name || '';
        document.getElementById('Gender').value = jsonData.Gender || '';
        document.getElementById('condtion').checked = jsonData.condtion || false;

        if (jsonData.Group === 'radio1') {
            document.getElementById('radio1').checked = true;
        } 

        // Load draggable items and their positions
        jsonData.draggableItems.forEach(function(item) {
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
document.getElementById("radio1").addEventListener("dblclick", function() {
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

   
