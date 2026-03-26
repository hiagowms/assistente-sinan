CREATE OPERATOR < (
        LEFTARG = tsvector,
        RIGHTARG = tsvector,
        PROCEDURE = tsvector_lt,
        COMMUTATOR = '>',
        NEGATOR = '>=',
        RESTRICT = contsel,
        JOIN = contjoinsel
);

CREATE OPERATOR <= (
        LEFTARG = tsvector,
        RIGHTARG = tsvector,
        PROCEDURE = tsvector_le,
        COMMUTATOR = '>=',
        NEGATOR = '>',
        RESTRICT = contsel,
        JOIN = contjoinsel
);

CREATE OPERATOR >= (
        LEFTARG = tsvector,
        RIGHTARG = tsvector,
        PROCEDURE = tsvector_ge,
        COMMUTATOR = '<=',
        NEGATOR = '<',
        RESTRICT = contsel,
        JOIN = contjoinsel
);

CREATE OPERATOR > (
        LEFTARG = tsvector,
        RIGHTARG = tsvector,
        PROCEDURE = tsvector_gt,
        COMMUTATOR = '<',
        NEGATOR = '<=',
        RESTRICT = contsel,
        JOIN = contjoinsel
);

CREATE OPERATOR = (
        LEFTARG = tsvector,
        RIGHTARG = tsvector,
        PROCEDURE = tsvector_eq,
        COMMUTATOR = '=',
        NEGATOR = '<>',
        RESTRICT = eqsel,
        JOIN = eqjoinsel,
        SORT1 = '<',
        SORT2 = '<'
);

CREATE OPERATOR <> (
        LEFTARG = tsvector,
        RIGHTARG = tsvector,
        PROCEDURE = tsvector_ne,
        COMMUTATOR = '<>',
        NEGATOR = '=',
        RESTRICT = neqsel,
        JOIN = neqjoinsel
);

CREATE OPERATOR CLASS tsvector_ops
    DEFAULT FOR TYPE tsvector USING btree AS
        OPERATOR        1       < ,
        OPERATOR        2       <= , 
        OPERATOR        3       = ,
        OPERATOR        4       >= ,
        OPERATOR        5       > ,
        FUNCTION        1       tsvector_cmp(tsvector, tsvector);


