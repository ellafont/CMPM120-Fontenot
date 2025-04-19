// // class Start extends Scene {
// //     create() {
// //         this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
// //         this.engine.addChoice("Begin the story");
// //     }

// //     handleChoice() {
// //         this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
// //     }
// // }

// // class Location extends Scene {
// //     create(key) {
// //         // Fixed code:
// //         let locationData = this.engine.storyData.Locations[key];
// //         //let locationData = undefined; // TODO: use `key` to get the data object for the current story location
// //         this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
// //         if(locationData.Choices && locationData.Choices.length > 0) { // TODO: check if the location has any Choices
// //             for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
// //                 this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
// //                 // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
// //             }
// //         } else {
// //             this.engine.addChoice("The end.")
// //         }
// //     }

// //     handleChoice(choice) {
// //         if(choice) {
// //             this.engine.show("&gt; "+choice.Text);
// //             this.engine.gotoScene(Location, choice.Target);
// //         } else {
// //             this.engine.gotoScene(End);
// //         }
// //     }
// // }

// // class End extends Scene {
// //     create() {
// //         this.engine.show("<hr>");
// //         this.engine.show(this.engine.storyData.Credits);
// //     }
// // }

// // Engine.load(Start, 'myStory.json');

// class Start extends Scene {
//     create() {
//         this.engine.setTitle(this.engine.storyData.Title);
//         this.engine.addChoice("Begin the story");
//     }

//     handleChoice() {
//         this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);
//     }
// }

// class Location extends Scene {
//     create(key) {
//         // Get the data object for the current story location
//         let locationData = this.engine.storyData.Locations[key];
//         this.engine.show(locationData.Body);
        
//         // Check if this location has a custom class implementation
//         if (locationData.Class) {
//             // Dynamically switch to the custom scene class
//             this.engine.gotoScene(eval(locationData.Class), key);
//             return;
//         }
        
//         if(locationData.Choices && locationData.Choices.length > 0) {
//             for(let choice of locationData.Choices) {
//                 // Check if this choice requires an item
//                 if (choice.RequiredItem) {
//                     // Only show the choice if the player has the required item
//                     if (this.engine.inventory && this.engine.inventory.includes(choice.RequiredItem)) {
//                         this.engine.addChoice(choice.Text, choice);
//                     }
//                 } else {
//                     this.engine.addChoice(choice.Text, choice);
//                 }
//             }
//         } else {
//             this.engine.addChoice("The end.");
//         }
//     }

//     handleChoice(choice) {
//         if(choice) {
//             this.engine.show("&gt; " + choice.Text);
            
//             // Check if this choice leads to collecting an item
//             if (choice.Target === "Rune Acquired") {
//                 // Initialize inventory if it doesn't exist
//                 if (!this.engine.inventory) {
//                     this.engine.inventory = [];
//                 }
                
//                 // Add Rune of Radiance to inventory
//                 if (!this.engine.inventory.includes("Rune of Radiance")) {
//                     this.engine.inventory.push("Rune of Radiance");
//                     this.engine.show("<i>The Rune of Radiance has been added to your inventory!</i>");
//                 }
//             }
            
//             this.engine.gotoScene(Location, choice.Target);
//         } else {
//             this.engine.gotoScene(End);
//         }
//     }
// }

// // Custom scene for the Echoing Cavern with a special interactive mechanism
// class EchoingCavern extends Location {
//     create(key) {
//         // Get the location data from the parent class
//         let locationData = this.engine.storyData.Locations[key];
        
//         // Display the basic description
//         this.engine.show(locationData.Body);
        
//         // Add an interactive echo mechanism
//         this.engine.show("<div id='echo-input'><input type='text' id='echo-text' placeholder='Type something to echo...'><button id='echo-button'>Speak</button></div>");
        
//         // Add event listener to the echo button
//         document.getElementById('echo-button').addEventListener('click', () => {
//             const echoText = document.getElementById('echo-text').value;
            
//             if (echoText) {
//                 // Display the echo effect
//                 this.engine.show(`<i>Your words echo through the cavern: "${echoText}... ${echoText}... ${echoText}..."</i>`);
                
//                 // Different reactions based on what was said
//                 if (echoText.toLowerCase().includes('hello') || echoText.toLowerCase().includes('hi')) {
//                     this.engine.show("<i>Something seems to respond: \"Hello... hello... hello...\"</i>");
//                 } else if (echoText.toLowerCase().includes('help')) {
//                     this.engine.show("<i>A distant whisper returns: \"Sing... sing... sing...\"</i>");
//                 } else if (echoText.toLowerCase().includes('rune')) {
//                     this.engine.show("<i>The cavern trembles slightly, as if recognizing the word.</i>");
//                 } else if (echoText.toLowerCase().includes('sword')) {
//                     this.engine.show("<i>A faint glow appears momentarily on the walls before fading away.</i>");
//                 }
//             }
//         });
        
