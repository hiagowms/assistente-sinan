CREATE OR REPLACE FUNCTION snb_en_init(text)
	returns internal
	as '$libdir/tsearch2' 
	language 'C';

CREATE OR REPLACE FUNCTION snb_lexize(internal,internal,int4)
	returns internal
	as '$libdir/tsearch2'
	language 'C'
	with (isstrict);

