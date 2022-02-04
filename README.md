# This is react based stock price prediction webapp

It uses API service from my other project [stock-prediction-api](https://github.com/dummy26/stock-prediction-api)

## Features
- Cards showing latest predictions for certain stocks
- Charts built using recharts
- Predict for a particular date

## Screenshots
![Home](https://user-images.githubusercontent.com/40134444/152542795-6622e542-88eb-43c1-a655-033604f22521.png)
![Detail](https://user-images.githubusercontent.com/40134444/152542828-d3bd1224-bf1e-4561-87a7-ecd7aeec5339.png)

## React components hierarchy

`Models`
- `Autocomplete`
- `SimpleGrid`
  - `ModelCard`

- `Model`
  - `ModelDetail`
  - `ModelPredict`
