let r

const PRI = a => b => a

r = PRI(7)(11)

console.log(r)

const ULT = a => b => b

r = ULT(7)(11)

console.log(r)

const TROCA = f => a => b => f(b)(a)

r = TROCA(ULT)(7)(11)

console.log(r)

const TRUE = PRI
const FALSE = ULT

TRUE.inspect = () => 'Verdadeiro (PRI)'
FALSE.inspect = () => 'Falso (ULT)'

// NOT
const NOT = a => a(FALSE)(TRUE)

r = NOT(TRUE)

console.log(r)

// AND
const AND = a => b => a(b)(FALSE)

r = AND(TRUE)(TRUE)

console.log(r)

// OR
const OR = a => b => a(TRUE)(b)

r = OR(TRUE)(FALSE)

console.log(r)