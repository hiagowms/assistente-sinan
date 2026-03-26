CREATE TABLE pg_ts_cfg (
	ts_name		text not null primary key,
	prs_name	text not null,
	locale		text
) with oids;
