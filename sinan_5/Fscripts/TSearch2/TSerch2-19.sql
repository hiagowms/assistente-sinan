
CREATE TABLE pg_ts_cfgmap (
	ts_name		text not null,
	tok_alias	text not null,
	dict_name	text[],
	primary key (ts_name,tok_alias)
) with oids;
