# Construction Site Manager

A web application to manage and oversee construction projects, built with a Laravel backend and React+Vite frontend.

## Features

- User submitted reports of their daily work activities, with the possibility of file attachments
- Issues and activities management
- Management and overview of assigned users to existing projects
- User authorization depending on role

## Installation

1. ### **Clone the repository:**
   ```sh
   git clone https://github.com/AlessioBarsi/laravel-construction-site-manager.git
   cd laravel-construction-site-manager
   ```

2. ### **Install dependencies:**

    The following dependencies are required before setting up the webapp:

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

    Create your user account with admin permissions:
    ```sh
    php artisan command ???
    ```
    **TODO: Make a command that creates a user with pw and email from commands argument**
    It will create an account with your email and password.

    Lastly, install the required dependencies in *frontend/*:
    ```sh
    cd ../frontend/
    npm install
    ```

3. ### **Run the application:**

    In the project root folder, run
    ```sh
    cd ..
    start.sh
    ```

## Usage

* Access the application at http://localhost:5173/ and login with the previously created account.
* Your account details can be changed from your user profile page, which can be accessed from the home screen
* Other users can be given admin permissions at `/users` page
* You can add a new construction site at `/sites`
* Click the site details button in `/sites` to view the relative details page in order to assign workers to it
* New reports can be easily submitted from the home page

Start managing your construction projects efficiently!

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## License
This project is licensed under the MIT License.