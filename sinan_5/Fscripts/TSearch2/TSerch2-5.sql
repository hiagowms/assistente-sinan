insert into pg_ts_dict select 
	'en_stem', 
	'snb_en_init(text)',
	'contrib/english.stop',
	'snb_lexize(internal,internal,int4)',
	'English Stemmer. Snowball.'
;

