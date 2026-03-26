CREATE OPERATOR @@ (
        LEFTARG = tsvector,
        RIGHTARG = tsquery,
        PROCEDURE = exectsq,
        COMMUTATOR = '@@',
        RESTRICT = contsel,
        JOIN = contjoinsel
);
CREATE OPERATOR @@ (
        LEFTARG = tsquery,
        RIGHTARG = tsvector,
        PROCEDURE = rexectsq,
        COMMUTATOR = '@@',
        RESTRICT = contsel,
        JOIN = contjoinsel
);
