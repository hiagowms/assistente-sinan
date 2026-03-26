
insert into pg_ts_dict select 
	'ru_stem', 
	'snb_ru_init(text)',
	'contrib/russian.stop',
	'snb_lexize(internal,internal,int4)',
	'Russian Stemmer. Snowball.'
;
