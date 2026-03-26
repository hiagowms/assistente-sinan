create type tsdebug as (
        ts_name text,
        tok_type text,
        description text,
        token   text,
        dict_name text[],
        "tsvector" tsvector
);

