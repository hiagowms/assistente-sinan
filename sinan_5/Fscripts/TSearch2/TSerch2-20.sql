CREATE OR REPLACE FUNCTION set_curcfg(int)
	returns void
	as '$libdir/tsearch2'
	language 'C'
	with (isstrict);

CREATE OR REPLACE FUNCTION set_curcfg(text)
	returns void
	as '$libdir/tsearch2', 'set_curcfg_byname'
	language 'C'
	with (isstrict);

CREATE OR REPLACE FUNCTION show_curcfg()
	returns oid
	as '$libdir/tsearch2'
	language 'C'
	with (isstrict);
