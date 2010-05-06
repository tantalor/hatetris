all: submodules jquery

submodules:
	git submodule init
	git submodule update

jquery:
	make -C vendors/jquery
