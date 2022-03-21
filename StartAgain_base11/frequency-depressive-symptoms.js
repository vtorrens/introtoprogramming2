function FrequencyDepressiveSymptoms() {

    // Name for the visualisation to appear in the menu bar.
    this.name = 'USA: Frequency of Depressive Symptoms';
  
    // Each visualisation must have a unique ID with no special
    // characters.
    this.id = 'frequency-depressive-symptoms';
  
    // Property to represent whether data has been loaded.
    this.loaded = false;
  
    // Preload the data. This function is called automatically by the
    // gallery when a visualisation is added.
    this.preload = function() {
      var self = this;
      this.data = loadTable(
        './data/frequency/frequency.csv', 'csv', 'header',
        // Callback function to set the value
        // this.loaded to true.
        function(table) {
          self.loaded = true;
        });
    };
  
    this.setup = function() {
      if (!this.loaded) {
        console.log('Data not yet loaded');
        return;
      }
  
      // Create a select DOM element.
    
      this.select = createSelect();
      this.select.position(350, 150);
      this.select.addClass('drop-down1');
  
      // Fill the options with all symptoms names.
      var symptoms = this.data.columns;
      // First entry is empty.
      for (let i = 1; i < symptoms.length; i++) {
        this.select.option(symptoms[i]);
      }
    };
  
    this.destroy = function() {
      this.select.remove();
    };
  
    // Create a new pie chart object.
    this.donut = new DonutChart(width / 2, height / 2, width * 0.4, 40, 200);
  
    this.draw = function() {
      if (!this.loaded) {
        console.log('Data not yet loaded');
        return;
      }
  
      // Get the value of the symptom we're interested in from the
      // select item.
      var symptomType = this.select.value();

      // Get the column of raw data for symptomType.
      var col = this.data.getColumn(symptomType);
  
      // Convert all data strings to numbers.
      col = stringsToNumbers(col);
  
      // Copy the row labels from the table (the first item of each row).
      var labels = this.data.getColumn(0);
  
      // Colour to use for each category.
      var colours = ['blue', 'green', 'orange', 'red'];
  
      // Make a title.
      var title = 'Depression Symptom Frequency: ' + symptomType;
      var subtitle= 'Select Symptom and Hover Over Pie Chart:';
  
      // Draw the pie chart!
      this.donut.draw(col, labels, colours,title, subtitle);
    };
  }
  