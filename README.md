# BloodLevel Front-End

BloodLevel is the front-end interface for the [Pharmacokinetics](https://github.com/codekane/pharmacokinetics) 
project. It provides a user-friendly interface to visualize blood concentration levels of substances based on 
pharmacokinetic models. While functional, this project is a work-in-progress with several limitations and 
areas for improvement.

## Features
- **Real-Time Monitoring:** Displays live updates of substance concentration levels based on backend data.
- **Data Visualization:** Graphs and charts help visualize blood concentration changes over time.
- **Date Picker:** Allows users to customize the date range displayed in the chart.
- **Flexible Deployment:** Operates as both a desktop Electron app or a web-based app.

## Current Limitations
- **Limited Medication Support**
The front-end is hard-coded to display data exclusively for Dexedrine (d-amphetamine). While the backend 
supports multiple medications, extending the front-end to handle them dynamically is a potential improvement 
for future development.

- **No Substance Management:**
    Substances and their configurations must be added and managed through the admin panel provided in the 
    [Pharmacokinetics](https://github.com/codekane/pharmacokinetics) backend. This functionality is not available 
    in the BloodLevel front-end.

- **Performance Issues:**
    - Calculations for charting are not cached, resulting in performance degradation as the dataset grows.
    - When displaying large datasets (e.g., years' worth of data), rendering the chart can take up to 30 seconds.
- **Work-in-Progress:**
    The interface is limited in functionality. While it provides basic visualizations, future iterations aim to support a broader range of medications and enhance overall performance.

## Prerequisites
Ensure the [Pharmacokinetics](https://github.com/codekane/pharmacokinetics) backend is running. By default, 
it is expected to run on port `8000`. You can modify the API URL in the front-end code if necessary.

To change the API URL:
- Open `src/app/services/substance-data.service.ts`
- Modify the line:
    ```typescript
    API_URL = "http://localhost:8000/";
    ```
## Installation
1. **Clone the Repository:**
    ```bash
    git clone https://github.com/codekane/bloodlevel.git
    ```
2. **Navigate to the Project Directory:**
    cd bloodlevel

3. **Install Dependencies:**
    ```bash
    npm install
    ```

## Running the Application
BloodLevel can run in two modes: as an Electron app or as a web application.

### Run as an Electron App
Use the following command to launch the Electron desktop app:  
```bash
npm run start
```

### Run as a Web Application
Use the following command to start the application in web mode:
```bash
npm run serve
```
The web application will be available at `http://localhost:4200/`.

## Usage
1. **Ensure the Backend is Running:** Start the Pharmacokinetics backend on port 8000 or update the API_URL in the front-end code to match the backend's address.
2. **Launch the App:** Choose between Electron (`npm run start`) or web mode (`npm run serve`).
3. **Add Dose Records:** 
    - Select the date (defaults to now).
    - Choose a substance and dosage form (e.g., Dexedrine XR to visualize the biphasic release).
    - Specify the route of administration (ROI), dosage, and dosage unit.
    - Save the record to send it to the backend for storage.
4. **Visualize Data:**
    - The front-end retrieves stored dose records from the backend and performs calculations to display blood concentration levels over time.
    - Adjust the displayed date range using the date picker to explore specific periods.

## Development
This project is built with Angular and Electron.

### Development Server
Run `ng serve` for a development server. Navigate to `http://localhost:4200/`. The application will 
automatically reload if you change any of the source files.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Run Unit Tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io/).

### Run End-to-End Tests
Run `ng e2e` to execute the end-to-end tests.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request with your improvements.

## License
This project is licensed under the MIT License. See the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.


# Bloodlevel

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
