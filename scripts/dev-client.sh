#!/bin/bash
cd /var/www/commerce-client && git pull origin master && pnpm install && npm run build