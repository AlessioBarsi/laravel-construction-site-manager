# Construction Site Manager

A web application to manage and oversee construction projects and workers, built with a Laravel backend and React+Vite frontend.

## Features

- User authentication with email and password
- User submitted reports of their daily work activities, with attached images
- Construction Sites and Reports management
- Assignment of roles and work sites to users

## Installation

1. ### **Clone the repository:**
   ```sh
   git clone https://github.com/AlessioBarsi/laravel-construction-site-manager.git
   cd laravel-construction-site-manager
   ```

2. ### **Install dependencies:**

    The following dependencies are required before setting up the application:

    * [PHP 8.2 or newer](https://www.php.net/downloads) along with php-xml, php-dom and php-sqlite3 extensions
    * [Composer](https://getcomposer.org/)
    * [NodeJS](https://nodejs.org/en/download/package-manager)

    Inside the *backend/* directory, composer must be run once after cloning the repo:
    ```sh
    cd backend/
    composer update
    composer install
    ```
    Create the .env file
    ```sh
    cp .env.example .env
    ```
    Generate the application key
    ```sh
    php artisan key:generate
    ```
    Create the database and run the migrations
    ```sh
    php artisan migrate
    ```

    Seed the database with initial roles
    ```sh
    php artisan db:seed
    ```

    Run the following command to create your user account with admin permissions:
    ```sh
    php artisan admin:create
    ```

    Install the required dependencies in *frontend/*:
    ```sh
    cd ../frontend/
    npm install
    ```

    Create the .env file
    ```sh
    cp .env\ copy .env
    ```

4. ### **Run the application:**

    In the project root folder, run
    ```sh
    cd ..
    start.sh
    ```

## Usage

* Access the application at http://localhost:5173/ and login with the previously created account credentials
* Edit Account details and choose a role from the */profile* page, which can be accessed from */home*
* Other users can be given a role and admin permissions at */user* page
* You can add a new construction site at */sites*
* Click the site details button in */sites* to view the relative details page in order to assign workers to it
* New reports can be easily submitted from the home page

Start managing your construction projects efficiently!

## Screenshots

<details>
  <summary>Click to see screenshots</summary>
   
   ![](https://github.com/AlessioBarsi/alessio-barsi-portfolio/blob/main/public/projects/laravel-construction-site-manager/ScreenHome.png)

   ![](https://github.com/AlessioBarsi/alessio-barsi-portfolio/blob/main/public/projects/laravel-construction-site-manager/ScreenNewReport.png)
   
   ![](https://github.com/AlessioBarsi/alessio-barsi-portfolio/blob/main/public/projects/laravel-construction-site-manager/ScreenReport.png)
   
   ![](https://github.com/AlessioBarsi/alessio-barsi-portfolio/blob/main/public/projects/laravel-construction-site-manager/ScreenProfile.png)
   
   ![](https://github.com/AlessioBarsi/alessio-barsi-portfolio/blob/main/public/projects/laravel-construction-site-manager/ScreenUsers.png)

   ![](https://github.com/AlessioBarsi/alessio-barsi-portfolio/blob/main/public/projects/laravel-construction-site-manager/ScreenSite.png)

</details>

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## Tech Stack
Frameworks used:
* [Laravel](https://laravel.com/) for the application backend
* [React + Vite](https://vite.dev/) for the application frontend

UI Libraries:
* [Material UI](https://mui.com/material-ui/)
* [TailwindCSS](https://tailwindcss.com/)
* [react-hot-toast](https://www.npmjs.com/package/react-hot-toast)

Other libraries:
* [Axios](https://www.npmjs.com/package/axios)
* [react-router-dom](https://www.npmjs.com/package/react-router-dom)

## License
This project is licensed under the MIT License.
