CREATE OR REPLACE FUNCTION lexize(oid, text) 
	returns _text
	as '$libdir/tsearch2'
	language 'C'
	with (isstrict);

CREATE OR REPLACE FUNCTION lexize(text, text)
        returns _text
        as '$libdir/tsearch2', 'lexize_byname'
        language 'C'
        with (isstrict);

CREATE OR REPLACE FUNCTION lexize(text)
        returns _text
        as '$libdir/tsearch2', 'lexize_bycurrent'
        language 'C'
        with (isstrict);

CREATE OR REPLACE FUNCTION set_curdict(int)
	returns void
	as '$libdir/tsearch2'
	language 'C'
	with (isstrict);

CREATE OR REPLACE FUNCTION set_curdict(text)
	returns void
	as '$libdir/tsearch2', 'set_curdict_byname'
	language 'C'
	with (isstrict);

CREATE OR REPLACE FUNCTION dex_init(text)
	returns internal
	as '$libdir/tsearch2' 
	language 'C';

CREATE OR REPLACE FUNCTION dex_lexize(internal,internal,int4)
	returns internal
	as '$libdir/tsearch2'
	language 'C'
	with (isstrict);
