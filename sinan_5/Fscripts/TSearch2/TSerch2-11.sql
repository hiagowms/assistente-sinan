
insert into pg_ts_dict select 
	'synonym', 
	'syn_init(text)',
	null,
	'syn_lexize(internal,internal,int4)',
	'Example of synonym dictionary'
;
