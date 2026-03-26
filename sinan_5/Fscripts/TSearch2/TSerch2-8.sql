	 
CREATE OR REPLACE FUNCTION spell_init(text)
	returns internal
	as '$libdir/tsearch2' 
	language 'C';

CREATE OR REPLACE FUNCTION spell_lexize(internal,internal,int4)
	returns internal
	as '$libdir/tsearch2'
	language 'C'
	with (isstrict);