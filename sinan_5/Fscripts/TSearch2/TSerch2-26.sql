CREATE OPERATOR || (
        LEFTARG = tsvector,
        RIGHTARG = tsvector,
        PROCEDURE = concat
);

