





let boundary;
let padding = 20;
let config = {
    backgroundShade: 255
}
let sunlightSlider = 0;

window.preload = function() {
    boundary = loadJSON("TREE_DENSITY_MIN.json");
}


window.setup = function() {
    // canvas takes up 99% of the window space
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');

    // Set the background to whatever
    background(config.backgroundShade);

    frameRate(30);
    angleMode(RADIANS);

    console.log(boundary);

    // console.log(p5.tween);
    // p5.tween.manager
    //     .addTween(config)
    //     .addMotion('backgroundShade', 5, 1500, 'easeInOutQuint')
    //     .addMotion('backgroundShade', 250, 2000, 'easeInOutQuint')
    //     .addMotion('backgroundShade', 255, 1500, 'easeInOutQuint')
    //     .addMotion('backgroundShade', 250, 1500, 'easeInOutQuint')
    //     .addMotion('backgroundShade', 5, 2000, 'easeInOutQuint')
    //     .addMotion('backgroundShade', 0, 1500, 'easeInOutQuint')
    //     .startLoop();
}



window.draw = function() {
    // Reset the canvas
    resizeCanvas(windowWidth, windowHeight);
    background(config.backgroundShade);

    // console.log(config.backgroundShade);

    // This probably sucks
    let geom;
    let polygons;
    let coords;
    let features = boundary.features;

    noStroke();
    for (let i = 0; i < features.length; i++) {
        geom = features[i].geometry;
        let properties = features[i].properties;
        // console.log(properties.TREE_DEN);
        switch (properties.TREE_DEN) {
            case "dense":
                console.log((config.backgroundShade/255)**2);
                // fill(0, 80, 51, 255);
                fill(0, 80, 51, 255 * (config.backgroundShade/255)**2);
                break;
            case "medium":
                fill(0, 130, 0, 255 * (config.backgroundShade/255)**2);
                break;
            case "sparse":
                fill(153, 160, 51, 255 * (config.backgroundShade/255)**2);
                break;
            default:
                fill(153, 255, 51, 255* (config.backgroundShade/255)**2);
                break;
        }
        if (geom) {
            polygons = geom.coordinates;
            if (polygons) {
                coords = polygons[0];
                if (coords) {
                    beginShape();
                    for (let j = 0; j < coords.length; j++) {
                        let lon = coords[j][0];
                        let lat = coords[j][1];
                        let x = map(lon, 2466478, 2530505, 0 + padding, height - padding);
                        let y = map(lat, 2435000, 2366666, 0 + padding, height - padding);
                        vertex(x,y);
                    }
                    endShape(CLOSE);
                }
            }
        }
    }

    let progress = config.backgroundShade/255;

    let clockish = "" + Math.floor(progress*12);
    let extend = "" + Math.floor(((progress*12) - Math.floor(progress*12))*60);
    clockish += ":" + (extend.length < 2 ? extend + "0" : extend) + "am";
    
    stroke(Math.cbrt(256**3 - config.backgroundShade**3));
    config.backgroundShade = vslider(config.backgroundShade, 20, 70, 200, 0, 255);

    textSize(50);
    text(clockish, width * 0.85, height * 0.1)

    textSize(30);
    fill(256 - (Math.floor(progress * 2) * 256));
    textSize(50);
    text(clockish, width * 0.85, height * 0.1)
    text("Melbourne Shade/Light Level", width * 0.73, height * 0.15);



    uiupd();
}






