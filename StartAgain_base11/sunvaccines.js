function Sunvaccines() {

    // Name for the visualisation to appear in the menu bar.
    this.name = 'Vaccination Distibution in Latin America';

    // Each visualisation must have a unique ID with no special
    // characters.
    this.id = 'vaccination';

    // Property to represent whether data has been loaded.
    this.loaded = false;

    // Preload the data. This function is called automatically by the
    // gallery when a visualisation is added.
    this.preload = function()
    {
        var self = this;
        this.table = loadTable(
        './data/vaccines/vaccination.csv', 'csv', 'header',
        // Callback function to set the value
        // this.loaded to true.
        function(table){
            self.loaded = true;
        });
    }

    table = [];
    var maxData;
    this.data = [];
    this.names = [];

    this.setup = function ()
    {
        // createCanvas(1000, 1000);
        this.rows = this.table.getRows();
        this.names = [];  
        for (let r = 0; r < this.rows.length; r++)
        { 
            this.names.push (this.table.rows[r].get(0))
            this.data.push (this.table.rows[r].get(1)); 
        } 
        // print(this.names);
        // print(this.data);

        angleMode(DEGREES);
        rectMode(BOTTOM);
        // for (var i = 1; i < this.rows.length; i = i + 1) {
        //   this.data.push(table.rows[i].get(1));
        // }
        maxData = max(this.data);
        // console.log(maxData);
    }

    this.destroy = function()
    {
        this.data = [];
        // this.names
        rotate(0);
        angleMode(RADIANS);
        textAlign(CENTER);
    }

    this.draw = function() {

        // background(43, 53, 63);
        textSize(30);
        fill("blue");
        stroke(89, 86, 74);
        textAlign(LEFT);
        text("Latin American Countries By Covid Vaccination %", 100, 50)

        var angleSeparation = 360 /this.names.length;
        var padding = 10;

        if (frameCount <= 400)
            maxValue = constrain(frameCount * 2, 0, 400);
        else
            maxValue = 400;
        var offset = 200;
        var dataMultiplier = (height/2-offset-padding) / maxData;

        textSize(13);
        for (var i = 0; i < this.rows.length; i=i+1)
        {
            push();
            var currentData = this.data[i];
            var finalHeight = currentData * dataMultiplier;
            var animatedHeight = map(maxValue, 0, 400, 0, finalHeight);
            translate(width / 2, height / 2);
            rotate(angleSeparation * i);
            rect(0, offset, angleSeparation*2, animatedHeight);
            rotate(88);
            text(this.names[i], offset-70, 0);
            pop()
            // console.log("maxValue: "+ maxValue,"maxData: " + maxData,"country: " + this.names[i], "Country Data: " + currentData," Animated Height: "+ animatedHeight);
            // nodraw();
        }
        // noDraw();
    }

}