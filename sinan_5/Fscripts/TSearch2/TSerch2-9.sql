

insert into pg_ts_dict select 
	'ispell_template', 
	'spell_init(text)',
	null,
	'spell_lexize(internal,internal,int4)',
	'ISpell interface. Must have .dict and .aff files'
;
