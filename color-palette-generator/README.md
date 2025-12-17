# Color Palette Generator

## Overview
The Color Palette Generator is a Vue 3 application that allows users to create and manage color palettes. Users can generate random color palettes, select colors in different formats (HEX or RGB), and easily copy color values to the clipboard.

## Features
- Generate random color palettes based on user-defined criteria.
- Select the number of colors and the format for display (HEX or RGB).
- Display generated palettes as a horizontal strip of color cards.
- Copy color values to the clipboard with a notification upon success.
- Save palettes to localStorage for persistence.
- Information page about the application and its features.

## Project Structure
```
color-palette-generator
├── src
│   ├── main.ts               # Entry point of the application
│   ├── App.vue               # Root component
│   ├── pages
│   │   ├── index.vue         # Main page for the color palette generator
│   │   └── about.vue         # About page with application information
│   ├── components
│   │   ├── ColorPicker.vue    # Component for selecting colors and formats
│   │   ├── PaletteDisplay.vue  # Component for displaying the color palette
│   │   └── ColorCard.vue      # Component for individual color cards
│   ├── composables
│   │   ├── useColorGenerator.ts # Composable for generating color palettes
│   │   └── usePalette.ts      # Composable for managing palette state
│   ├── utils
│   │   ├── colorUtils.ts      # Utility functions for color manipulation
│   │   └── exportUtils.ts     # Functions for exporting color palettes
│   └── types
│       └── index.ts           # TypeScript interfaces and types
├── public
│   └── index.html             # Main HTML file
├── package.json                # npm configuration file
├── tsconfig.json              # TypeScript configuration file
├── vite.config.ts             # Vite configuration file
└── README.md                  # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd color-palette-generator
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
To start the development server, run:
```
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to view the application.

## License
This project is licensed under the MIT License.