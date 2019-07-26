export class Credencial{
    constructor(        
        public username: string, 
        public password: string){}
}

export class RespuestaSimpleForm{
    constructor(
        public id: number,
        public motivo: string){}
}

export class Busqueda{
    constructor(
        public termino: string, 
        public ordenCol?: string, 
        public asc?: boolean){}
}