//         // Add regular choices
//         if(locationData.Choices && locationData.Choices.length > 0) {
//             for(let choice of locationData.Choices) {
//                 this.engine.addChoice(choice.Text, choice);
//             }
//         } else {
//             this.engine.addChoice("The end.");
//         }
//     }
// }

// class End extends Scene {
//     create() {
//         this.engine.show("<hr>");
//         this.engine.show(this.engine.storyData.Credits);
//     }
// }

// Engine.load(Start, 'myStory.json');

class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);
    }
}

class Location extends Scene {
    create(key) {
        // Get the data object for the current story location
        let locationData = this.engine.storyData.Locations[key];
        this.engine.show(locationData.Body);
        
        // Special case for Sword Shrine if player doesn't have the rune
        if (key === "Sword Shrine" && locationData.Choices && 
            locationData.Choices.some(c => c.RequiredItem === "Rune of Radiance") && 
            (!this.engine.inventory || !this.engine.inventory.includes("Rune of Radiance"))) {
            // Show a special message that the door won't open
            this.engine.show("<i>The massive stone door seems to be waiting for something. It won't budge no matter how hard you push.</i>");
            // Still allow the player to try, but it will redirect them
            this.engine.addChoice("Try to open the door anyway", { Text: "Try to open the door anyway", Target: "Door Blocked" });
            this.engine.addChoice("Return to the Echoing Cavern", { Text: "Return to the Echoing Cavern", Target: "Echoing Cavern" });
            return;
        }
        
        // Check if this location has a custom class implementation
        if (locationData.Class) {
            // Dynamically switch to the custom scene class
            this.engine.gotoScene(eval(locationData.Class), key);
            return;
        }
        
        if(locationData.Choices && locationData.Choices.length > 0) {
            for(let choice of locationData.Choices) {
                // Check if this choice requires an item
                if (choice.RequiredItem) {
                    // Always show the choice, but the consequence will be different if they don't have the item
                    // This is handled in handleChoice
                    this.engine.addChoice(choice.Text, choice);
                } else {
                    this.engine.addChoice(choice.Text, choice);
                }
            }
        } else {
            this.engine.addChoice("The end.");
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; " + choice.Text);
            
            // Check if this choice leads to collecting an item
            if (choice.Target === "Rune Acquired") {
                // Initialize inventory if it doesn't exist
                if (!this.engine.inventory) {
                    this.engine.inventory = [];
                }
                
                // Add Rune of Radiance to inventory
                if (!this.engine.inventory.includes("Rune of Radiance")) {
                    this.engine.inventory.push("Rune of Radiance");
                    this.engine.show("<i>The Rune of Radiance has been added to your inventory!</i>");
                }
            }
            
            // Check if this choice requires an item but player doesn't have it
            if (choice.RequiredItem && 
                (!this.engine.inventory || !this.engine.inventory.includes(choice.RequiredItem))) {
                // Redirect to the "Door Blocked" scene instead
                this.engine.gotoScene(Location, "Door Blocked");
                return;
            }
            
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

// Custom scene for the Echoing Cavern with a special interactive mechanism
class EchoingCavern extends Location {
    create(key) {
        // Get the location data from the parent class
        let locationData = this.engine.storyData.Locations[key];
        
        // Display the basic description
        this.engine.show(locationData.Body);
        
        // Add an interactive echo mechanism
        this.engine.show("<div id='echo-input'><input type='text' id='echo-text' placeholder='Type something to echo...'><button id='echo-button'>Speak</button></div>");
        
        // Add event listener to the echo button
        document.getElementById('echo-button').addEventListener('click', () => {
            const echoText = document.getElementById('echo-text').value;
            
            if (echoText) {
                // Display the echo effect
                this.engine.show(`<i>Your words echo through the cavern: "${echoText}... ${echoText}... ${echoText}..."</i>`);
                
                // Different reactions based on what was said
                if (echoText.toLowerCase().includes('hello') || echoText.toLowerCase().includes('hi')) {
                    this.engine.show("<i>Something seems to respond: \"Hello... hello... hello...\"</i>");
                } else if (echoText.toLowerCase().includes('help')) {
                    this.engine.show("<i>A distant whisper returns: \"Sing... sing... sing...\"</i>");
                } else if (echoText.toLowerCase().includes('rune')) {
                    this.engine.show("<i>The cavern trembles slightly, as if recognizing the word.</i>");
                } else if (echoText.toLowerCase().includes('sword')) {
                    this.engine.show("<i>A faint glow appears momentarily on the walls before fading away.</i>");
                }
            }
        });
        
        // Add regular choices
        if(locationData.Choices && locationData.Choices.length > 0) {
            for(let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice);
            }
        } else {
            this.engine.addChoice("The end.");
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');

