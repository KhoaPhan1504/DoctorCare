# DoctorCare - KhoaDev 
1. npm install
2. Copy the .env.example, create a new file, name ".env"  in root folder (the same level with .env.example)
3. Create the database: open Mysql Workbench  run the "database.sql" in the "database" folder. 
4. Update the .env file
- If you use "no-password" to login to your database, this variable "DB_PASSWORD" will be blank, otherwise, provide your password.
Default, I use the root account. If you use other accounts, change the "DB_USERNAME" variable.
- With the variable "MAIL_USERNAME", is your email 
"MAIL_PASSWORD" is your email app password (not your email's password). you need to generate one here: https://myaccount.google.com/apppasswords
( Select App: Mail, Select Device: Windows Computer -> Generate )
5. Run: npm start
