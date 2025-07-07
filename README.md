# ascom_project

## Patient Manager – Frontend Engineer Test

This project is a single-page web application built with **React**, **TypeScript**, and **Vite**.

The app interfaces with a secured REST API to manage patients data and display their medical parameters.

## Project Overview

This application allows users to:

- View a grid of all patients
- Filter and sort patients by name, birth date, or sex
- Open a detail/edit dialog for each patient
- View parameters associated with each patient
- Edit patient information (Family Name, Given Name, Sex)

It uses a modern UI stack with **Tailwind CSS**, **Headless UI**, and **Heroicons** to provide a clean and responsive interface.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Headless UI (accessible dropdowns & modals)
- Heroicons (Tailwind’s icon set)
- Axios (HTTP client)
- React Router DOM v7

## Node Requirements

- Node.js >= 18.0.0
- npm >= 8.0.0

## Prerequisites

Before running the app, create a `.env` file at the root.

## Setup Instructions

Clone the repository
   ```bash
   git clone https://github.com/gmorelli00/ascom_project.git
   cd ascom
   ```
   
Install dependencies
   ```bash
  npm install
   ```
Start the development server
  ```bash
  npm run dev
   ```
Open the app
Visit http://localhost:5173 in your browser.
