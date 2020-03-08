## ER-TOOL


### `Requirements`
* node  v10.19.0

### `Installation`
* npm install

### `Build command`
* npm start - Runs the app in the development mode
build can be accessed through [localhost:300](http://localhost:3000/)

### `Why React`
* Experience with react library
* React suited for single page applications and the scope of the project is small
* React-related packages and support
* Community support is greater than most of the other FE libraries

### `Areas to be improved` 
* Path calculation must be improved (Adding horizontal or vertical lines instead of diagonal lines)
* Drag actual element when moving tables (currently the element position is changed after dropping it)
* UI (tables notations are bigger, should have more area for er diagram)
* Overall performance should be improved while reducing unwanted rendering and loops
* Relationship cardinality should be updated according to the user input
* Better if it's possible to alter properties through side panel by selection elements (paths or tables).
* No validations are used (validations should be added to ignore unwanted path creation eg- Drawing the same path twice, drawing paths between mismatchind data types etc)

### `Bugs`
* There can be error while calculating path, if tables are overlapped while having relationships

### `Tech`
* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* Drag and drop operations are coded on top of default drag drop events (No packages are used)
* Path calculation - After creating a relationship, two major points are calculated (start and end). 
The shortest path is calculated while ignoring existing tables locations, between start end end points. For the shortest path 'A-Start' path finding algorithm is used.
For this a tow dimensional mapping is used. It holds all non walkable pixels of the canvas
* Minimum number of Third party tools are being used (storage - redux, path detection - pathfinding, image capturing - html-to-image)
* The object that contains details about the diagram can be seen (in the consle) after clicking 'SAVE' btn.
* Go through the 'entityDiagramReducer' to get an idea about object structure and default data sets. You can mock data in this reducer (adding more tables or etc)
* Currently one to one relationship is generated as the default