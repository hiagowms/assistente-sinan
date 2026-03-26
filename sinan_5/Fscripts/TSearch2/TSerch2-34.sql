CREATE OPERATOR CLASS gist_tsvector_ops
DEFAULT FOR TYPE tsvector USING gist
AS
        OPERATOR        1       @@ (tsvector, tsquery)  RECHECK ,
        FUNCTION        1       gtsvector_consistent (gtsvector, internal, int4),
        FUNCTION        2       gtsvector_union (internal, internal),
        FUNCTION        3       gtsvector_compress (internal),
        FUNCTION        4       gtsvector_decompress (internal),
        FUNCTION        5       gtsvector_penalty (internal, internal, internal),
        FUNCTION        6       gtsvector_picksplit (internal, internal),
        FUNCTION        7       gtsvector_same (gtsvector, gtsvector, internal),
        STORAGE         gtsvector;


