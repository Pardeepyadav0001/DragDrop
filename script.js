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