interface UQ {
    a: number;
}

interface UQs {
    [uq:string]: UQ;
}

class BUq implements UQ {
    a = 1;
    c = 2;
}

const uqs: UQs = {
    a: {a:1},
    b: new BUq(),
}

function f() {
    uqs.b.a = 2;
    uqs.c.a = 3;
}
