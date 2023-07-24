class Cotizador {
    constructor (m2, factorPropiedad, factorUbicacion, costoM2){
        this.m2 = parseInt (m2) || 1
        this.factorPr = parseFloat (factorPropiedad) || 1
        this.factorUb = parseFloat (factorUbicacion) || 1
        this.costoM2 = parseFloat (costoM2) || 1
    }
    cotizar () {
        return (this.m2 * this.factorPr * this.factorUb * this.costoM2).toFixed(2)
    }
}