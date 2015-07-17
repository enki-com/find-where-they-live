build:
	- rm -r dist
	mkdir dist
	jspm bundle-sfx app/main dist/app.js
	./node_modules/.bin/uglifyjs dist/app.js -o dist/app.min.js
	./node_modules/.bin/html-dist index.html --remove-all --minify --insert app.min.js --insert "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing" -o dist/index.html
	divshot push
