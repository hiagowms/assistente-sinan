CREATE OR REPLACE FUNCTION snb_ru_init(text)
	returns internal
	as '$libdir/tsearch2' 
	language 'C';
