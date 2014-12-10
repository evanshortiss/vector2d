mocha		= ./node_modules/.bin/mocha
jshint		= ./node_modules/.bin/jshint
uglify		= ./node_modules/.bin/uglifyjs
linelint 	= ./node_modules/.bin/linelint
lintspaces 	= ./node_modules/.bin/lintspaces
browserify 	= ./node_modules/.bin/browserify

srcFiles = $(shell find ./src -type f -name '*.js' | xargs)

.PHONY : test
.PHONY : performance

default: format

test:format
	$(mocha) ./test/

# Test file formatting and for errors
format:
	$(linelint) $(srcFiles)
	@echo "linelint pass!\n"
	$(lintspaces) -nt -i js-comments -d spaces -s 2 $(srcFiles)
	@echo "lintspaces pass!\n"
	$(jshint) $(srcFiles)
	@echo "JSHint pass!\n"

performance:
	node --expose-gc ./performance/index.js

build:test
	$(browserify) -e ./src/Vec2D.js -o ./dist/vec2d.js -s Vec2D
	$(uglify) ./dist/vec2d.js -o ./dist/vec2d.min.js -mc