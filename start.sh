#!/bin/bash
# Navigate to the frontend directory and start the development server in the background
cd frontend/
npm run dev &
# Navigate to the backend directory
cd ../backend/
# Start the Laravel development server
php artisan serve
# Wait for all background processes to finish
wait
