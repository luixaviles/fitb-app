# FITB - App

A reusable form component using the FITB-Concept, implemented using Nx, Angular, TypeScript and Bootstrap 5.

<img src="./screenshots/screen.gif?raw=true" width="400">

## Project Architecture
The project has been generated using the latest version of Nx. It defines a single Angular application along with the libraries related to the app and other shared libraries.

<img src="./screenshots/graph-1.png?raw=true" width="400">

Let's describe the Project graph based on the provided app and libraries:

* `client`: An Angular project that implements the Frontend application using the latest version: v18.
* `form`: Implements the dynamic form component. This component needs to be created using the `config` content.
* `widget`: Implements a component that can render a set of data(based on the provided configuration), and render nested elements if they are provided.
* `data-access`: Implements a data access layer and the services needed to access the configuration object and other parameters.
* `data`: Defines the source data(`config.ts`) for all the project. It may be used to add more configuration objects and use different data formats.
* `types`: A library that provides all TypeScript types and provides strong typing for the project.
* `ui-dropdown`: Defines a reusable dropdown component.
* `ui-input`: Defines a reusable input component based on the ng-bootstrap library.

For a better understanding of how these libraries are defined, let's take a look at the specified folders:

<img src="./screenshots/graph-2.png?raw=true" width="400">

The `fitb` folder contains the code associated with the main application and the `shared` folder defines the agnostic widget components.

## Implemented Features
* Implemented a dynamic form using Angular's Reactive forms.
* Created reusable components that can be extended.
* Text overflow is handled without breaking the UI.
* Form fields and other elements can be shown/hidden based on the configuration.
* The Form widget component allows rendering nested elements

## Live Application
[https://luixaviles-fitb.web.app](https://luixaviles-fitb.web.app)

## Running the Project

To run the project you will need to install the dependencies and start the `client` application:

```bash
npm install
npx nx serve client
```

Then, open the browser at `http://localhost:4200` or use the assigned port.
