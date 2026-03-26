SET search_path = public;

CREATE TABLE pg_ts_dict (
	dict_name	text not null primary key,
	dict_init	regprocedure,
	dict_initoption	text,
	dict_lexize	regprocedure not null,
	dict_comment	text
) with oids;


