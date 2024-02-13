// JavaScript code to handle saving data to a JSON file
window.onload = function() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    // Function to save data in JSON format
    function saveData() {
        var data = {
            name: document.getElementById("name").value,
            Gender: document.getElementById("Gender").value,
            condtion: document.getElementById("condtion").checked,
            Group: document.querySelector('input[name="Group"]:checked') ? document.querySelector('input[name="Group"]:checked').id : null
        };
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
};
function clearForm() {
    document.getElementById("name").value = ""; // Clear name input
    document.getElementById("Gender").selectedIndex = 0; // Reset gender dropdown
    document.getElementById("condtion").checked = false; // Uncheck terms and condition checkbox
    document.getElementById("Yes").checked = false; // Uncheck "Yes" radio button
    document.getElementById("No").checked = false; // Uncheck "No" radio button
  }

  // Bind clearForm function to click event of Clear button
  document.getElementById("clearButton").addEventListener("click", clearForm);

  document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
      const jsonData = JSON.parse(event.target.result);
      document.getElementById('name').value = jsonData.name || '';
      document.getElementById('Gender').value = jsonData.Gender || '';

      // Check if the condition exists in the JSON data and set the checkbox accordingly
      document.getElementById('condtion').checked = jsonData.condtion || false;

      // Check if the Group exists in the JSON data and set the appropriate radio button
      if (jsonData.Group === 'Yes') {
        document.getElementById('Yes').checked = true;
      } else if (jsonData.Group === 'No') {
        document.getElementById('No').checked = true;
      }
    };

    reader.readAsText(file);
  });

  document.getElementById("Yes").addEventListener("dblclick", function() {
    this.checked = false;
  });
  
  document.getElementById("No").addEventListener("dblclick", function() {
    this.checked = false;
  });




  const originalElement = document.getElementById('name');
  let clonedElement = null;
  
  originalElement.addEventListener('mousedown', (e) => {
      const offsetX = e.clientX - originalElement.getBoundingClientRect().left;
      const offsetY = e.clientY - originalElement.getBoundingClientRect().top;
  
      clonedElement = originalElement.cloneNode(true);
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
  
  const originalSelect = document.getElementById('Gender');
let clonedSelect = null;

originalSelect.addEventListener('mousedown', (e) => {
    const offsetX = e.clientX - originalSelect.getBoundingClientRect().left;
    const offsetY = e.clientY - originalSelect.getBoundingClientRect().top;

    clonedSelect = originalSelect.cloneNode(true);
    clonedSelect.style.position = 'absolute';
    clonedSelect.style.cursor = 'grabbing';
    clonedSelect.style.left = `${e.clientX - offsetX}px`;
    clonedSelect.style.top = `${e.clientY - offsetY}px`;

    document.body.appendChild(clonedSelect);

    const handleMouseMove = (event) => {
        const x = event.clientX - offsetX;
        const y = event.clientY - offsetY;
        clonedSelect.style.left = `${x}px`;
        clonedSelect.style.top = `${y}px`;
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        clonedSelect.style.cursor = 'grab';
        clonedSelect = null;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
});

document.querySelectorAll('.draggable').forEach((originalDiv) => {
    let clonedDiv = null;

    originalDiv.addEventListener('mousedown', (e) => {
        const offsetX = e.clientX - originalDiv.getBoundingClientRect().left;
        const offsetY = e.clientY - originalDiv.getBoundingClientRect().top;

        clonedDiv = originalDiv.cloneNode(true);
        clonedDiv.style.position = 'absolute';
        clonedDiv.style.cursor = 'grabbing';
        clonedDiv.style.left = `${e.clientX - offsetX}px`;
        clonedDiv.style.top = `${e.clientY - offsetY}px`;

        document.body.appendChild(clonedDiv);

        const handleMouseMove = (event) => {
            const x = event.clientX - offsetX;
            const y = event.clientY - offsetY;
            clonedDiv.style.left = `${x}px`;
            clonedDiv.style.top = `${y}px`;
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            clonedDiv.style.cursor = 'grab';
            clonedDiv = null;
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });
});


document.getElementById('saveButton').addEventListener('click', () => {
    const textField = document.getElementById('name'); // Get the draggable text field element

    // Save the position of the draggable text field in local storage
    localStorage.setItem('textFieldPosition', JSON.stringify({
        
    }));

    alert('Text field position saved successfully!');
});
