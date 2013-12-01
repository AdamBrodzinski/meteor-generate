default:
	make test

test:
	./node_modules/mocha/bin/mocha --compilers coffee:coffee-script -R spec tests/

test_watch:
	./node_modules/mocha/bin/mocha -w --compilers coffee:coffee-script -R min tests/
