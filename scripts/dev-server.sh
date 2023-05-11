#!/bin/bash
cd /var/www/commerce-server && git pull origin master \
&& composer install && composer dumpautoload \
&& php artisan config:cache \
&& php artisan config:clear
