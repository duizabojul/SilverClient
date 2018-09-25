#!/bin/bash

yarn run build
osascript -e 'display notification "Déploiement en cours..." with title "Build compilé"';
firebase deploy
osascript -e 'display notification "Bwavooooo" with title "Let the Service Worker do the job"';