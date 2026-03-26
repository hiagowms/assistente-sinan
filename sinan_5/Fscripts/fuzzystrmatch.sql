SET search_path = public;

CREATE OR REPLACE FUNCTION levenshtein (text,text)
RETURNS int
AS '$libdir/fuzzystrmatch','levenshtein'
LANGUAGE 'C' WITH (iscachable, isstrict);

CREATE OR REPLACE FUNCTION metaphone (text,int)
RETURNS text
AS '$libdir/fuzzystrmatch','metaphone'
LANGUAGE 'C' WITH (iscachable, isstrict);

CREATE OR REPLACE FUNCTION soundex(text) RETURNS text
AS '$libdir/fuzzystrmatch', 'soundex'
LANGUAGE 'C' WITH (iscachable, isstrict);

CREATE OR REPLACE FUNCTION text_soundex(text) RETURNS text
AS '$libdir/fuzzystrmatch', 'soundex'
LANGUAGE 'C' WITH (iscachable, isstrict);

CREATE OR REPLACE FUNCTION dmetaphone (text) RETURNS text 
LANGUAGE C IMMUTABLE STRICT
AS '$libdir/fuzzystrmatch', 'dmetaphone';

CREATE OR REPLACE FUNCTION dmetaphone_alt (text) RETURNS text 
LANGUAGE C IMMUTABLE STRICT
AS '$libdir/fuzzystrmatch', 'dmetaphone_alt';
