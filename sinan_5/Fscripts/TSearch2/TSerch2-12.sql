CREATE TABLE pg_ts_parser (
	prs_name	text not null primary key,
	prs_start	regprocedure not null,
	prs_nexttoken	regprocedure not null,
	prs_end		regprocedure not null,
	prs_headline	regprocedure not null,
	prs_lextype	regprocedure not null,
	prs_comment	text
) with oids;