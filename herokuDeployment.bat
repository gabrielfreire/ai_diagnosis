@ECHO off
REM https://imsdiag.herokuapp.com
git add .
git commit -m "Heroku Deployment"
git push heroku master
heroku open