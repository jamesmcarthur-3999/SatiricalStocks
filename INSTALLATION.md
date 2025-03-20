# Installation Guide

This guide will help you install and run Satirical Stocks on your computer.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- npm (comes with Node.js)

## Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/jamesmcarthur-3999/SatiricalStocks.git
   cd SatiricalStocks
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This will install all the required dependencies including Electron, Vue.js, and Chart.js.

3. **Run the application in development mode**

   ```bash
   npm start
   ```

   This will start the application in development mode. You can make changes to the code and see them reflected in real-time.

4. **Build the application**

   To build the application as an executable file:

   ```bash
   # For Windows
   npm run build:win
   ```

   The built application will be in the `dist` folder.

## Troubleshooting

- **Dependency errors**: If you encounter any errors during installation, try deleting the `node_modules` folder and running `npm install` again.

- **Build errors**: Make sure you have all the required build tools for your platform. For Windows, you might need to install Visual Studio Build Tools.

- **Application not starting**: Check the console output for any error messages. Make sure all paths in the code are correct for your operating system.

## Running the Packaged Executable

After building the application, you can find the installer in the `dist` folder. Run the installer to install the application on your system. Once installed, you can run it like any other application.

For Windows, look for `Satirical Stocks Setup.exe` in the `dist` folder.

## Game Instructions

1. **Starting the Game**
   - You begin with $10,000 in cash
   - Your goal is to increase your net worth through wise (or lucky) investments

2. **Buying and Selling Stocks**
   - View stock prices and trends in the Market Trends section
   - Buy stocks using the "Buy" button next to each stock
   - Sell stocks using the "Sell" button next to each stock you own
   - Watch the news feed for events that affect stock prices

3. **Upgrades**
   - As you accumulate wealth, you can purchase upgrades that give you advantages
   - Each upgrade has a different effect on gameplay
   - Some upgrades automate certain aspects of the game

4. **Saving and Loading**
   - Use the "Save Game" button to save your progress
   - Use the "Load Game" button to resume a saved game
   
5. **Winning**
   - There's no traditional "win" condition - the goal is to accumulate as much wealth as possible
   - Watch your Wealth Hoarder Status to see how you're progressing through the wealth tiers

Enjoy the game and its satirical take on wealth accumulation!