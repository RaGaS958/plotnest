@echo off
echo Starting PlotNest Prototype...
echo Please wait while the development server starts.
echo The application will open in your default browser shortly.

cd frontend

:: Open the browser in a new process, giving the server a couple of seconds to start
start "" cmd /c "timeout /t 3 /nobreak >nul & start http://localhost:3000"

:: Start the Vite dev server
npm run dev
