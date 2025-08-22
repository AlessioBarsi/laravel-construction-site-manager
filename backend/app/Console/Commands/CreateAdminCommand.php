<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CreateAdminCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new user with admin permissions';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->ask('Enter email address:');
        $password = $this->secret('Enter password:');
        $passwordConfirmation = $this->secret('Confirm password:');
        //Validate inputs
        $validator = Validator::make([
            'email' => $email,
            'password' => $password,
            'password_confirmation' => $passwordConfirmation
        ], [
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:8', 'same:password_confirmation']
        ]);

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }
            return 1;
        }
        // Create user
        $user = User::create([
            'email' => $email,
            'password' => Hash::make($password),
            'first_name' => $this->ask('First name:', 'User'),
            'last_name' => $this->ask('Last name:', '?'),
            'role' => (int) $this->ask('Role (1=User, 2=Worker, 3=Manager, 4=Technician):', 1),
            'admin' => true,
        ]);

        $this->info("User created successfully with email: {$email}");
        return 0;
    }
}
