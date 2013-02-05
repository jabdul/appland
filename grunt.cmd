@echo on
setlocal
set JUNIT_OUTPUT=src-test/result/
node_modules\.bin\grunt --config grunt.js %*